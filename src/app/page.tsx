'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ProjectCard } from '@/components/ProjectCard'
import { toast } from 'sonner'

// Types
interface Project {
  id: string
  title: string
  description: string
  category: string
  difficulty_level: string
  deadline: string
  estimated_price: number
  drive_link?: string
  interested_freelancers: string[]  // Array of user IDs
  approved_freelancer?: string
  status: 'Open' | 'In Progress' | 'Completed'
  created_at: string
  updated_at: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'Logged in' : 'Not logged in')
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session ? 'Logged in' : 'Not logged in')
    })

    // Fetch projects
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        console.log('Fetching projects...')
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'Open')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching projects:', error)
          toast.error('Failed to load projects')
          return
        }

        console.log('Fetched projects:', data)
        if (!data || data.length === 0) {
          console.log('No projects found in the database')
        }
        setProjects(data || [])
      } catch (error) {
        console.error('Error:', error)
        toast.error('An unexpected error occurred while loading projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()

    return () => subscription.unsubscribe()
  }, [router])

  const handleInterested = async (projectId: string, whatsappNumber: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error('Please log in to express interest in projects')
        router.push('/login')
        return
      }

      // First get the current interested_projects array and project data
      const [userResponse, projectResponse] = await Promise.all([
        supabase
          .from('users')
          .select('interested_projects')
          .eq('id', session.user.id)
          .single(),
        supabase
          .from('projects')
          .select('interested_freelancers')
          .eq('id', projectId)
          .single()
      ])

      if (userResponse.error) {
        console.error('User fetch error:', userResponse.error)
        toast.error('Failed to fetch user data. Please try again.')
        return
      }

      if (projectResponse.error) {
        console.error('Project fetch error:', projectResponse.error)
        toast.error('Failed to fetch project data. Please try again.')
        return
      }

      const currentProjects = userResponse.data?.interested_projects || []
      const currentFreelancers = projectResponse.data?.interested_freelancers || []

      // Check if user has already shown interest in this project
      if (currentProjects.includes(projectId)) {
        toast.error('You have already expressed interest in this project')
        return
      }

      // Check if user has already shown interest in 5 projects
      if (currentProjects.length >= 5) {
        toast.error('You can only show interest in up to 5 projects at a time')
        return
      }

      // Update both arrays
      const updatedProjects = [...currentProjects, projectId]
      const updatedFreelancers = [...currentFreelancers, session.user.id]

      // Update both tables in parallel
      const [updateUserResponse, updateProjectResponse] = await Promise.all([
        supabase
          .from('users')
          .update({
            whatsapp_number: whatsappNumber,
            interested_projects: updatedProjects,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.user.id),
        supabase
          .from('projects')
          .update({
            interested_freelancers: updatedFreelancers,
            updated_at: new Date().toISOString()
          })
          .eq('id', projectId)
      ])

      if (updateUserResponse.error) {
        console.error('Update user error:', updateUserResponse.error)
        if (updateUserResponse.error.code === '23505') { // Unique constraint violation
          toast.error('This WhatsApp number is already registered')
        } else {
          toast.error('Failed to update user data. Please try again.')
        }
        return
      }

      if (updateProjectResponse.error) {
        console.error('Update project error:', updateProjectResponse.error)
        toast.error('Failed to update project data. Please try again.')
        return
      }

      // Show success message
      toast.success('Successfully expressed interest in project')
      
      // Refresh the projects list to update UI
      const { data: refreshedProjects, error: refreshError } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'Open')
        .order('created_at', { ascending: false })
        
      if (!refreshError && refreshedProjects) {
        setProjects(refreshedProjects)
      }
    } catch (error) {
      console.error('Error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8">Available Projects</h1>
        </div>
        
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                difficulty_level={project.difficulty_level}
                estimatedPrice={project.estimated_price}
                deadline={project.deadline}
                onInterested={(whatsappNumber) => handleInterested(project.id, whatsappNumber)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
