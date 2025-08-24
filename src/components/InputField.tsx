import React, { useId, useMemo, useState } from "react"

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: "filled" | "outlined" | "ghost"
  size?: "sm" | "md" | "lg"  
  type?: string
  name?: string
  id?: string
  className?: string
  clearable?: boolean
  passwordToggle?: boolean
}

export default function InputField({
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  name,
  id,
  className = "",
  clearable = false,
  passwordToggle = false,
  ...rest
}: InputFieldProps) {
  const autoId = useId()
  const inputId = id || `input-${autoId}`
  const helpId = helperText ? `${inputId}-help` : undefined
  const errId = errorMessage ? `${inputId}-error` : undefined

  const sizeCls = useMemo(
    () =>
      (
        {
          sm: "h-9 text-sm px-3",
          md: "h-10 text-base px-3.5",
          lg: "h-12 text-lg px-4",
        } as const
      )[size] || "h-10 text-base px-3.5",
    [size]
  )

  const variantCls = useMemo(
    () =>
      (
        {
          outlined: "input-outlined",
          filled: "input-filled",
          ghost: "input-ghost",
        } as const
      )[variant] || "input-outlined",
    [variant]
  )

  const [internalType, setInternalType] = useState(type)
  const showPasswordToggle = passwordToggle || type === "password"

  const sendChange = (nextVal: string) => {
    if (!onChange) return
    const syntheticEvent = {
      target: { value: nextVal, name } as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>
    onChange(syntheticEvent)
  }

  const isInvalid = invalid || !!errorMessage

  return (
    <div className={`w-full ${className} text-black`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={internalType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errId : helpId}
          aria-busy={loading}
          className={`input-base ${variantCls} ${sizeCls} pr-20 rounded-xl ${
            isInvalid
              ? "border-red-500 ring-red-200 focus:border-red-600"
              : ""
          }`}
          {...rest}
        />

        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {clearable &&
            !disabled &&
            (typeof value === "string" ? value.length > 0 : false) && (
              <button
                type="button"
                onClick={() => sendChange("")}
                className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95 dark:hover:bg-gray-700"
                aria-label="Clear input"
              >
                ×
              </button>
            )}

          {showPasswordToggle && (
            <button
              type="button"
              onClick={() =>
                setInternalType((t) =>
                  t === "password" ? "text" : "password"
                )
              }
              className="rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95 dark:hover:bg-gray-700"
              aria-label={
                internalType === "password" ? "Show password" : "Hide password"
              }
            >
              {internalType === "password" ? "Show" : "Hide"}
            </button>
          )}

          {loading && <span className="loader" aria-hidden="true" />}
        </div>
      </div>

      {helperText && !isInvalid && (
        <p
          id={helpId}
          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}

      {isInvalid && (
        <p
          id={errId}
          className="mt-1 text-xs text-red-600 dark:text-red-400"
        >
          {errorMessage || "Invalid value"}
        </p>
      )}
    </div>
  )
}
