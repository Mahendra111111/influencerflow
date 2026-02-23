## 🏆 Hackathon Submission - AI-Powered Influencer Marketing Platform
# 🚀 InfluencerFlow AI Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**InfluencerFlow** is a cutting-edge, AI-powered influencer marketing platform designed to streamline collaborations between brands and creators. Leveraging advanced AI models, real-time data, and automated workflows, it simplifies everything from creator discovery to contract finalization and secure payments.

---

## ✨ Key Features

### 🤖 AI-Powered Creator Discovery

- **Intelligent Matching**: Find the perfect creators for your campaigns using AI-driven compatibility scoring.
- **Performance Metrics**: Deep dive into engagement rates, niche relevance, and audience demographics.
- **Automated Outreach**: Streamline initial contact with personalized, AI-enhanced communication.

### 📈 Campaign Management

- **Full Lifecycle Tracking**: Manage campaigns from draft to completion with an intuitive dashboard.
- **Opportunity Discovery**: Creators can easily find and apply for relevant brand opportunities.
- **Real-time Analytics**: Monitor campaign progress and ROI in real-time.

### 📜 AI Contract Generation & Digital Signing

- **Automated Legal Docs**: Generate comprehensive, legally-sound contracts using Groq (Llama 3.1) and OpenAI.
- **Internal Signing Workflow**: Secure, legally-binding digital signatures for both brands and creators.
- **Version History**: Track contract negotiations and changes automatically.

### 💬 Real-time Communication

- **Messaging Interface**: Integrated chat system powered by Supabase Real-time.
- **Sentiment Analysis**: AI-powered analysis of communication logs to identify intent and tone.
- **Multi-channel Notifications**: Stay updated via email, SMS (Twilio), and push notifications.

### 💳 Secure Payments

- **Stripe & Razorpay**: Integrated global and regional payment gateways.
- **Milestone Payments**: Support for upfront deposits and performance-based releases.
- **Automated Invoicing**: Professional billing generated for every transaction.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) & [React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)

### Backend & Database

- **API**: Next.js API Routes (Edge-ready)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (OAuth & Email/Password)
- **Caching**: [Redis](https://redis.io/)
- **Queuing**: [BullMQ](https://docs.bullmq.io/)

### AI & Services

- **AI Models**: OpenAI (GPT-4), Groq (Llama 3.1 70B & 8B)
- **Payments**: Stripe, Razorpay
- **Notifications**: Resend (Email), Twilio (SMS)
- **Media**: Sharp (Image processing), PDF-Lib (Contract generation)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase Project
- API Keys (OpenAI, Groq, Stripe, etc.)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Mahendra111111/influencerflow.git
    cd influencerflow
    ```

2.  **Install dependencies**:

    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root and add your credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    GROQ_API_KEY=your-groq-key
    OPENAI_API_KEY=your-openai-key
    # See .env.example for more
    ```

4.  **Run migrations**:

    ```bash
    npx supabase migration up
    ```

5.  **Start the development server**:
    ```bash
    npm run dev
    ```

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, API, Layouts)
├── components/           # Reusable UI components
├── supabase/             # Database migrations and configurations
├── functions/            # Edge functions and background workers
├── lib/                  # Shared utilities and services
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── scripts/              # Development and deployment scripts
```

---

## 🌐 Deployment

Designed for seamless deployment on **Vercel**:

1.  Connect your GitHub repository.
2.  Add environment variables.
3.  Deploy!

For advanced setups, check `DEPLOYMENT.md`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Built with ❤️ by the InfluencerFlow Team._
