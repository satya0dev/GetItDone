import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, DollarSign } from "lucide-react"

interface ProjectCardProps {
  title: string
  category: string
  estimatedPrice: number
  deadline: string
  onInterested: () => void
}

export function ProjectCard({
  title,
  category,
  estimatedPrice,
  deadline,
  onInterested,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Estimated Price: ${estimatedPrice}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onInterested}
          className="w-full hover:bg-primary/90 transition-colors"
        >
          I'm Interested
        </Button>
      </CardFooter>
    </Card>
  )
} 