'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { supabase } from "@/lib/supabase"

interface WhatsappDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (whatsappNumber: string) => void
}

export function WhatsappDialog({ open, onOpenChange, onSubmit }: WhatsappDialogProps) {
  const [whatsappNumber, setWhatsappNumber] = React.useState("")
  const [existingNumber, setExistingNumber] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [acceptedTerms, setAcceptedTerms] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const drawerContentRef = React.useRef<HTMLDivElement>(null)

  // Reset states when dialog opens
  React.useEffect(() => {
    if (open) {
      setAcceptedTerms(false)
      setError("")
    }
  }, [open])

  // Handle focus trap and initial focus
  React.useEffect(() => {
    if (open && drawerContentRef.current) {
      const focusableElements = drawerContentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0] as HTMLElement
        firstFocusable.focus()
      }
    }
  }, [open, isLoading])

  // Check if user already has a WhatsApp number
  React.useEffect(() => {
    if (open) {
      const checkExistingNumber = async () => {
        try {
          setIsLoading(true)
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session) {
            const { data, error } = await supabase
              .from('users')
              .select('whatsapp_number')
              .eq('id', session.user.id)
              .single()
            
            if (error) {
              console.error('Error fetching user data:', error)
              return
            }
            
            if (data?.whatsapp_number) {
              setExistingNumber(data.whatsapp_number)
            } else {
              setExistingNumber(null)
            }
          }
        } catch (error) {
          console.error('Error checking WhatsApp number:', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      checkExistingNumber()
    }
  }, [open])

  const validateWhatsappNumber = (number: string) => {
    // Basic validation for WhatsApp number
    const numberPattern = /^\+?[1-9]\d{1,14}$/
    return numberPattern.test(number)
  }

  const handleSubmit = () => {
    // If using existing number
    if (existingNumber && !whatsappNumber) {
      onSubmit(existingNumber)
      onOpenChange(false)
      return
    }
    
    // Validate terms acceptance
    if (!acceptedTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    // If entering a new number
    if (!validateWhatsappNumber(whatsappNumber)) {
      setError("Please enter a valid WhatsApp number")
      return
    }
    
    onSubmit(whatsappNumber)
    setWhatsappNumber("")
    setError("")
    onOpenChange(false)
  }

  const handleUseNewNumber = () => {
    setExistingNumber(null)
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

  // Focus input when drawer opens and no existing number
  React.useEffect(() => {
    if (open && !existingNumber && !isLoading) {
      // Small delay to ensure the drawer is mounted
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [open, existingNumber, isLoading])

  if (isLoading) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent ref={drawerContentRef}>
          <DrawerHeader className="text-left">
            <DrawerTitle>Checking your information...</DrawerTitle>
            <DrawerDescription>
              Please wait while we check your account details.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent ref={drawerContentRef}>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {existingNumber ? "Confirm WhatsApp Number" : "Enter WhatsApp Number"}
          </DrawerTitle>
          <DrawerDescription>
            {existingNumber 
              ? "We found an existing WhatsApp number in your profile. Would you like to use it?"
              : "Please provide your WhatsApp number for project communication."}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          {existingNumber ? (
            <div className="grid gap-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="text-sm font-medium mb-1">Your existing WhatsApp number:</p>
                <p className="text-lg font-semibold">{existingNumber}</p>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleUseNewNumber}>
                  Use a different number
                </Button>
                <Button onClick={handleSubmit}>
                  Use this number
                </Button>
              </div>
            </div>
          ) : (
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
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter className="pt-2">
          {!existingNumber && (
            <div className="flex justify-end gap-2">
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1 max-w-[200px]">Cancel</Button>
              </DrawerClose>
              <Button onClick={handleSubmit} className="flex-1 max-w-[200px]">Submit</Button>
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 