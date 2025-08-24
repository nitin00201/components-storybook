import type { Meta, StoryObj } from "@storybook/react"
import DataTable from "../components/DataTable"

const sampleData = [
  { id: 1, name: "Aisha", age: 27, city: "Pune" },
  { id: 2, name: "Rahul", age: 31, city: "Mumbai" },
  { id: 3, name: "Neha",  age: 24, city: "Delhi" },
]

const sampleColumns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age",  title: "Age",  dataIndex: "age",  sortable: true },
  { key: "city", title: "City", dataIndex: "city", sortable: true },
]

const meta: Meta<typeof DataTable<any>> = {
  title: "Components/DataTable",
  component: DataTable,
      tags: ['autodocs'],

  args: { data: sampleData, columns: sampleColumns },
}
export default meta

type Story = StoryObj<typeof DataTable<any>>

export const Basic: Story = {}
export const Loading: Story = { args: { loading: true } }
export const SelectableSingle: Story = { args: { selectable: true, selectionMode: "single" } }
export const SelectableMultiple: Story = { args: { selectable: true, selectionMode: "multiple" } }
