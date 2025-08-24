import type { Meta, StoryObj } from "@storybook/react"
import InputField from "../components/InputField"
import { themes } from "@storybook/theming"

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],

  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This is a helper text",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },

  // 👇 Add custom docs theme here
  parameters: {
    docs: {
      theme: {
        ...themes.light,
        brandTitle: "My UI Library",
        textColor: "#111827",   // Tailwind gray-900 → blackish
        appBg: "#f9fafb",       // Tailwind gray-50
        appContentBg: "#ffffff",
        barBg: "#e5e7eb",       // Tailwind gray-200
        colorPrimary: "#4f46e5", // Indigo-600
        colorSecondary: "#9333ea", // Purple-600
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputField>

export const Basic: Story = {}
export const Filled: Story = { args: { variant: "filled" } }
export const Outlined: Story = { args: { variant: "outlined" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const WithError: Story = { args: { invalid: true, errorMessage: "This field is required" } }
export const Disabled: Story = { args: { disabled: true } }
export const PasswordToggle: Story = { args: { type: "password", passwordToggle: true } }
