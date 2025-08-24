import React, { useState } from 'react'
import InputField from './components/InputField.jsx'
import DataTable from './components/DataTable.jsx'

export default function App() {
  const [email, setEmail] = useState('')

  const users = [
    { id: 1, name: 'Aisha', age: 27, city: 'Pune' },
    { id: 2, name: 'Rahul', age: 31, city: 'Mumbai' },
    { id: 3, name: 'Neha',  age: 24, city: 'Delhi' }
  ]
  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'age',  title: 'Age',  dataIndex: 'age',  sortable: true },
    { key: 'city', title: 'City', dataIndex: 'city', sortable: true }
  ]

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-10">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">InputField demo</h1>
        <InputField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We’ll never share your email."
          clearable
          variant="outlined"
          size="md"
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          passwordToggle
          variant="filled"
          size="md"
        />
        <InputField
          label="Loading state"
          placeholder="Fetching…"
          loading
          variant="ghost"
          size="sm"
        />
        <InputField
          label="Invalid example"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          invalid
          errorMessage="Please provide a valid value"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">DataTable demo</h2>
        <DataTable
          data={users}
          columns={columns}
          selectable
          selectionMode="multiple"
          onRowSelect={(rows) => console.log('Selected rows:', rows)}
        />
      </section>
    </div>
  )
}
