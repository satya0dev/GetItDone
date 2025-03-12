'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

interface WhatsappDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (whatsappNumber: string) => void
}

export function WhatsappDialog({ open, onOpenChange, onSubmit }: WhatsappDialogProps) {
  const [whatsappNumber, setWhatsappNumber] = React.useState("")
  const [error, setError] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateWhatsappNumber = (number: string) => {
    // Basic validation for WhatsApp number
    const numberPattern = /^\+?[1-9]\d{1,14}$/
    return numberPattern.test(number)
  }

  const handleSubmit = () => {
    if (!validateWhatsappNumber(whatsappNumber)) {
      setError("Please enter a valid WhatsApp number")
      return
    }
    onSubmit(whatsappNumber)
    setWhatsappNumber("")
    setError("")
    onOpenChange(false)
  }

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  // Focus input when drawer opens
  React.useEffect(() => {
    if (open) {
      // Small delay to ensure the drawer is mounted
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [open])

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enter WhatsApp Number</DrawerTitle>
          <DrawerDescription>
            Please provide your WhatsApp number for project communication.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="grid gap-2">
            <label htmlFor="whatsapp" className="text-sm font-medium">
              WhatsApp Number
            </label>
            <input
              ref={inputRef}
              id="whatsapp"
              type="tel"
              placeholder="+1234567890"
              value={whatsappNumber}
              onChange={(e) => {
                setWhatsappNumber(e.target.value)
                setError("")
              }}
              onKeyDown={handleKeyDown}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "whatsapp-error" : undefined}
            />
            {error && (
              <p id="whatsapp-error" className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <Button onClick={handleSubmit}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 