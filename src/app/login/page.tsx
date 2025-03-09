'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Github } from 'lucide-react'

export default function LoginPage() {
  const handleGithubLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to GetItDone
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with GitHub to continue
          </p>
        </div>

        <Button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  )
} 