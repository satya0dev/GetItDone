'use client'

import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to GetDone (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). Your privacy is important to us, and we are committed to protecting 
              the information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard 
              your personal data when you use our platform.
            </p>
            <p className="text-muted-foreground mt-4">
              For the purposes of this Privacy Policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>&quot;User&quot; or &quot;Freelancer&quot; refers to individuals who register on GetDone to complete projects.</li>
              <li>&quot;Client&quot; or &quot;Organization&quot; refers to entities that post projects on GetDone and seek freelancers to complete them.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect the following personal information when you use our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Name</li>
              <li>Email address</li>
              <li>Mobile number</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This information is collected when you create an account, interact with the platform, or communicate with us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To create and manage user accounts</li>
              <li>To facilitate project postings and freelancer engagement</li>
              <li>To process payments securely</li>
              <li>To communicate updates, notifications, and service improvements</li>
              <li>To resolve disputes and enforce platform policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Protection</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>GetDone does <strong>not</strong> share personal data with third parties for marketing or external use.</li>
              <li>User data is stored securely, and we implement measures to prevent unauthorized access.</li>
              <li>Payment details are processed securely through third-party payment processors.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Communication and Interaction Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Communication between Users (Freelancers) and Clients (Organizations) must occur within the GetDone platform.</li>
              <li>Direct communication outside the platform is strictly prohibited without prior approval from GetDone.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Content Ownership and Usage</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Clients retain ownership of the content they upload to the platform.</li>
              <li>GetDone reserves the right to use user-generated content for marketing and promotional purposes.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Dispute Resolution and Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>In case of disputes, GetDone will act as a mediator to resolve issues fairly.</li>
              <li>Refunds, if applicable, will be processed based on a case-by-case evaluation by GetDone&apos;s support team.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Responsibility for Project Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Freelancers are solely responsible for delivering project outcomes as per the agreed terms.</li>
              <li>Clients are responsible for providing clear project details and ensuring timely payments.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Updates to the Privacy Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>GetDone reserves the right to update this Privacy Policy at any time without prior notice.</li>
              <li>Users will be notified of significant changes via email or platform notifications.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions regarding this Privacy Policy, please contact us at{' '}
              <a href="mailto:jenasatyajit.sj@gmail.com" className="text-primary hover:underline">
                support@getdone.com
              </a>
            </p>
          </section>

          <hr className="my-8" />

          <p className="text-center text-muted-foreground">
            By using GetDone, you agree to this Privacy Policy and the terms outlined above.
          </p>
        </div>
      </Card>
    </div>
  )
} 