import React from "react"
import { Header } from "./header/header"

export interface TableProps {
  columnNames: string[]
  rows: React.ReactNode[]
}

export const Table = ({ columnNames, rows }: TableProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-300  sm:rounded">
          <table className="w-full ">
            {<Header labels={columnNames} />}
            <tbody className="bg-white divide-y divide-gray-300">{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
