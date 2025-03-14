'use client'

import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4 text-center">Terms and Conditions</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <p className="mb-8">
            Welcome to GetDone! By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>

          <hr className="my-8" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              GetDone is a platform where college students and freelancers can complete projects for some passive income. These terms govern your use of our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users can <strong>view projects</strong> without an account.</li>
              <li>To express interest in a project, users must <strong>create an account</strong>.</li>
              <li>There are <strong>no eligibility criteria</strong> to join.</li>
              <li>Currently, <strong>users cannot delete their accounts</strong> (this feature may be added later).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Payment & Fees</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All <strong>payments are handled by GetDone</strong>.</li>
              <li>The platform charges:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>5-10% fee</strong> for projects up to <strong>₹2000</strong>.</li>
                  <li><strong>Fixed 10% fee</strong> for projects <strong>above ₹2000</strong>.</li>
                  <li>Fee will be shared among client and freelancer for e.g. for a ₹2000 budget project with a 10% fee which result to ₹200, both client and freelancer will give us ₹100. We take ₹2100 from client and give ₹1900 to freelancer.</li>
                  <li>This is a small fee compared to the good network of freelancers and projects. This fee helps to maintain the website and ensure that it keeps going without any hurdle.</li>
                </ul>
              </li>
              <li>Payments will be held until the project is <strong>marked as complete</strong>.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Content Ownership & Usage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Organizations retain ownership</strong> of the project content they provide.</li>
              <li>GetDone <strong>reserves the right</strong> to use user-generated content for <strong>marketing purposes</strong>.</li>
              <li>There are <strong>no restrictions</strong> on project types <strong>for now</strong> (subject to change).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Communication & Project Handling</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Direct communication</strong> between freelancers and organizations is <strong>strictly prohibited</strong> without <strong>prior permission</strong> from GetDone.</li>
              <li>Users can only <strong>withdraw from a project</strong> if the work has <strong>not started</strong>.</li>
              <li><strong>Disputes</strong> will be handled <strong>exclusively</strong> by GetDone.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Privacy & Data Collection</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>GetDone collects <strong>Name, Email, and Mobile Number</strong>.</li>
              <li>User data will <strong>not be shared</strong> with third parties.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Freelancer Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Freelancers are solely responsible for delivering <strong>quality work</strong> on time.</li>
              <li>If a freelancer fails to meet expectations, GetDone reserves the right to <strong>reassign the project</strong>.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Refund & Dispute Resolution</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds are allowed <strong>only if</strong> work on the project has <strong>not started</strong>.</li>
              <li>If a dispute arises, GetDone will <strong>review evidence</strong> and make a final decision.</li>
              <li>Disputes must be resolved <strong>through GetDone&apos;s support team</strong>.</li>
              <li>Users must respond to dispute queries <strong>within 3 days</strong>, or GetDone will make a decision based on available data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications to Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>GetDone reserves the right to update these terms <strong>at any time without prior notice</strong>.</li>
              <li>Continued use of the platform after updates constitutes <strong>acceptance</strong> of the new terms.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
            <p>
              For any questions regarding these Terms & Conditions, contact us at{' '}
              <a href="mailto:jenasatyajit.sj@gmail.com" className="text-primary hover:underline">
                support@getdone.com
              </a>
            </p>
          </section>

          <hr className="my-8" />

          <p className="text-center text-muted-foreground">
            By using GetDone, you agree to abide by these Terms & Conditions. Thank you for being part of our community!
          </p>
        </div>
      </Card>
    </div>
  )
} 