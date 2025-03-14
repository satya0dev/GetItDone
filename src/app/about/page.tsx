'use client'

import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to GetDone</h2>
            <p className="text-muted-foreground">
              GetDone is a platform designed to help college students and freelancers earn extra income by working on projects. 
              We bridge the gap between students looking for hands-on experience and organizations needing innovative solutions. 
              Our mission is to create a thriving marketplace where talent meets opportunity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              At GetDone, we believe that students and freelancers should have access to meaningful work opportunities 
              that help them build their skills, gain experience, and earn money. We aim to create a trusted space 
              where organizations can connect with capable individuals eager to contribute and grow.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Browse Projects:</strong> Users can explore a variety of projects posted by organizations.</li>
              <li><strong>Show Interest:</strong> Freelancers and students can show interest in projects after creating an account.</li>
              <li><strong>Secure Payments:</strong> Payments are handled by GetDone to ensure security and fairness.</li>
              <li><strong>Deliver & Earn:</strong> Once the project is completed and approved, freelancers receive their payment after platform fees are deducted.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose GetDone?</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Opportunities for Students & Freelancers:</strong> A chance to gain real-world experience while earning money.</li>
              <li><strong>Trust & Security:</strong> We ensure fair payments and handle disputes professionally.</li>
              <li><strong>Quality Assurance:</strong> Organizations receive high-quality work from motivated individuals.</li>
              <li><strong>No Direct Communication:</strong> GetDone manages interactions to maintain transparency and accountability.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-muted-foreground">
              Whether you&apos;re a student looking to work on exciting projects or an organization seeking skilled freelancers, 
              GetDone is the perfect place to connect. Join us today and be part of a growing community that values talent, 
              innovation, and efficiency.
            </p>
          </section>

          <hr className="my-8" />

          <p className="text-center text-xl font-semibold text-primary">
            GetDone - Where Work Gets Done!
          </p>
        </div>
      </Card>
    </div>
  )
} 