"use client"

import type React from "react"

import { InputField } from "../components/ui/input-field"

import { useState } from "react"


export default function InputDemo() {
  const [values, setValues] = useState({
    basic: "",
    email: "",
    password: "",
    disabled: "Disabled input",
    invalid: "invalid@email",
    loading: "Loading...",
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Input Field Component</h1>
          <p className="text-muted-foreground">
            A flexible input component with validation states and multiple variants.
          </p>
        </div>

        {/* Basic Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Basic Input"
              placeholder="Enter your name"
              value={values.basic}
              onChange={handleChange("basic")}
              helperText="This is a basic input field"
            />

            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange("email")}
              showClearButton
            />
          </div>
        </section>

        {/* Password Input */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Password Input</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange("password")}
              showPasswordToggle
              helperText="Password must be at least 8 characters"
            />

            <InputField
              label="Password with Clear"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange("password")}
              showPasswordToggle
              showClearButton
            />
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Disabled"
              placeholder="Disabled input"
              value={values.disabled}
              disabled
              helperText="This input is disabled"
            />

            <InputField
              label="Invalid"
              type="email"
              placeholder="Enter valid email"
              value={values.invalid}
              onChange={handleChange("invalid")}
              invalid
              errorMessage="Please enter a valid email address"
            />

            <InputField
              label="Loading"
              placeholder="Loading..."
              value={values.loading}
              loading
              helperText="Processing your request"
            />
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Outlined (Default)"
              placeholder="Outlined variant"
              variant="outlined"
              helperText="Default outlined style"
            />

            <InputField
              label="Filled"
              placeholder="Filled variant"
              variant="filled"
              helperText="Filled background style"
            />

            <InputField label="Ghost" placeholder="Ghost variant" variant="ghost" helperText="Minimal ghost style" />
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Sizes</h2>
          <div className="space-y-4">
            <InputField label="Small" placeholder="Small input" size="sm" showClearButton />

            <InputField label="Medium (Default)" placeholder="Medium input" size="md" showClearButton />

            <InputField label="Large" placeholder="Large input" size="lg" showClearButton />
          </div>
        </section>

        {/* Invalid States with Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Invalid States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Invalid Outlined"
              placeholder="Invalid input"
              variant="outlined"
              invalid
              errorMessage="This field is required"
            />

            <InputField
              label="Invalid Filled"
              placeholder="Invalid input"
              variant="filled"
              invalid
              errorMessage="This field is required"
            />

            <InputField
              label="Invalid Ghost"
              placeholder="Invalid input"
              variant="ghost"
              invalid
              errorMessage="This field is required"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
