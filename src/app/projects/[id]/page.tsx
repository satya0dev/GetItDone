'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, DollarSign, BarChart2, Check, ArrowLeft, FileText, Link as LinkIcon } from 'lucide-react'
import { WhatsappDialog } from '@/components/WhatsappDialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

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
  interested_freelancers: string[]
  approved_freelancer?: string
  status: 'Open' | 'In Progress' | 'Completed'
  created_at: string
  updated_at: string
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Unwrap params if it's a Promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const projectId = unwrappedParams.id;
  
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isInterested, setIsInterested] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Fetch project details
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        
        // Check authentication
        const { data: { session } } = await supabase.auth.getSession()
        console.log("Auth check on project detail page:", session ? "Logged in" : "Not logged in")
        
        if (!session) {
          console.log("No session found, redirecting to login")
          toast.error('You must be logged in to view project details')
          router.push(`/login?redirectTo=/projects/${projectId}`)
          return
        }
        
        setIsAuthenticated(true)

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (error) {
          console.error('Error fetching project:', error)
          toast.error('Failed to load project details')
          router.push('/')
          return
        }

        if (!data) {
          toast.error('Project not found')
          router.push('/')
          return
        }

        setProject(data)

        // Check if user has already shown interest in this project
        const { data: userData } = await supabase
          .from('users')
          .select('interested_projects')
          .eq('id', session.user.id)
          .single()
        
        if (userData?.interested_projects) {
          setIsInterested(userData.interested_projects.includes(projectId))
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId, router])

  const handleSubmit = async (whatsappNumber: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error('You must be logged in to express interest')
        router.push('/login')
        return
      }

      // Get current arrays from both tables
      const [userResponse, projectResponse] = await Promise.all([
        supabase
          .from('users')
          .select('interested_projects, whatsapp_number')
          .eq('id', session.user.id)
          .single(),
        supabase
          .from('projects')
          .select('interested_freelancers')
          .eq('id', projectId)
          .single()
      ])

      if (userResponse.error || projectResponse.error) {
        console.error('Fetch error:', userResponse.error || projectResponse.error)
        toast.error('Failed to update interest. Please try again.')
        return
      }

      // Add IDs to both arrays if not already present
      const userProjects = userResponse.data?.interested_projects || []
      const projectFreelancers = projectResponse.data?.interested_freelancers || []

      if (!userProjects.includes(projectId)) {
        userProjects.push(projectId)
      }

      if (!projectFreelancers.includes(session.user.id)) {
        projectFreelancers.push(session.user.id)
      }

      // Update whatsapp number if provided
      const updates = {
        interested_projects: userProjects,
        updated_at: new Date().toISOString()
      }

      if (whatsappNumber && (!userResponse.data?.whatsapp_number || userResponse.data.whatsapp_number !== whatsappNumber)) {
        Object.assign(updates, { whatsapp_number: whatsappNumber })
      }

      // Update both tables in parallel
      const [updateUserResponse, updateProjectResponse] = await Promise.all([
        supabase
          .from('users')
          .update(updates)
          .eq('id', session.user.id),
        supabase
          .from('projects')
          .update({
            interested_freelancers: projectFreelancers,
            updated_at: new Date().toISOString()
          })
          .eq('id', projectId)
      ])

      if (updateUserResponse.error || updateProjectResponse.error) {
        console.error('Update error:', updateUserResponse.error || updateProjectResponse.error)
        toast.error('Failed to update interest. Please try again.')
        return
      }

      setIsInterested(true)
      toast.success('Successfully expressed interest in project')
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsDialogOpen(false)
    }
  }

  const handleToggleInterest = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      toast.error('Please log in to express interest in projects')
      router.push('/login')
      return
    }

    if (!isInterested) {
      setIsDialogOpen(true)
      return
    }

    try {
      // Get current arrays from both tables
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

      if (userResponse.error || projectResponse.error) {
        console.error('Fetch error:', userResponse.error || projectResponse.error)
        toast.error('Failed to update interest. Please try again.')
        return
      }

      // Remove IDs from both arrays
      const updatedProjects = (userResponse.data?.interested_projects || []).filter(
        (id: string) => id !== projectId
      )
      const updatedFreelancers = (projectResponse.data?.interested_freelancers || []).filter(
        (id: string) => id !== session.user.id
      )

      // Update both tables in parallel
      const [updateUserResponse, updateProjectResponse] = await Promise.all([
        supabase
          .from('users')
          .update({
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

      if (updateUserResponse.error || updateProjectResponse.error) {
        console.error('Update error:', updateUserResponse.error || updateProjectResponse.error)
        toast.error('Failed to update interest. Please try again.')
        return
      }

      setIsInterested(false)
      toast.success('Successfully removed interest from project')
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-muted-foreground">Loading project details...</div>
      </div>
    )
  }

  if (!project || !isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center text-muted-foreground">Project not found or you don't have permission to view it.</div>
      </div>
    )
  }

  // Format the deadline date
  const formattedDeadline = new Date(project.deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Format the creation date
  const formattedCreationDate = new Date(project.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Project Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <div className="flex items-center mt-2 gap-2">
                  <Badge variant="secondary">{project.category}</Badge>
                  <Badge variant={
                    project.status === 'Open' ? 'default' : 
                    project.status === 'In Progress' ? 'outline' : 
                    'secondary'
                  }>
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center text-xl font-semibold">
                <DollarSign className="h-5 w-5 mr-1" />
                ${project.estimated_price}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
            </div>

            {project.drive_link && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Resources</h3>
                <a 
                  href={project.drive_link.startsWith('http') ? project.drive_link : `https://${project.drive_link}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500 hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  View attached resources
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Details Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Deadline</p>
                  <p className="font-medium">{formattedDeadline}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Difficulty</p>
                  <p className="font-medium">{project.difficulty_level}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Posted On</p>
                  <p className="font-medium">{formattedCreationDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleToggleInterest}
                className={cn(
                  "w-full transition-colors flex items-center justify-center gap-2",
                  isInterested 
                    ? "bg-[#79e14c] hover:bg-[#79e14c]/90 cursor-pointer text-black"
                    : "hover:bg-primary/90"
                )}
              >
                {isInterested ? (
                  <>
                    <Check className="h-4 w-4" />
                    Interested
                  </>
                ) : (
                  "I'm Interested"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <WhatsappDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 