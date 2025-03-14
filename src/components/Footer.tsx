import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-4">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/host-projects" className="hover:underline">
              Host Projects
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
          <p className="text-center">© {new Date().getFullYear()} GetDone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 