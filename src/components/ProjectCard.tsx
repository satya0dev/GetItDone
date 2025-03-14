import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, IndianRupee, BarChart2, Check, ExternalLink } from "lucide-react"
import { WhatsappDialog } from "@/components/WhatsappDialog"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ProjectCardProps {
  title: string
  description: string
  category: string
  difficulty_level: string
  estimatedPrice: number
  deadline: string
  onInterested: (whatsappNumber: string) => void
  projectId: string
}

export function ProjectCard({
  title,
  description,
  category,
  difficulty_level,
  estimatedPrice,
  deadline,
  onInterested,
  projectId,
}: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isInterested, setIsInterested] = useState(false)
  const router = useRouter()

  // Check if user has already shown interest in this project
  useEffect(() => {
    const checkInterest = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase
          .from('users')
          .select('interested_projects')
          .eq('id', session.user.id)
          .single()
        
        if (data?.interested_projects) {
          setIsInterested(data.interested_projects.includes(projectId))
        }
      }
    }
    checkInterest()
  }, [projectId])

  // Format the deadline date
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const handleSubmit = async (whatsappNumber: string) => {
    await onInterested(whatsappNumber)
    setIsInterested(true)
    setIsDialogOpen(false)
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

      if (updateUserResponse.error) {
        console.error('Update user error:', updateUserResponse.error)
        toast.error('Failed to update user data. Please try again.')
        return
      }

      if (updateProjectResponse.error) {
        console.error('Update project error:', updateProjectResponse.error)
        toast.error('Failed to update project data. Please try again.')
        return
      }

      setIsInterested(false)
      toast.success('Successfully removed interest from project')
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }

  // Check authentication before navigating to details page
  const handleViewDetails = () => {
    // Navigate directly to the project detail page without checking auth
    // Let the page itself handle authentication
    router.push(`/projects/${projectId}`)
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {category}
          </Badge>
        </div>
        <CardDescription className="mt-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <IndianRupee className="mr-2 h-4 w-4" />
            <span>Estimated Price: ₹{estimatedPrice}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Deadline: {formattedDeadline}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Difficulty: {difficulty_level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleViewDetails}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Details
        </Button>
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
      </CardFooter>
      <WhatsappDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
      />
    </Card>
  )
} 