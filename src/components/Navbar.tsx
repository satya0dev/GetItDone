import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/public/LOGO.png"
            alt="GetItDone Logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="outline">
              Login with GitHub
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
} 