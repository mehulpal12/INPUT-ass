"use client"

import type React from "react"
import { useState, forwardRef } from "react"
import { Eye, EyeOff, X, Loader2 } from "lucide-react"

interface InputFieldProps {
  value?: string
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
  type?: "text" | "password" | "email" | "number"
  showClearButton?: boolean
  showPasswordToggle?: boolean
  className?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = "",
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
      showClearButton = false,
      showPasswordToggle = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalValue, setInternalValue] = useState(value)

    const currentValue = value !== undefined ? value : internalValue
    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      } else {
        setInternalValue(e.target.value)
      }
    }

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>

      if (onChange) {
        onChange(syntheticEvent)
      } else {
        setInternalValue("")
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    // Size classes
    const sizeClasses = {
      sm: {
        input: "h-8 px-3 text-sm",
        label: "text-sm",
        helper: "text-xs",
        icon: "h-4 w-4",
      },
      md: {
        input: "h-10 px-3 text-sm",
        label: "text-sm",
        helper: "text-sm",
        icon: "h-4 w-4",
      },
      lg: {
        input: "h-12 px-4 text-base",
        label: "text-base",
        helper: "text-sm",
        icon: "h-5 w-5",
      },
    }

    // Variant classes
    const variantClasses = {
      filled: {
        base: "bg-muted border-0 focus:bg-background",
        invalid: "bg-red-50 dark:bg-red-950/20 focus:bg-red-50 dark:focus:bg-red-950/20",
        disabled: "bg-muted/50",
      },
      outlined: {
        base: "bg-background border border-input focus:border-ring",
        invalid: "border-red-500 focus:border-red-500 bg-red-50/50 dark:bg-red-950/10",
        disabled: "border-muted bg-muted/20",
      },
      ghost: {
        base: "bg-transparent border-0 border-b border-input focus:border-ring",
        invalid: "border-b-red-500 focus:border-b-red-500 bg-red-50/30 dark:bg-red-950/10",
        disabled: "border-b-muted bg-transparent",
      },
    }

    const currentSize = sizeClasses[size]
    const currentVariant = variantClasses[variant]

    const inputClasses = [
      "w-full rounded-md font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "placeholder:text-muted-foreground",
      currentSize.input,
      disabled
        ? `${currentVariant.disabled} cursor-not-allowed text-muted-foreground`
        : invalid
          ? currentVariant.invalid
          : currentVariant.base,
      className,
    ].join(" ")

    const labelClasses = [
      "block font-medium mb-2",
      currentSize.label,
      disabled ? "text-muted-foreground" : invalid ? "text-red-600 dark:text-red-400" : "text-foreground",
    ].join(" ")

    const helperClasses = [
      "mt-2",
      currentSize.helper,
      invalid ? "text-red-600 dark:text-red-400" : "text-muted-foreground",
    ].join(" ")

    return (
      <div className="w-full">
        {label && <label className={labelClasses}>{label}</label>}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={inputClasses}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && <Loader2 className={`${currentSize.icon} animate-spin text-muted-foreground`} />}

            {showClearButton && currentValue && !disabled && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                <X className={currentSize.icon} />
              </button>
            )}

            {showPasswordToggle && isPassword && !loading && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className={currentSize.icon} /> : <Eye className={currentSize.icon} />}
              </button>
            )}
          </div>
        </div>

        {(helperText || errorMessage) && <p className={helperClasses}>{errorMessage || helperText}</p>}
      </div>
    )
  },
)

InputField.displayName = "InputField"

export { InputField }
export type { InputFieldProps }
