import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InputField from '../InputField.jsx'
import React from 'react'

describe('InputField', () => {
  it('renders label and updates value', () => {
    const Wrapper = () => {
      const [val, setVal] = React.useState('')
      return <InputField label="Email" value={val} onChange={(e) => setVal(e.target.value)} />
    }
    render(<Wrapper />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hi' } })
    expect(screen.getByLabelText('Email').value).toBe('hi')
  })

  it('shows error message when invalid', () => {
    render(<InputField label="Name" invalid errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
