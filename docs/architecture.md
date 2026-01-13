# AWS Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                         │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTPS
                                │
                ┌───────────────┴────────────────┐
                │                                │
                │                                │
        ┌───────▼────────┐              ┌───────▼────────┐
        │   CloudFront   │              │  API Gateway   │
        │    (CDN)       │              │   (REST API)   │
        └───────┬────────┘              └───────┬────────┘
                │                                │
                │                                │
        ┌───────▼────────┐              ┌───────▼────────┐
        │  S3 Bucket     │              │     Lambda     │
        │  (Static Site) │              │   (Node.js)    │
        └────────────────┘              └───────┬────────┘
                                                 │
                                                 │
                                         ┌───────▼────────┐
                                         │   DynamoDB     │
                                         │  (NoSQL DB)    │
                                         └────────────────┘
                                                 │
                                                 │
                                         ┌───────▼────────┐
                                         │  CloudWatch    │
                                         │    (Logs)      │
                                         └────────────────┘
```

## Components

### Frontend (Static Hosting)
- **S3**: Stores static files (HTML, CSS, JS)
- **CloudFront**: CDN for fast global delivery
- **Next.js**: Built and deployed as static export

### Backend (API)
- **API Gateway**: REST API endpoint
- **Lambda**: Serverless functions (Node.js runtime)
- **DynamoDB**: NoSQL database for skill data

### Monitoring
- **CloudWatch**: Logs and metrics

## Data Flow

1. User accesses app → CloudFront → S3 (static files)
2. User performs CRUD → API Gateway → Lambda
3. Lambda validates with Zod → DynamoDB
4. Response back to client
5. All logs → CloudWatch

## Cost Estimation

For small-scale usage (prototype/portfolio):
- **S3**: ~$0.50/month
- **CloudFront**: ~$1/month
- **Lambda**: Free tier (1M requests/month)
- **DynamoDB**: Free tier (25GB storage)
- **API Gateway**: Free tier (1M requests/month)

**Total**: ~$2-5/month

## Production Deployment Steps

1. Build Next.js: `npm run build`
2. Deploy frontend to S3 + CloudFront
3. Deploy API as Lambda functions (using AWS CDK or Serverless Framework)
4. Create DynamoDB table
5. Configure API Gateway endpoints
6. Set environment variables
7. Enable CloudWatch monitoring

## Alternative: Vercel Deployment (Simpler)

For fastest deployment:
- Use Vercel (free tier)
- Backend: Next.js API Routes (serverless)
- Database: Vercel KV or external DynamoDB

```bash
# Deploy to Vercel
npm install -g vercel
vercel deploy
```

This would still show AWS knowledge while being faster to demonstrate.
