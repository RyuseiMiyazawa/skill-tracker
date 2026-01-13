# Skill Tracker

A full-stack skill management application built with Next.js, TypeScript, and designed for AWS deployment.

## 📋 Overview

Skill Tracker is a CRUD application that allows users to manage their technical skills, track experience levels, and categorize their expertise. This project demonstrates modern web development practices and cloud-native architecture.

## ✨ Features

- **View Skills**: Display all skills in a responsive grid layout
- **Add Skills**: Create new skills with name, category, level, and experience
- **Edit Skills**: Update existing skill information
- **Delete Skills**: Remove skills with confirmation
- **Validation**: Client and server-side validation using Zod
- **Responsive UI**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

| Layer          | Technology           |
|----------------|---------------------|
| Frontend       | Next.js 14+ (App Router), React 19, TypeScript |
| Styling        | Tailwind CSS        |
| Validation     | Zod                 |
| API            | Next.js API Routes  |
| Database       | In-memory (demo) → DynamoDB (production) |
| Deployment     | AWS (S3 + CloudFront + Lambda + API Gateway) |

## 📐 Architecture

See [docs/architecture.md](./docs/architecture.md) for detailed AWS architecture diagram.

**High-level flow:**
```
Client → CloudFront → S3 (static)
Client → API Gateway → Lambda → DynamoDB
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd skill-tracker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
skill-tracker/
├── src/
│   ├── app/
│   │   ├── api/skills/          # API routes
│   │   ├── add/                 # Add skill page
│   │   ├── edit/[id]/           # Edit skill page
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home page
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── SkillList.tsx        # Skill cards grid
│   │   └── SkillForm.tsx        # Create/edit form
│   ├── types/
│   │   └── skill.ts             # TypeScript types
│   └── lib/
│       ├── data.ts              # Data layer (in-memory)
│       └── validation.ts        # Zod schemas
├── docs/
│   └── architecture.md          # AWS architecture
├── README.md
└── package.json
```

## 📡 API Endpoints

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | `/api/skills`       | Get all skills      |
| POST   | `/api/skills`       | Create new skill    |
| GET    | `/api/skills/:id`   | Get skill by ID     |
| PATCH  | `/api/skills/:id`   | Update skill        |
| DELETE | `/api/skills/:id`   | Delete skill        |

### Request/Response Examples

**POST /api/skills**
```json
{
  "name": "Next.js",
  "level": 4,
  "category": "Frontend",
  "experience_months": 24
}
```

**Response:**
```json
{
  "id": "1",
  "name": "Next.js",
  "level": 4,
  "category": "Frontend",
  "experience_months": 24,
  "created_at": "2024-01-13T05:00:00.000Z",
  "updated_at": "2024-01-13T05:00:00.000Z"
}
```

## 💡 Key Implementation Details

### 1. Type Safety
- Full TypeScript coverage
- Strict mode enabled
- Zod for runtime validation

### 2. API Design
- RESTful conventions
- Proper HTTP status codes
- Error handling with meaningful messages

### 3. Data Layer
- Abstracted in `lib/data.ts`
- Easy to swap for DynamoDB/Postgres
- CRUD operations separated from API logic

### 4. UI/UX
- Responsive grid layout
- Color-coded skill levels
- Loading states
- Confirmation dialogs for destructive actions

## 🔧 Improvements & Future Work

- [ ] Add search/filter functionality
- [ ] Implement pagination for large datasets
- [ ] Add authentication (AWS Cognito)
- [ ] Connect to real database (DynamoDB)
- [ ] Deploy to AWS with IaC (CDK/Terraform)
- [ ] Add unit and integration tests
- [ ] Implement skill categories as dropdown
- [ ] Add skill progress tracking over time

## 🎯 Why This Project?

This project demonstrates:
- **Full-stack development**: Frontend + Backend + API design
- **Modern React**: App Router, Server Components, Client Components
- **Type safety**: TypeScript + Zod validation
- **Cloud architecture**: AWS-ready design
- **Best practices**: Separation of concerns, error handling, responsive design

Perfect for showcasing in:
- **Freelance portfolios**: Demonstrates end-to-end capability
- **Job interviews**: Shows modern stack proficiency
- **Client projects**: Scalable foundation for SaaS products

## 📝 License

ISC

## 👤 Author

Built as a portfolio project to demonstrate Next.js and AWS expertise.

---

**Note**: This uses in-memory storage for demo purposes. For production, replace `lib/data.ts` with DynamoDB SDK calls.
