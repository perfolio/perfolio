import React from "react"
import { Table, Simple, Icon, Tag } from "@perfolio/components"

interface Asset {
  id: string
  value: number
  cost: number
  volume: number
}

const Row = ({ asset }: { asset: Asset }) => {
  const change = (asset.value / asset.cost - 1) * 100 // Percent

  return (
    <tr key={asset.id}>
      <td className="text-left">
        <Icon
          label={asset.id}
          content="hello"
          align="justify-start"
          icon={
            <img
              className="rounded-full"
              src={`https://storage.googleapis.com/iex/api/logos/${asset.id.toUpperCase()}.png`}
              alt={`Logo for company with isin: ${asset.id}`}
              width={64}
              height={64}
            />
          }
        />
      </td>
      <td className="text-right">
        <Simple label={asset.volume.toFixed(2)} />
      </td>
      <td className="text-right">
        <Simple label={`$${asset.cost.toFixed(2)}`} />
      </td>
      <td className="text-right">
        <Simple label={`$${asset.value.toFixed(2)}`} />
      </td>
      <td className="text-right">
        <Tag color={change > 0 ? "success" : "error"} label={`${change.toFixed(2)}%`} />
      </td>
    </tr>
  )
}

export const AssetTable = (): JSX.Element => {
  const assets = [
    {
      id: "TSLA",
      value: 4152,
      cost: 2151,
      volume: 42,
    },
    {
      id: "MSFT",
      value: 6236,
      cost: 1310,
      volume: 11515,
    },
  ]

  const columnNames = ["Asset", "Quantity", "Cost per share", "Price per share", "Change"]

  const rows = assets.map((asset) => {
    return <Row key={asset.id} asset={asset} />
  })
  return <Table columnNames={columnNames} rows={rows} />
}
