import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign, FileText, BarChart2 } from "lucide-react"
import { WhatsappDialog } from "@/components/WhatsappDialog"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  category: string
  difficulty_level: string
  estimatedPrice: number
  deadline: string
  onInterested: (whatsappNumber: string) => void
}

export function ProjectCard({
  title,
  description,
  category,
  difficulty_level,
  estimatedPrice,
  deadline,
  onInterested,
}: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Format the deadline date
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

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
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Estimated Price: ${estimatedPrice}</span>
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
      <CardFooter>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full hover:bg-primary/90 transition-colors"
        >
          I'm Interested
        </Button>
      </CardFooter>
      <WhatsappDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={onInterested}
      />
    </Card>
  )
} 