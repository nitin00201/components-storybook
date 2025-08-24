import React, { useMemo, useState } from "react"

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  selectionMode?: "single" | "multiple"
  onRowSelect?: (selectedRows: T[]) => void
}

interface SortState {
  key: string | null
  order: "asc" | "desc" | null
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectionMode = "multiple",
  onRowSelect,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>({ key: null, order: null })
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return
    setSort((prev) => {
      if (prev.key !== col.key) return { key: col.key, order: "asc" }
      if (prev.order === "asc") return { key: col.key, order: "desc" }
      return { key: null, order: null }
    })
  }

  const sorted = useMemo(() => {
    if (!sort.key || !sort.order) return data
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return data
    const dir = sort.order === "asc" ? 1 : -1
    return [...data].sort((a, b) => {
      const av = a[col.dataIndex]
      const bv = b[col.dataIndex]
      if (av == null && bv == null) return 0
      if (av == null) return -1 * dir
      if (bv == null) return 1 * dir
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }, [data, columns, sort])

  const getRowKey = (row: T): string => {
    // Prefer `id` if present, else fallback to JSON snapshot
    return (row as any).id?.toString?.() ?? JSON.stringify(row)
  }

  const setSelected = (newSet: Set<string>) => {
    setSelectedKeys(newSet)
    if (onRowSelect) {
      const selectedRows = sorted.filter((row) => newSet.has(getRowKey(row)))
      onRowSelect(selectedRows)
    }
  }

  const toggleRow = (row: T) => {
    const key = getRowKey(row)
    if (selectionMode === "single") {
      setSelected(new Set([key]))
    } else {
      const next = new Set(selectedKeys)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      setSelected(next)
    }
  }

  const toggleAll = () => {
    if (selectedKeys.size === sorted.length) setSelected(new Set())
    else setSelected(new Set(sorted.map(getRowKey)))
  }

  const allSelected =
    selectable &&
    selectionMode === "multiple" &&
    sorted.length > 0 &&
    selectedKeys.size === sorted.length

  return (
    <div className="relative overflow-x-auto rounded-2xl border border-gray-200 text-black dark:text-white dark:border-gray-800">
      {loading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-white/70 dark:bg-black/50 backdrop-blur-sm">
          <div className="loader" aria-label="Loading" />
        </div>
      )}

      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900/40">
          <tr>
           {selectable && (
  <th className="w-10 px-3 py-3">
    {selectionMode === "multiple" ? (
      <input
        type="checkbox"
        aria-label="Select all rows"
        checked={allSelected}
        onChange={toggleAll}
      />
    ) : null}
  </th>
)}
            {columns.map((col) => {
              const isSorted = sort.key === col.key && !!sort.order
              const arrow = !col.sortable
                ? ""
                : sort.key !== col.key
                ? "↕"
                : sort.order === "asc"
                ? "↑"
                : "↓"
              return (
                <th key={col.key} className="px-3 py-3 font-semibold">
                  {col.sortable ? (
                    <button
                      className="inline-flex items-center gap-1 hover:underline"
                      onClick={() => toggleSort(col)}
                      aria-sort={
                        isSorted
                          ? sort.order === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      aria-label={`Sort by ${col.title}`}
                    >
                      <span>{col.title}</span>
                      <span aria-hidden="true">{arrow}</span>
                    </button>
                  ) : (
                    <span>{col.title}</span>
                  )}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {!loading && sorted.length === 0 && (
            <tr>
              <td
                className="px-3 py-6 text-center text-black dark:text-red-400"
                colSpan={columns.length + (selectable && selectionMode === "multiple" ? 1 : 0)}
              >
                No data available
              </td>
            </tr>
          )}

          {sorted.map((row) => {
            const key = getRowKey(row)
            const isChecked = selectedKeys.has(key)
            return (
              <tr
                key={key}
                className={isChecked ? "bg-indigo-50 dark:bg-indigo-950/30" : undefined}
              >
                {selectable && (
                  <td className="px-3 py-2">
                    {selectionMode === "single" ? (
                      <input
                        type="radio"
                        name="dt__select"
                        aria-label="Select row"
                        checked={isChecked}
                        onChange={() => toggleRow(row)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        aria-label="Select row"
                        checked={isChecked}
                        onChange={() => toggleRow(row)}
                      />
                    )}
                  </td>
                )}

                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2">
                    {String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
