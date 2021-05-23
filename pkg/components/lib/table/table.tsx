import React from "react"
import { Header } from "./header/header"

export interface TableProps {
  columnNames: string[]
  rows: React.ReactNode[]
}

export const Table = ({ columnNames, rows }: TableProps) => {
  return (
    <div className="flex flex-col ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-light sm:rounded">
            <table className="min-w-full ">
              {<Header labels={columnNames} />}
              <tbody className="bg-white divide-y divide-gray-light">
                {rows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
