import React from "react"
import { Table } from "./table"
import { Simple } from "./cells/simple/simple"
import { Icon } from "./cells/icon/icon"
import { Tag } from "./cells/tag/tag"

interface Asset {
  id: string
  value: number
  cost: number
  quantity: number
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
            />
          }
        />
      </td>
      <td className="text-right">
        <Simple label={asset.quantity.toFixed(2)} />
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
      quantity: 42,
    },
    {
      id: "MSFT",
      value: 6236,
      cost: 1310,
      quantity: 11515,
    },
  ]

  const columnNames = ["Asset", "Quantity", "Cost per share", "Price per share", "Change"]

  const rows = assets.map((asset) => {
    return <Row key={asset.id} asset={asset} />
  })
  return (
    <div>
      <Table columnNames={columnNames} rows={rows} />
    </div>
  )
}
