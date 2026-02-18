# About Academy (About C) - Security Certification Platform

About Academy is a comprehensive platform for security professionals, offering certification roadmaps, mock exams, and career coaching.

## ✨ Features

- **Certification Roadmap**: Role-based tracks for Security Manager, Privacy Manager, and Auditor.
- **Mock Exam System**: Realistic CBT environment with timer, OMR, and result analysis (CISA, CISSP, etc.).
- **Level Test**: 10-question mini-test to check your current security knowledge.
- **1:1 Coaching**: Career consultation with industry experts.
- **Dashboard**: Track your progress and managed certificates.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: PM2, Nginx, GitHub Actions

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Deployment

This project is configured for automated deployment via GitHub Actions to a self-hosted runner or SSH-accessible server.

- **Production**: `175.106.96.86`
- **CI/CD**: `.github/workflows/deploy.yml`
