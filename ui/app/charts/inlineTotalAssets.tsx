import { Downsampling } from "@perfolio/pkg/downsampling"
import { useAbsoluteTotalHistory } from "@perfolio/pkg/hooks"
import { useCurrentAbsoluteValue } from "@perfolio/pkg/hooks"
import { format } from "@perfolio/pkg/util/numbers"
import { Time } from "@perfolio/pkg/util/time"
import { AreaChart } from "@perfolio/ui/charts"
import React, { useMemo } from "react"

export interface InlineTotalAssetChartProps {
  portfolioId?: string
}

export const InlineTotalAssetChart: React.FC<InlineTotalAssetChartProps> = ({
  portfolioId,
}): JSX.Element => {
  const { absoluteTotal, isLoading } = useAbsoluteTotalHistory({ portfolioId })
  const { currentAbsoluteValue } = useCurrentAbsoluteValue()
  const data = useMemo(() => {
    const downsampled = Downsampling.largestTriangle(
      absoluteTotal.map(({ time, value }) => ({ x: time, y: value })),
      500,
    )
    return downsampled.map(({ x, y }) => ({
      time: Time.fromTimestamp(x).toDate().toLocaleDateString(),
      value: y,
    }))
  }, [absoluteTotal])
  return (
    <div className="flex flex-col justify-center w-full h-20 space-y-8 bg-gray-100 rounded">
      <div className="relative w-full h-full">
        <AreaChart isLoading={isLoading} data={data} />
        <div className="absolute top-0 left-0 p-4">
          <span className="p-1 text-lg font-semibold text-black bg-gray-100 bg-opacity-75 rounded">
            {format(currentAbsoluteValue, { suffix: "€" })}
          </span>
        </div>
      </div>
    </div>
  )
}
