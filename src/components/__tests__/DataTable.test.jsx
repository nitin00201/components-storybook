import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import DataTable from '../DataTable.jsx'
import React from 'react'

const data = [
  { id: 1, name: 'Zed', age: 20 },
  { id: 2, name: 'Ana', age: 30 }
]
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age',  title: 'Age',  dataIndex: 'age',  sortable: true }
]

describe('DataTable', () => {
  it('sorts by column', () => {
    render(<DataTable data={data} columns={columns} />)
    const sortBtn = screen.getByRole('button', { name: /sort by name/i })
    fireEvent.click(sortBtn) // asc
    const rows = screen.getAllByRole('row').slice(1) // skip header
    const first = within(rows[0]).getByText('Ana')
    expect(first).toBeInTheDocument()
  })

  it('selects rows (multiple)', () => {
    const onSelect = vi.fn()
    render(<DataTable data={data} columns={columns} selectable selectionMode="multiple" onRowSelect={onSelect} />)
    const checks = screen.getAllByRole('checkbox', { name: /select row/i })
    fireEvent.click(checks[0])
    expect(onSelect).toHaveBeenCalled()
  })
})
