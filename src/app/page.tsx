'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'

// Types
interface Project {
  id: string
  title: string
  category: string
  estimatedPrice: number
  deadline: string
}

// Dummy data
const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    category: 'Web Dev',
    estimatedPrice: 2000,
    deadline: '2024-04-15',
  },
  {
    id: '2',
    title: 'AI-Powered Chatbot',
    category: 'AI/ML',
    estimatedPrice: 1500,
    deadline: '2024-04-20',
  },
  {
    id: '3',
    title: 'Mobile App UI Design',
    category: 'Design',
    estimatedPrice: 800,
    deadline: '2024-04-10',
  },
  {
    id: '4',
    title: 'React Native Mobile App',
    category: 'App Dev',
    estimatedPrice: 3000,
    deadline: '2024-05-01',
  },
]

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(dummyProjects)

  const handleInterested = (projectId: string) => {
    // This will be replaced with actual functionality later
    console.log('Interested in project:', projectId)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Available Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              estimatedPrice={project.estimatedPrice}
              deadline={project.deadline}
              onInterested={() => handleInterested(project.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
