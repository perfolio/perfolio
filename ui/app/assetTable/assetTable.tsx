import { ExchangeTradedAsset } from "@perfolio/pkg/api"
import { useCurrentPorfolioState, usePortfolio } from "@perfolio/pkg/hooks"
import React, { useMemo } from "react"
import { AggregateOptions, DesktopAssetTable, MobileAssetTable } from ".."

export interface AssetTableProps {
  aggregation: AggregateOptions
  setAggregation: (value: React.SetStateAction<AggregateOptions>) => void
}

export interface DetailAssetTableProps extends AssetTableProps {
  costPerShare: { [assetID: string]: number }
  totalValue: number
  currentPortfolioState?: ExchangeTradedAsset[]
}

export const AssetTable: React.FC<AssetTableProps> = ({
  aggregation,
  setAggregation,
}): JSX.Element => {
  const { portfolio } = usePortfolio()

  const costPerShare: { [assetId: string]: number } = useMemo(() => {
    const transactionsFIFO: { [assetId: string]: number[] } = {}
    portfolio?.transactions?.forEach((tx) => {
      if (!transactionsFIFO[tx.asset.id]) {
        transactionsFIFO[tx.asset.id] = []
      }

      if (tx.volume > 0) {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id]!.push(tx.value)
        }
      } else {
        for (let i = 0; i < tx.volume; i++) {
          transactionsFIFO[tx.asset.id]!.shift()
        }
      }
    })

    const costPerShare: { [assetId: string]: number } = {}
    Object.entries(transactionsFIFO).forEach(([assetId, values]) => {
      costPerShare[assetId] = values.reduce((acc, value) => acc + value, 0) / values.length
    })
    return costPerShare
  }, [portfolio?.transactions])

  const { currentPorfolioState } = useCurrentPorfolioState()

  const totalValue = (currentPorfolioState ?? []).reduce(
    (acc, { value, quantity }) => acc + (value ?? 0) * quantity,
    0,
  )

  return (
    <>
      <div className="hidden md:flex">
        <DesktopAssetTable
          aggregation={aggregation}
          setAggregation={setAggregation}
          costPerShare={costPerShare}
          totalValue={totalValue}
        >
        </DesktopAssetTable>
      </div>
      <div className="flex md:hidden">
        <MobileAssetTable
          aggregation={aggregation}
          setAggregation={setAggregation}
          costPerShare={costPerShare}
          totalValue={totalValue}
        >
        </MobileAssetTable>
      </div>
    </>
  )
}
