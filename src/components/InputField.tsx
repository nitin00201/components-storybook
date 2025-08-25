// import React, { useId, useMemo, useState } from "react"

// export interface InputFieldProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
//   value?: string
//   defaultValue?: string
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
//   label?: string
//   placeholder?: string
//   helperText?: string
//   errorMessage?: string
//   disabled?: boolean
//   invalid?: boolean
//   loading?: boolean
//   variant?: "filled" | "outlined" | "ghost"
//   size?: "sm" | "md" | "lg"  
//   type?: string
//   name?: string
//   id?: string
//   className?: string
//   clearable?: boolean
//   passwordToggle?: boolean
// }

// export default function InputField({
//   value,
//   defaultValue,
//   onChange,
//   label,
//   placeholder,
//   helperText,
//   errorMessage,
//   disabled = false,
//   invalid = false,
//   loading = false,
//   variant = "outlined",
//   size = "md",
//   type = "text",
//   name,
//   id,
//   className = "",
//   clearable = false,
//   passwordToggle = false,
//   ...rest
// }: InputFieldProps) {
//   const autoId = useId()
//   const inputId = id || `input-${autoId}`
//   const helpId = helperText ? `${inputId}-help` : undefined
//   const errId = errorMessage ? `${inputId}-error` : undefined

//   const sizeCls = useMemo(
//     () =>
//       (
//         {
//           sm: "h-9 text-sm px-3",
//           md: "h-10 text-base px-3.5",
//           lg: "h-12 text-lg px-4",
//         } as const
//       )[size] || "h-10 text-base px-3.5",
//     [size]
//   )

//   const variantCls = useMemo(
//     () =>
//       (
//         {
//           outlined: "input-outlined",
//           filled: "input-filled",
//           ghost: "input-ghost",
//         } as const
//       )[variant] || "input-outlined",
//     [variant]
//   )

//   const [internalType, setInternalType] = useState(type)
//   const showPasswordToggle = passwordToggle || type === "password"

//   const sendChange = (nextVal: string) => {
//     if (!onChange) return
//     const syntheticEvent = {
//       target: { value: nextVal, name } as HTMLInputElement,
//     } as React.ChangeEvent<HTMLInputElement>
//     onChange(syntheticEvent)
//   }

//   const isInvalid = invalid || !!errorMessage

//   return (
//     <div className={`w-full ${className} text-black`}>
//       {label && (
//         <label
//           htmlFor={inputId}
//           className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           {label}
//         </label>
//       )}

//       <div className="relative">
//         <input
//           id={inputId}
//           name={name}
//           type={internalType}
//           value={value}
//           defaultValue={defaultValue}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           aria-invalid={isInvalid}
//           aria-describedby={isInvalid ? errId : helpId}
//           aria-busy={loading}
//           className={`input-base ${variantCls} ${sizeCls} pr-20 rounded-xl ${
//             isInvalid
//               ? "border-red-500 ring-red-200 focus:border-red-600"
//               : ""
//           }`}
//           {...rest}
//         />

//         <div className="absolute inset-y-0 right-2 flex items-center gap-1">
//           {clearable &&
//             !disabled &&
//             (typeof value === "string" ? value.length > 0 : false) && (
//               <button
//                 type="button"
//                 onClick={() => sendChange("")}
//                 className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95 dark:hover:bg-gray-700"
//                 aria-label="Clear input"
//               >
//                 ×
//               </button>
//             )}

//           {showPasswordToggle && (
//             <button
//               type="button"
//               onClick={() =>
//                 setInternalType((t) =>
//                   t === "password" ? "text" : "password"
//                 )
//               }
//               className="rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95 dark:hover:bg-gray-700"
//               aria-label={
//                 internalType === "password" ? "Show password" : "Hide password"
//               }
//             >
//               {internalType === "password" ? "Show" : "Hide"}
//             </button>
//           )}

//           {loading && <span className="loader" aria-hidden="true" />}
//         </div>
//       </div>

//       {helperText && !isInvalid && (
//         <p
//           id={helpId}
//           className="mt-1 text-xs text-gray-500 dark:text-gray-400"
//         >
//           {helperText}
//         </p>
//       )}

//       {isInvalid && (
//         <p
//           id={errId}
//           className="mt-1 text-xs text-red-600 dark:text-red-400"
//         >
//           {errorMessage || "Invalid value"}
//         </p>
//       )}
//     </div>
//   )
// }
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

  const [isFocused, setIsFocused] = useState(false)
  const [internalType, setInternalType] = useState(type)
  const showPasswordToggle = passwordToggle || type === "password"

  const sizeCls = useMemo(
    () =>
      (
        {
          sm: "h-9 text-sm px-3 text-sm",
          md: "h-11 text-base px-4",
          lg: "h-13 text-lg px-5",
        } as const
      )[size] || "h-11 text-base px-4",
    [size]
  )

  const labelSizeCls = useMemo(
    () =>
      (
        {
          sm: "text-xs",
          md: "text-sm",
          lg: "text-base",
        } as const
      )[size] || "text-sm",
    [size]
  )

  const getVariantStyles = () => {
    const baseStyles = `
      w-full transition-all duration-200 ease-in-out 
      placeholder:text-gray-400 dark:placeholder:text-gray-500
      focus:outline-none focus:ring-0
      disabled:cursor-not-allowed disabled:opacity-50
    `
    
    const isInvalid = invalid || !!errorMessage
    
    switch (variant) {
      case "filled":
        return `${baseStyles} 
          bg-gray-100 dark:bg-gray-800 
          border-0 border-b-2 rounded-t-lg rounded-b-none
          ${isInvalid 
            ? "border-b-red-500 bg-red-50 dark:bg-red-900/20" 
            : isFocused 
            ? "border-b-blue-500 bg-blue-50 dark:bg-blue-900/20" 
            : "border-b-gray-300 dark:border-b-gray-600"
          }
          text-gray-900 dark:text-gray-100
          hover:bg-gray-50 dark:hover:bg-gray-750
          focus:bg-white dark:focus:bg-gray-700
        `
      
      case "ghost":
        return `${baseStyles}
          bg-transparent border-0 border-b-2 rounded-none
          ${isInvalid 
            ? "border-b-red-500" 
            : isFocused 
            ? "border-b-blue-500" 
            : "border-b-gray-300 dark:border-b-gray-600"
          }
          text-gray-900 dark:text-gray-100
          hover:bg-gray-50 dark:hover:bg-gray-800/50
          focus:bg-gray-50 dark:focus:bg-gray-800/30
        `
      
      default: // outlined
        return `${baseStyles}
          bg-white dark:bg-gray-800 
          border-2 rounded-xl
          ${isInvalid 
            ? "border-red-500 shadow-red-100 dark:shadow-red-900/20" 
            : isFocused 
            ? "border-blue-500 shadow-blue-100 dark:shadow-blue-900/20" 
            : "border-gray-200 dark:border-gray-700"
          }
          text-gray-900 dark:text-gray-100
          hover:border-gray-300 dark:hover:border-gray-600
          focus:border-blue-500 dark:focus:border-blue-400
          ${isFocused ? "shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20" : "shadow-sm"}
        `
    }
  }

  const sendChange = (nextVal: string) => {
    if (!onChange) return
    const syntheticEvent = {
      target: { value: nextVal, name } as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>
    onChange(syntheticEvent)
  }

  const isInvalid = invalid || !!errorMessage
  const hasValue = typeof value === "string" ? value.length > 0 : false

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-2 block font-semibold transition-colors duration-200 ${labelSizeCls} ${
            isInvalid 
              ? "text-red-600 dark:text-red-400" 
              : isFocused 
              ? "text-blue-600 dark:text-blue-400" 
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {label}
          {rest.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative group">
        <input
          id={inputId}
          name={name}
          type={internalType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true)
            rest.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            rest.onBlur?.(e)
          }}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errId : helpId}
          aria-busy={loading}
          className={`${getVariantStyles()} ${sizeCls} ${
            (clearable && hasValue) || showPasswordToggle || loading ? "pr-20" : ""
          }`}
          {...rest}
        />

        {/* Action buttons container */}
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {clearable && !disabled && hasValue && (
            <button
              type="button"
              onClick={() => sendChange("")}
              className="flex items-center justify-center w-6 h-6 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all duration-150 active:scale-95"
              aria-label="Clear input"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
              className="flex items-center justify-center w-8 h-6 rounded-md text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all duration-150 active:scale-95"
              aria-label={
                internalType === "password" ? "Show password" : "Hide password"
              }
            >
              {internalType === "password" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.121-3.121M12 12v.01" />
                </svg>
              )}
            </button>
          )}

          {loading && (
            <div className="flex items-center justify-center w-6 h-6">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Focus ring for better accessibility */}
        <div 
          className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-200 ${
            isFocused && variant === "outlined" 
              ? "ring-2 ring-blue-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900" 
              : ""
          }`}
        />
      </div>

      {/* Helper text */}
      {helperText && !isInvalid && (
        <p
          id={helpId}
          className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
        >
          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {helperText}
        </p>
      )}

      {/* Error message */}
      {isInvalid && (
        <p
          id={errId}
          className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {errorMessage || "Invalid value"}
        </p>
      )}
    </div>
  )
}