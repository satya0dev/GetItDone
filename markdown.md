## Overview

A platform that connects people who need projects completed with freelancers (college students) who can complete them for money.

## Target Audience

- **Freelancers**: College students skilled in research papers, coding, web/app development, AI/ML, graphic design, etc.
- **Admin**: The only one who posts projects, approves/rejects freelancers, and manages payments.

## Core Features

### For Freelancers:

- **Sign in with GitHub** (Mandatory to show interest in projects)
- **Project Listings:** View projects with filters and sorting options
- **Interested Button:** Click to express interest and then prompted to share WhatsApp number for communication
- **Limit:** Can show interest in a maximum of 5 projects at a time
- **Email Notifications:** Receive email if rejected
- there will be two sections:
    - **"In Progress"**: Projects they are currently working on.
    - **"Completed"**: Not visible to freelancers, only for admin tracking.

### For Admin:

- **Project Management:** Only the admin can post projects
- **Admin Dashboard:** View projects and interested freelancers
- **Freelancer Approval/Rejection:**
    - Approve freelancers for projects
    - Reject freelancers with optional feedback
    - Automatically reject remaining freelancers when one is approved (feedback: "Work taken")
- **Project Sections:**
    - Ongoing projects in the “In Progress” section
    - Completed projects in the “Completed” section (visible to admin only)
- **Project Details:** Include descriptions, deadlines, estimated price
- **Drive Link:** Option to add a Google Drive link for additional documents

## User Collection Schema (Stored in Supabase)

- **User ID**
- **Name**
- **Email**
- **GitHub ID**
- **Avatar** (fetched from GitHub profile)
- **WhatsApp Number** (validated)
- **Interested Projects (List)**
- **Approved Projects (List)**

## Project Collection Schema (Stored in Supabase)

- **Project ID**
- **Title**
- **Description**
- **Category (App Dev, Web Dev, AI/ML, etc.)**
- **Difficulty Level**
- **Deadline**
- **Estimated Price**
- **Drive Link (Optional)**
- **Interested Freelancers (List of User IDs & WhatsApp Numbers)**
- **Approved Freelancer (User ID)**
- **Status (Open, In Progress, Completed)**

## Tech Stack Recommendation

### Frontend:

- **Next.js + Tailwind CSS** (Fast, SEO-friendly, SSR support)
- **ShadCN** (For clean, modern UI components)

### Backend:

- **Node.js + Express** (Lightweight, scalable API framework)
- **Supabase (PostgreSQL)** (Managed database with real-time subscriptions and authentication)

### Authentication:

- **GitHub OAuth via Supabase** (Easy GitHub login integration)

### Deployment:

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** Supabase (PostgreSQL)

### Future Expansion Possibilities

- **Automated Payments** (Integrate Stripe for secure transactions)
- **User-Posted Projects** (Allow users to submit projects)
- **Leaderboards & Reviews** (Freelancer ratings and feedback system)

## Development Phases

1. **MVP (Minimal Viable Product)**
    - GitHub authentication
    - Admin project posting
    - Freelancer interest system
    - Admin approval/rejection system
    - Email notifications
    - Supabase database setup
2. **Enhancements**
    - Sorting & filtering projects
    - Progress tracking
    - Basic analytics for admin
3. **Future Features**
    - Automated payments
    - Public project posting
    - Freelancer ratings & reviews

---

## **UI/UX Design Principles**

- **Simple and clean** interface for easy navigation.
- **Mobile-first design** since freelancers are college students.
- **Dark mode support** for user preference.
- **Filters & Sorting** for easy project discovery.

---

## **Security Considerations**

- **OAuth for authentication** (No password storage issues).
- **Validation on WhatsApp number** input.
- **Admin-only access** for posting projects & approving freelancers.