import React, { useMemo, useState } from "react"
import { useHistory } from "../../queries"
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from "recharts"
import { Time } from "@perfolio/util/time"
import { Box, Spinner } from "@perfolio/ui/components"
import { ToggleGroup } from "@perfolio/ui/design-system"
import { History } from "@perfolio/api/feature/lambda"

type Data = {
  time: string
  value: number
}[]

type AssetHistory = {
  time: number
  quantity: number
  value: number
}[]

type Weights = {
  [time: number]: {
    [isin: string]: number
  }
}

type ReturnsPerAsset = {
  [time: number]: {
    [isin: string]: number
  }
}

type ValueAtTime = {
  [time: number]: number
}

export const plotAbsolute = (history: Timeline): Data => {
  return Object.entries(history).map(([time, assets]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value: Object.values(assets)
        .map((asset) => asset.quantity * asset.value)
        .reduce((acc, val) => acc + val),
    }
  })
}

/**
 * Compute weights for each asset for each day.
 *
 * If a user has $100 worth of assetA and $100 worth of assetB the weights will be 0.5 and 0.5
 */
const calculateWeight = (history: Timeline): Weights => {
  const weights: Weights = {}
  Object.entries(history).forEach((day) => {
    const time = Number(day[0])
    const assets = day[1]
    /**
     * Compute the total value of all assets on this day.
     */
    const totalValue = Object.values(assets)
      .map((asset) => asset.quantity * asset.value)
      .reduce((acc, val) => acc + val)

    if (!weights[time]) {
      weights[time] = {}
    }

    Object.entries(assets).forEach(([assetId, { value, quantity }]) => {
      weights[time][assetId] = (value * quantity) / totalValue
    })
  })
  return weights
}

const calculateReturns = (today: number, yesterday: number): number => {
  return yesterday === 0 ? 0 : today / yesterday - 1
}

const calculateReturnsPerAsset = (history: Timeline): ReturnsPerAsset => {
  const returns = {} as ReturnsPerAsset

  for (let i = 0; i < Object.keys(history).length; i++) {
    const day = Object.entries(history)[i]

    const time = Number(day[0])

    const assets = day[1]

    // valueToday / valueYesterday - 1 ?? 0

    if (!returns[time]) {
      returns[time] = {}
    }

    Object.entries(assets).forEach(([assetId, today]) => {
      let yesterday: { value: number } | undefined
      try {
        yesterday = Object.values(history)[i - 1][assetId]
      } catch {
        yesterday = undefined
      }
      returns[time][assetId] =
        !yesterday || yesterday.value === 0 ? 0 : today.value / yesterday.value - 1
      returns[time][assetId] = calculateReturns(today.value, yesterday?.value ?? 0)
    })
  }
  return returns
}

const calculateTotalReturns = (weights: Weights, returns: ReturnsPerAsset): ValueAtTime => {
  const times: number[] = Object.keys(weights).map((time) => Number(time))
  const totalReturns: ValueAtTime = {}
  times.forEach((time) => {
    let total = 0
    if (!(time in weights)) {
      throw new Error(`${time} is not in weights`)
    }
    Object.keys(weights[time]).forEach((assetId) => {
      if (!(assetId in weights[time])) {
        throw new Error(`${assetId} is not in weights.${time}`)
      }

      if (!(time in returns)) {
        throw new Error(`${time} is not in returns`)
      }
      if (!(assetId in returns[time])) {
        throw new Error(`${assetId} is not in returns.${time}`)
      }
      total += weights[time][assetId] * returns[time][assetId]
    })
    totalReturns[time] = total
  })
  return totalReturns
}

const buildIndex = (totalReturns: ValueAtTime): ValueAtTime => {
  const index: ValueAtTime = {}

  /**
   * drag timestamp, to retrieve the index value from yesterday
   */
  let yesterday = 0
  for (let i = 0; i < Object.keys(totalReturns).length; i++) {
    const time = Object.keys(totalReturns)[i]
    if (i === 0) {
      index[Number(time)] = 1
    } else {
      const returnsToday = Object.values(totalReturns)[i]
      index[Number(time)] = index[yesterday] * (1 + returnsToday)
    }
    yesterday = Number(time)
  }
  return index
}

const plotRelative = (history: { [isin: string]: AssetHistory }): Data => {
  const timeline = toTimeseries(history)
  const weights = calculateWeight(timeline)
  const returns = calculateReturnsPerAsset(timeline)
  const totalReturns = calculateTotalReturns(weights, returns)
  const index = buildIndex(totalReturns)
  const data = Object.entries(index).map(([time, value]) => {
    return {
      time: Time.fromTimestamp(Number(time)).toDate().toLocaleDateString(),
      value,
    }
  })
  return data
}

type Timeline = {
  [time: number]: {
    [asset: string]: {
      value: number
      quantity: number
    }
  }
}
const toTimeseries = (historyMap: { [isin: string]: AssetHistory }): Timeline => {
  const timeline: Timeline = {}
  Object.entries(historyMap).forEach(([isin, history]) => {
    history
      .sort((a, b) => a.time - b.time)
      .forEach((day) => {
        if (day.value > 0) {
          if (!timeline[day.time]) {
            timeline[day.time] = {}
          }

          timeline[day.time][isin] = { value: day.value, quantity: day.quantity }
        }
      })
  })
  return timeline
}

const ranges: Record<string, number> = {
  "1W": new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).getTime(),
  "1M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).getTime(),
  "3M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3).getTime(),
  "6M": new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6).getTime(),
  "1Y": new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).getTime(),
  YTD: new Date(new Date().getFullYear(), 0).getTime(),
  ALL: Number.NEGATIVE_INFINITY,
}

export const AssetsOverTimeChart: React.FC = (): JSX.Element => {
  const { history, isLoading } = useHistory()
  const [range, setRange] = useState("ALL")

  const selectedHistory = useMemo(() => {
    if (!history) {
      return {}
    }

    const selected: History = {}
    Object.entries(history).forEach(([assetId, timeline]) => {
      selected[assetId] = timeline.filter((day) => day.time * 1000 >= ranges[range])
    })
    return selected
  }, [history, range])

  const data = useMemo(() => plotRelative(selectedHistory), [selectedHistory])
  return (
    <>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded animate-pulse">
              <Spinner />
            </div>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#262059" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#262059" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload) {
                    return null
                  }

                  const { time, value } = payload[0].payload
                  return (
                    <Box className="flex flex-col p-4 text-center bg-gray-50">
                      <span className="text-xl font-medium">{value.toFixed(2)}</span>
                      <span className="text-sm text-gray-700">{time}</span>
                    </Box>
                  )
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#262059"
                strokeWidth={2}
                fill="url(#gradient)"
              />
              <XAxis dataKey="time" minTickGap={100} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end mt-8">
        <ToggleGroup
          size="md"
          options={Object.keys(ranges)}
          selected={range}
          setSelected={setRange}
        />
      </div>
    </>
  )
}
