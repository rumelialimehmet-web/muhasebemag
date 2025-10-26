# 🏗️ SMART LODGE BUDGET - Technical Architecture & Deployment

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Browser / Web Application (React + Next.js)             │   │
│  │  - PDF Upload Interface                                  │   │
│  │  - Dashboard & Results View                              │   │
│  │  - Data Tables & Charts                                  │   │
│  │  - Export Functionality                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────────┘
                        │ HTTPS REST API + WebSocket
┌───────────────────────▼──────────────────────────────────────────┐
│                    API GATEWAY LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ FastAPI Server (Python 3.11+)                           │   │
│  │  - Request Routing & Validation                          │   │
│  │  - JWT Authentication & Authorization                    │   │
│  │  - Rate Limiting (1000 req/hour per user)                │   │
│  │  - Error Handling & Logging                              │   │
│  │  - CORS & Security Headers                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────────┘
            ┌───────────┴───────────┬─────────────────┐
            │                       │                 │
    ┌───────▼────────┐    ┌────────▼──────┐  ┌──────▼──────────┐
    │ PDF HANDLER    │    │   ANALYSIS    │  │  EXPORT SERVICE│
    │   SERVICE      │    │   SERVICE     │  │                │
    │                │    │               │  │ • Excel Gen    │
    │ • Upload       │    │ • Ratio Calc  │  │ • PDF Gen      │
    │ • Validation   │    │ • Comparison  │  │ • Formatting   │
    │ • Temporary    │    │ • Trends      │  │ • Email        │
    │   Storage      │    │ • Benchmarks  │  │                │
    └────────┬───────┘    └────────┬──────┘  └────────┬────────┘
             │                     │                   │
             └─────────────────────┼───────────────────┘
                                   │
            ┌──────────────────────▼─────────────────────┐
            │      AI/ML PIPELINE SERVICES              │
            │  ┌────────────────────────────────────┐  │
            │  │ • GPT-4 Vision API (Structured)    │  │
            │  │ • Tesseract OCR (Text Extraction)  │  │
            │  │ • Data Validation Engine           │  │
            │  │ • Confidence Scoring               │  │
            │  └────────────────────────────────────┘  │
            └──────────────────────┬────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
    ┌───▼─────────┐    ┌──────────▼────────┐    ┌──────────▼────┐
    │  DATABASE   │    │  CACHE LAYER      │    │  FILE STORAGE │
    │             │    │                   │    │                │
    │ PostgreSQL  │    │ Redis             │    │ Cloud Storage  │
    │             │    │                   │    │ (AWS S3/GCS)   │
    │ • Users     │    │ • Session Cache   │    │                │
    │ • Documents │    │ • Result Cache    │    │ • Uploaded PDFs│
    │ • Statements│    │ • API Response    │    │ • Exports      │
    │ • Analysis  │    │   Cache           │    │                │
    │ • Audit Log │    └───────────────────┘    └────────────────┘
    └─────────────┘
```

---

## Data Flow Diagram

### Document Processing Flow

```
USER ACTION
    │
    ├─→ SELECT PDF FILE
    │   │
    │   ├─→ FRONTEND VALIDATION
    │   │   • File type check
    │   │   • Size validation
    │   │   • File hash generation
    │   │
    ├─→ UPLOAD TO BACKEND
    │   │
    │   ├─→ API VALIDATION
    │   │   • Auth check
    │   │   • File type verify
    │   │   • Virus scan (future)
    │   │   • Rate limit check
    │   │
    ├─→ STORAGE & PROCESSING
    │   │
    │   ├─→ SAVE TEMPORARILY
    │   │   • Store in /uploads
    │   │   • Create DB record
    │   │   • Status = "processing"
    │   │
    ├─→ PDF ANALYSIS (Background Task)
    │   │
    │   ├─→ PDF PREPROCESSING
    │   │   • PDF → Images (150 DPI)
    │   │   • Image deskewing
    │   │   • Contrast enhancement
    │   │
    ├─→ PARALLEL EXTRACTION
    │   │
    │   ├─→ TESSERACT OCR
    │   │   • Page 1 → Text
    │   │   • Page 2 → Text
    │   │   • Turkish language pack
    │   │
    │   ├─→ GPT-4 VISION API
    │   │   • Image + Prompt
    │   │   • JSON Response
    │   │   • Structured data
    │   │
    ├─→ DATA RECONCILIATION
    │   │
    │   ├─→ VALIDATION ENGINE
    │   │   • Schema check
    │   │   • Business rules
    │   │   • Account reconciliation
    │   │   • Confidence scoring
    │   │
    ├─→ ANALYSIS CALCULATION
    │   │
    │   ├─→ RATIO CALCULATIONS
    │   │   • Liquidity ratios (5)
    │   │   • Profitability (6)
    │   │   • Efficiency (4)
    │   │   • Solvency (6)
    │   │
    │   ├─→ PERIOD COMPARISON
    │   │   • Absolute change
    │   │   • Percentage change
    │   │   • Vertical analysis
    │   │   • Alerts for large changes
    │   │
    ├─→ RESULTS STORAGE
    │   │
    │   ├─→ SAVE IN DATABASE
    │   │   • Financial statements
    │   │   • Analysis results
    │   │   • Update document status
    │   │   • Cache in Redis
    │   │
    ├─→ NOTIFICATION
    │   │
    ├─→ USER RECEIVES RESULTS
        • Dashboard updated
        • Charts displayed
        • Ready for export
```

---

## Database Schema Relationships

```
┌──────────────┐
│    users     │
├──────────────┤
│ id (PK)      │◄─────────────┐
│ email        │              │
│ password     │              │
│ full_name    │              │
│ created_at   │              │
└──────────────┘              │
       │                      │
       │ 1:N                  │ 1:N
       │                      │
    ┌──▼──────────────┐  ┌────┴───────────┐
    │   companies     │  │   documents    │
    ├─────────────────┤  ├────────────────┤
    │ id (PK)         │  │ id (PK)        │
    │ user_id (FK)    │  │ user_id (FK)   │
    │ company_name    │  │ company_id(FK) │
    │ tax_id          │  │ file_name      │
    │ sector          │  │ file_path      │
    │ created_at      │  │ status         │
    └─────────────────┘  │ extraction_... │
         │ 1:N           │ created_at     │
         │               └────┬───────────┘
         │                    │
         │              1:N   │   1:N
         │                    │
         └────┬───────────────┼────────────────┐
              │               │                │
         ┌────▼──────────┐ ┌──▼────────────┐  │
         │financial_     │ │analysis_      │  │
         │statements     │ │results        │  │
         ├───────────────┤ ├───────────────┤  │
         │ id (PK)       │ │ id (PK)       │  │
         │ document_...  │ │ document_...  │  │
         │ company_id    │ │ company_id    │  │
         │ st_type       │ │ analysis_type │  │
         │ data_json     │ │ results_json  │  │
         │ created_at    │ │ generated_at  │  │
         └───────────────┘ └───────────────┘  │
                                              │
                                         ┌────▼──────────┐
                                         │   exports     │
                                         ├───────────────┤
                                         │ id (PK)       │
                                         │ document_id(FK
                                         │ user_id (FK)  │
                                         │ format        │
                                         │ file_path     │
                                         │ created_at    │
                                         └───────────────┘
```

---

## Deployment Architecture

### Development Environment

```
Developer Machine
│
├─ Docker Desktop
│  ├─ Frontend Container (Next.js)
│  │  └─ Port 3000
│  │
│  ├─ Backend Container (FastAPI)
│  │  └─ Port 8000
│  │
│  ├─ PostgreSQL Container
│  │  └─ Port 5432
│  │
│  └─ Redis Container
│     └─ Port 6379
│
└─ Local File System
   └─ /uploads (temporary files)
```

### Production Environment

```
AWS / Google Cloud
│
├─ CDN (CloudFlare)
│  └─ smartlodgebudget.com
│
├─ Frontend
│  ├─ Vercel Deployment
│  ├─ Auto-scaling
│  ├─ Edge caching
│  └─ Custom domain
│
├─ Backend
│  ├─ Cloud Run / EC2
│  ├─ Containerized (Docker)
│  ├─ Auto-scaling
│  └─ Load balancing
│
├─ Database
│  ├─ AWS RDS (PostgreSQL)
│  ├─ Automated backups
│  ├─ Read replicas
│  └─ Multi-AZ setup
│
├─ Cache
│  ├─ ElastiCache (Redis)
│  ├─ 10GB memory
│  └─ Auto-failover
│
├─ File Storage
│  ├─ AWS S3 / GCS
│  ├─ Lifecycle policies
│  ├─ Versioning
│  └─ Encryption
│
└─ Monitoring
   ├─ CloudWatch / Stackdriver
   ├─ Error tracking (Sentry)
   ├─ APM (DataDog)
   └─ Uptime monitoring
```

---

## Deployment Steps

### Phase 1: Infrastructure Setup

#### 1.1 AWS Setup
```bash
# Create IAM user
aws iam create-user --user-name smart-lodge-deploy
aws iam attach-user-policy --user-name smart-lodge-deploy \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier smart-lodge-postgres \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword123! \
  --allocated-storage 20

# Create S3 bucket
aws s3 mb s3://smart-lodge-uploads
aws s3api put-bucket-versioning \
  --bucket smart-lodge-uploads \
  --versioning-configuration Status=Enabled

# Create ElastiCache cluster
aws elasticache create-cache-cluster \
  --cache-cluster-id smart-lodge-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
```

#### 1.2 Environment Variables
```bash
# Create .env.production
cat > .env.production << EOF
# Database
DATABASE_URL=postgresql://admin:YourPassword123!@smart-lodge-postgres.c9akciq32.us-east-1.rds.amazonaws.com:5432/smart_lodge

# Redis
REDIS_URL=redis://smart-lodge-redis.c9akciq32.ng.0001.use1.cache.amazonaws.com:6379

# API Keys
OPENAI_API_KEY=sk-your-key-here
SECRET_KEY=your-production-secret-key-here

# S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=smart-lodge-uploads
S3_REGION=us-east-1

# JWT
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# App
DEBUG=False
ENVIRONMENT=production
APP_URL=https://smartlodgebudget.com
EOF
```

### Phase 2: Backend Deployment (Cloud Run)

#### 2.1 Build Docker Image
```bash
cd backend

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app/ app/

# Expose port
EXPOSE 8000

# Run app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Build image
docker build -t smart-lodge-backend:1.0 .
```

#### 2.2 Push to Container Registry
```bash
# Authenticate with Google Cloud
gcloud auth login
gcloud config set project your-project-id

# Tag image
docker tag smart-lodge-backend:1.0 \
  gcr.io/your-project-id/smart-lodge-backend:1.0

# Push
docker push gcr.io/your-project-id/smart-lodge-backend:1.0

# Deploy to Cloud Run
gcloud run deploy smart-lodge-backend \
  --image gcr.io/your-project-id/smart-lodge-backend:1.0 \
  --platform managed \
  --region us-central1 \
  --memory 2Gi \
  --cpu 2 \
  --timeout 600 \
  --set-env-vars-file .env.production \
  --allow-unauthenticated
```

### Phase 3: Frontend Deployment (Vercel)

#### 3.1 Connect to Vercel
```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL https://smart-lodge-backend.run.app

# Deploy
vercel deploy --prod
```

#### 3.2 Configure Custom Domain
```bash
# In Vercel dashboard:
# 1. Go to Project Settings → Domains
# 2. Add domain: smartlodgebudget.com
# 3. Update DNS with Vercel's nameservers
# 4. Enable SSL certificate
```

### Phase 4: Database Setup

#### 4.1 Run Migrations
```bash
# Connect to RDS
export DATABASE_URL="postgresql://admin:YourPassword123!@smart-lodge-postgres.c9akciq32.ng.0001.use1.rds.amazonaws.com:5432/smart_lodge"

# Run migrations
alembic upgrade head
```

#### 4.2 Seed Initial Data
```python
# backend/scripts/seed_data.py
from app.database import SessionLocal, Base, engine
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create tables
Base.metadata.create_all(bind=engine)

# Create seed data
db = SessionLocal()

# Example user
admin_user = User(
    email="admin@smartlodge.com",
    password_hash=pwd_context.hash("admin123"),
    full_name="Admin User",
    role="admin"
)

db.add(admin_user)
db.commit()

print("Database seeded successfully")
```

### Phase 5: Monitoring & Logging

#### 5.1 Setup CloudWatch
```bash
# Create log group
aws logs create-log-group --log-group-name /smart-lodge/backend

# Create metric alarms
aws cloudwatch put-metric-alarm \
  --alarm-name smart-lodge-error-rate \
  --alarm-description "Alert when error rate > 5%" \
  --metric-name ErrorRate \
  --namespace SmartLodge \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:region:account:topic-name
```

#### 5.2 Setup Sentry
```python
# backend/app/config.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="https://your-sentry-dsn@sentry.io/projectid",
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
)
```

#### 5.3 Setup DataDog APM
```python
# backend/app/main.py
from datadog import initialize, api

options = {
    "api_key": "your-datadog-api-key",
    "app_key": "your-datadog-app-key"
}

initialize(**options)
```

---

## CI/CD Pipeline (GitHub Actions)

### Workflow 1: Test & Lint

```yaml
# .github/workflows/test.yml

name: Test & Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run linter
        run: |
          cd backend
          flake8 app/ --count --select=E9,F63,F7,F82 --show-source --statistics
      
      - name: Run tests
        run: |
          cd backend
          pytest tests/ -v --cov=app --cov-report=xml
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run linter
        run: |
          cd frontend
          npm run lint
      
      - name: Run tests
        run: |
          cd frontend
          npm run test
      
      - name: Build
        run: |
          cd frontend
          npm run build
```

### Workflow 2: Deploy to Staging

```yaml
# .github/workflows/deploy-staging.yml

name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy backend to Cloud Run (Staging)
        run: |
          gcloud auth activate-service-account --key-file=${{ secrets.GOOGLE_CLOUD_SA_KEY }}
          gcloud config set project ${{ secrets.GOOGLE_CLOUD_PROJECT }}
          
          docker build -t smart-lodge-backend:staging backend/
          docker tag smart-lodge-backend:staging \
            gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:staging
          docker push gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:staging
          
          gcloud run deploy smart-lodge-backend-staging \
            --image gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:staging \
            --platform managed \
            --region us-central1 \
            --memory 1Gi
      
      - name: Deploy frontend to Vercel (Staging)
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          alias: staging.smartlodgebudget.com
          env: NODE_ENV=staging
```

### Workflow 3: Deploy to Production

```yaml
# .github/workflows/deploy-production.yml

name: Deploy to Production

on:
  push:
    branches: [main]
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy backend to Cloud Run (Production)
        run: |
          gcloud auth activate-service-account --key-file=${{ secrets.GOOGLE_CLOUD_SA_KEY }}
          gcloud config set project ${{ secrets.GOOGLE_CLOUD_PROJECT }}
          
          docker build -t smart-lodge-backend:latest backend/
          docker tag smart-lodge-backend:latest \
            gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:latest
          docker push gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:latest
          
          gcloud run deploy smart-lodge-backend \
            --image gcr.io/${{ secrets.GOOGLE_CLOUD_PROJECT }}/smart-lodge-backend:latest \
            --platform managed \
            --region us-central1 \
            --memory 2Gi \
            --cpu 2
      
      - name: Deploy frontend to Vercel (Production)
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ github.run_number }}
          release_name: Release v${{ github.run_number }}
          draft: false
          prerelease: false
      
      - name: Notify Slack
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{
              "text": "🚀 Smart Lodge Budget v${{ github.run_number }} deployed to production",
              "attachments": [{
                "color": "good",
                "fields": [{
                  "title": "Deployment",
                  "value": "Production",
                  "short": true
                }]
              }]
            }'
```

---

## Monitoring Dashboard

### Key Metrics

```
┌─────────────────────────────────────────────────────┐
│           PRODUCTION MONITORING                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 System Health                                  │
│  ├─ API Uptime: 99.99%                             │
│  ├─ Response Time: 234ms (p95)                     │
│  ├─ Error Rate: 0.02%                              │
│  └─ Active Users: 1,234                            │
│                                                     │
│  📈 Processing Metrics                             │
│  ├─ Avg PDF Process Time: 22s                      │
│  ├─ OCR Accuracy: 96.5%                            │
│  ├─ Documents Processed: 5,432                     │
│  └─ Success Rate: 99.8%                            │
│                                                     │
│  💾 Resource Usage                                 │
│  ├─ Database CPU: 12%                              │
│  ├─ Memory Usage: 1.2/2GB (60%)                    │
│  ├─ Storage: 48GB/100GB (48%)                      │
│  └─ Network: 125Mbps/1Gbps                         │
│                                                     │
│  🔐 Security Events                                │
│  ├─ Login Attempts: 2,345                          │
│  ├─ Failed Auth: 3 (blocked)                       │
│  ├─ API Rate Limits: 0 violations                  │
│  └─ Malware Scans: All clear                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Backup & Disaster Recovery

### Backup Strategy

```
Database Backups
├─ Daily automated snapshots (5 copies retained)
├─ Weekly full backup to S3
├─ Monthly archive to Glacier
└─ Point-in-time recovery (30 days)

File Storage Backups
├─ S3 versioning enabled
├─ Cross-region replication
├─ Lifecycle policies:
│  ├─ 90 days: Standard
│  ├─ 90-365 days: Standard-IA
│  └─ >365 days: Glacier
└─ Automated cleanup

RTO/RPO Targets
├─ RTO (Recovery Time): 1 hour
├─ RPO (Recovery Point): 1 hour
└─ Monthly recovery drills
```

### Disaster Recovery Procedures

```bash
# 1. Identify Issue
aws health describe-events --region us-east-1

# 2. Failover to Secondary Region (if needed)
gcloud run deploy smart-lodge-backend \
  --region us-west1 \
  --image gcr.io/project/smart-lodge-backend:latest

# 3. Restore Database
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier smart-lodge-postgres-recovered \
  --db-snapshot-identifier smart-lodge-postgres-snapshot-latest

# 4. Update DNS
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://dns-update.json

# 5. Verify Services
curl https://smartlodgebudget.com/health
```

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Ready for Deployment ✅
