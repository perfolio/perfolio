import React from "react"
import { Table } from "./table"
import { Simple } from "./cells/simple/simple"
import { Icon } from "./cells/icon/icon"
import Tag from "./cells/tag/tag"
import { v4 as uuid } from "uuid"

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
          content={uuid()}
          align="justify-start"
          icon={
            <img
              className="rounded-full"
              src={`https://storage.googleapis.com/iex/api/logos/${asset.id.toUpperCase()}.png`}
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
        <Tag
          color={change > 0 ? "success" : "error"}
          label={`${change.toFixed(2)}%`}
        />
      </td>
    </tr>
  )
}

export const AssetTable = () => {
  const assets = [
    {
      id: "TSLA",
      value: Math.random() * 5_000,
      cost: Math.random() * 5_000,
      quantity: Math.floor(Math.random() * 100),
    },
    {
      id: "MSFT",
      value: Math.random() * 5_000,
      cost: Math.random() * 5_000,
      quantity: Math.floor(Math.random() * 100),
    },
  ]

  const columnNames = [
    "Asset",
    "Quantity",
    "Cost per share",
    "Price per share",
    "Change",
  ]

  const rows = assets.map((asset) => {
    return <Row key={asset.id} asset={asset} />
  })
  console.log(columnNames, rows)
  return (
    <div>
      <Table columnNames={columnNames} rows={rows} />
    </div>
  )
}
