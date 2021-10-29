import React, { useMemo } from "react"
import cn from "classnames"
import { useTable } from "react-table"
import { Cell } from "./cells"
// eslint-disable-next-line
export interface TableProps<Accessor extends string> {
  columns: {
    Header: string
    accessor: Accessor
    align?: "text-left" | "text-center" | "text-right"
    tooltip?: React.ReactNode
  }[]
  data?: Record<Accessor, React.ReactNode>[]
}

export function Table<Accessor extends string>({
  columns,
  data,
}: TableProps<Accessor>): JSX.Element {
  /**
   * Display a loading skeleton cell for every column
   */
  const loadingData = React.useMemo(() => {
    const loadingRow = {} as Record<Accessor, React.ReactNode>
    columns.forEach(({ accessor }) => {
      loadingRow[accessor] = <Cell.Loading />
    })
    return [loadingRow, loadingRow, loadingRow]
  }, [columns])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => data ?? loadingData, [data, loadingData]),
  })

  return (
    <table {...getTableProps()} className="w-full border-separate" style={{ borderSpacing: 0 }}>
      <thead className="w-full">
        {headerGroups.map((headerGroup) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => {
                const align = columns.find((c) => c.accessor === column.id)?.align ?? "text-left"
                return (
                  // eslint-disable-next-line react/jsx-key
                  <th
                    {...column.getHeaderProps()}
                    className={cn(
                      "bg-gray-50 border-t border-b border-gray-200 w-full px-3 py-2 text-xs font-medium tracking-wider text-gray-700 uppercase whitespace-nowrap",
                      columns.find((c) => c.accessor === column.id)?.align ?? "text-left",
                      {
                        "border-l rounded-l": i === 0,
                        "border-r rounded-r": i === headerGroup.headers.length - 1,
                      },
                    )}
                  >
                    <span
                      className={cn("flex items-center gap-1", {
                        "justify-start": align === "text-left",
                        "justify-center": align === "text-center",
                        "justify-end": align === "text-right",
                      })}
                    >
                      {column.render("Header")}
                      {columns.find((c) => c.accessor === column.id)?.tooltip}
                    </span>
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()} className="hover:bg-gray-50">
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td
                    {...cell.getCellProps()}
                    className={cn("py-2", { "border-t border-gray-200": i > 0 })}
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
