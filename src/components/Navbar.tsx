'use client'

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/UserAvatar"

interface UserData {
  id: string
  name: string
  email: string
  avatar_url: string | null
}

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchUserData(session.user.id)
      } else {
        setUser(null)
        setUserData(null)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchUserData(session.user.id)
      } else {
        setUser(null)
        setUserData(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user data:', error)
        return
      }

      setUserData(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <svg
              width="120"
              height="40"
              viewBox="0 0 500 170"
              className="fill-foreground"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M73 24 C70.29858452 28.44426418 69.43226921 32.08527473 70.375 37.1328125 C71.52288374 40.56211516 73.01833918 42.01222612 76 44 C79.05109996 44.40575941 81.94224299 44.27033215 85 44 C87 44 89 44 91 44 C91 40.37 91 36.74 91 33 C88.03 33 85.06 33 82 33 C82 33.99 82 34.98 82 36 C83.32 36 84.64 36 86 36 C85.34 37.32 84.68 38.64 84 40 C81.69 40 79.38 40 77 40 C76.77668801 38.41870971 76.57195356 36.83478911 76.375 35.25 C76.25898437 34.36828125 76.14296875 33.4865625 76.0234375 32.578125 C75.99792183 29.77140122 76.55156156 28.36615134 78 26 C80.875 25.8125 80.875 25.8125 84 26 C84.99 27.485 84.99 27.485 86 29 C88.58380177 29.25030977 88.58380177 29.25030977 91 29 C90.05322042 25.81537776 89.33558155 24.26302338 86.6875 22.1875 C81.40796226 19.854681 77.74801538 20.8002505 73 24 Z M95 22 C95 29.26 95 36.52 95 44 C100.61 44 106.22 44 112 44 C111.67 42.68 111.34 41.36 111 40 C107.37 40 103.74 40 100 40 C100 38.35 100 36.7 100 35 C103.3 35 106.6 35 110 35 C110 33.68 110 32.36 110 31 C106.7 31 103.4 31 100 31 C100 29.02 100 27.04 100 25 C103.63 25 107.26 25 111 25 C111 24.01 111 23.02 111 22 C105.72 22 100.44 22 95 22 Z M113 22 C113 22.99 113 23.98 113 25 C115.31 25 117.62 25 120 25 C120 31.27 120 37.54 120 44 C121.65 44 123.3 44 125 44 C125 37.73 125 31.46 125 25 C127.64 25 130.28 25 133 25 C133 24.01 133 23.02 133 22 C126.4 22 119.8 22 113 22 Z M142 22 C142 29.26 142 36.52 142 44 C143.32 44 144.64 44 146 44 C146 36.74 146 29.48 146 22 C144.68 22 143.36 22 142 22 Z M149 22 C149 22.99 149 23.98 149 25 C151.31 25 153.62 25 156 25 C156 31.27 156 37.54 156 44 C157.65 44 159.3 44 161 44 C161 37.73 161 31.46 161 25 C163.64 25 166.28 25 169 25 C169 24.01 169 23.02 169 22 C162.4 22 155.8 22 149 22 Z M169 62 C160.04745883 72.82175306 155.98630552 85.01101616 157 99 C159.36877791 112.4106403 165.51761776 122.39526097 176 131 C186.27206081 137.63183307 197.83781845 140.66254155 209.94921875 138.46484375 C224.32755177 135.16341973 234.38816041 127.92417576 242.59765625 115.484375 C248.23425927 105.49863817 249.58454487 93.57251822 246.8125 82.5 C242.80322698 69.23567618 236.05269099 59.95878863 224 53 C204.68459443 44.42975973 184.42387142 46.91888128 169 62 Z M69 51 C69 79.05 69 107.1 69 136 C77.0025 136.0825 85.005 136.165 93.25 136.25 C95.75110352 136.28641602 98.25220703 136.32283203 100.82910156 136.36035156 C102.84960069 136.37205268 104.87010938 136.38224112 106.890625 136.390625 C108.41792236 136.4213208 108.41792236 136.4213208 109.97607422 136.45263672 C122.50239842 136.45861017 132.66434194 132.29163795 142 124 C150.61777545 114.7551515 154.59407098 103.52604246 154.3125 90.9609375 C153.32163336 81.57247609 149.92634909 73.30390239 144 66 C143.49855469 65.37480469 142.99710937 64.74960938 142.48046875 64.10546875 C135.53843826 56.35269018 124.78304393 51.52728668 114.43397522 50.82615662 C111.52687201 50.7698774 108.62622647 50.77480327 105.71875 50.8046875 C104.31544434 50.80770874 104.31544434 50.80770874 102.88378906 50.81079102 C99.42247545 50.82117608 95.96123228 50.84909806 92.5 50.875 C84.745 50.91625 76.99 50.9575 69 51 Z M253 49 C253 77.71 253 106.42 253 136 C281.05 136 309.1 136 338 136 C338 107.95 338 79.9 338 51 C324.14 51 310.28 51 296 51 C295.67 60.9 295.34 70.8 295 81 C277.3346659 67.27539427 277.3346659 67.27539427 269.4375 61.0625 C268.87313232 60.61890137 268.30876465 60.17530273 267.72729492 59.71826172 C265.20662974 57.73680619 262.68767977 55.75324976 260.171875 53.765625 C259.35203125 53.12109375 258.5321875 52.4765625 257.6875 51.8125 C256.99011719 51.26207031 256.29273438 50.71164063 255.57421875 50.14453125 C254.18958093 48.90199127 254.18958093 48.90199127 253 49 Z M345 51 C345 79.05 345 107.1 345 136 C368.1 136 391.2 136 415 136 C415 126.43 415 116.86 415 107 C409.39 107 403.78 107 398 107 C398 106.01 398 105.02 398 104 C403.61 104 409.22 104 415 104 C415 97.07 415 90.14 415 83 C409.39 83 403.78 83 398 83 C398 82.01 398 81.02 398 80 C403.61 80 409.22 80 415 80 C415 70.43 415 60.86 415 51 C391.9 51 368.8 51 345 51 Z" />
            </svg>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/host-projects" className="text-foreground hover:text-foreground/80 transition-colors">
              Host Projects
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <UserAvatar 
                    name={userData?.name || user.email} 
                    avatarUrl={userData?.avatar_url} 
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 