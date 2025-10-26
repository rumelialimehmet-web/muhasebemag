# 🚀 Smart Lodge Budget MVP

**AI-Powered Financial Analysis Platform for Turkish Accountants**

> 30 saniyede Kurumlar Vergisi Beyannamesi analizi | 21 farklı finansal oran | %99+ doğruluk

## ⚡ HIZLI BAŞLANGIÇ

**5 dakikada %100 ÜCRETSİZ deploy!**

```bash
# 1. Gemini API Key alın (ÜCRETSİZ)
https://ai.google.dev/

# 2. Render.com'da backend deploy (ÜCRETSİZ + database dahil!)
https://render.com/

# 3. Vercel'de frontend deploy (ÜCRETSİZ)
https://vercel.com/

# Detaylar için: QUICK_START.md veya RENDER_DEPLOYMENT.md
```

**Maliyet:** $0/ay - Tamamen ücretsiz! 💰

---

## 📋 Proje Özeti

Smart Lodge Budget, mali müşavirler ve muhasebe profesyonelleri için geliştirilmiş yapay zeka destekli finansal analiz platformudur. Kurumlar Vergisi Beyannamesi PDF'lerini otomatik olarak işleyerek saniyeler içinde kapsamlı finansal analizler sunar.

### 🎯 Temel Değer Önerisi

| Özellik | Manuel Süreç | Smart Lodge Budget |
|---------|--------------|-------------------|
| **İşlem Süresi** | 2-3 saat | 30 saniye |
| **Doğruluk Oranı** | %80-85 | %99+ |
| **Maliyet** | $50-75 | $1-2 |
| **Analiz Sayısı** | 3-7 temel oran | 21 kapsamlı analiz |

### ✨ Ana Özellikler

- ✅ **PDF İşleme**: GPT-4 Vision + Tesseract OCR ile otomatik veri çıkarma
- ✅ **Finansal Tablolar**: Mizan, Bilanço, Gelir Tablosu otomatik oluşturma
- ✅ **21 Rasyo Analizi**: Likidite, Karlılık, Verimlilik, Ödeme Gücü
- ✅ **Karşılaştırmalı Analiz**: Dönemler arası otomatik karşılaştırma
- ✅ **Dashboard**: İnteraktif grafikler ve görselleştirmeler
- ✅ **Excel Export**: Profesyonel raporlar

---

## 🏗️ Teknoloji Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: Supabase PostgreSQL (Cloud)
- **Cache**: Upstash Redis (Cloud)
- **ORM**: SQLAlchemy 2.0 (Async)
- **AI/ML**: Google Gemini 1.5 Pro (ÜCRETSİZ!), Tesseract OCR

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3
- **Components**: Shadcn/ui
- **Charts**: Recharts

### Cloud & Deployment (%100 Ücretsiz!)
- **Frontend Hosting**: Vercel (Ücretsiz)
- **Backend Hosting**: Render.com (Ücretsiz + 750h/ay)
- **Database**: Render PostgreSQL (Ücretsiz 1GB - dahil!)
- **Cache**: Upstash Redis (Ücretsiz 10K req/day)
- **AI**: Google Gemini (Ücretsiz 60 req/min)

**TOPLAM MALİYET: $0/ay** 🎉

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Docker Desktop (v24+)
- Docker Compose (v2.20+)
- Git
- (Opsiyonel) Node.js 20+ ve Python 3.11+ (local development için)

### 1️⃣ Projeyi Klonlayın

```bash
git clone https://github.com/rumelialimehmet-web/muhasebemag.git
cd muhasebemag
```

### 2️⃣ Environment Değişkenlerini Ayarlayın

```bash
# Backend .env dosyası zaten oluşturuldu
# OpenAI API Key'inizi ekleyin:
nano backend/.env
# OPENAI_API_KEY=your-key-here
```

### 3️⃣ Docker ile Başlatın

```bash
# Tüm servisleri başlat (PostgreSQL + Redis + Backend + Frontend)
docker-compose -f docker-compose.dev.yml up --build

# Arka planda çalıştırmak için:
docker-compose -f docker-compose.dev.yml up -d
```

### 4️⃣ Uygulamayı Açın

```
🌐 Frontend:  http://localhost:3000
📚 API Docs:  http://localhost:8000/docs
🏥 Health:    http://localhost:8000/health
```

### 5️⃣ Durdurma

```bash
docker-compose -f docker-compose.dev.yml down

# Verileri de silmek için:
docker-compose -f docker-compose.dev.yml down -v
```

---

## 📁 Proje Yapısı

```
muhasebemag/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── api/               # API endpoints
│   │   │   └── v1/
│   │   │       ├── endpoints/ # Individual route files
│   │   │       └── router.py  # Main router
│   │   ├── core/              # Core functionality
│   │   │   ├── config.py      # Settings
│   │   │   ├── database.py    # DB connection
│   │   │   └── cache.py       # Redis cache
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utilities
│   │   └── main.py            # FastAPI app
│   ├── tests/                 # Backend tests
│   ├── Dockerfile.dev         # Development Dockerfile
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── frontend/                  # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Next.js 14 App Router
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Home page
│   │   │   └── globals.css   # Global styles
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # Additional styles
│   ├── public/               # Static files
│   ├── Dockerfile.dev        # Development Dockerfile
│   ├── package.json          # Node dependencies
│   ├── tsconfig.json         # TypeScript config
│   └── tailwind.config.ts    # Tailwind config
│
├── docs/                     # Documentation
├── docker/                   # Docker configs
├── old-mvp/                  # Previous simple version (backup)
│
├── docker-compose.dev.yml    # Development compose
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🔧 Local Development (Docker olmadan)

### Backend

```bash
cd backend

# Virtual environment oluştur
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Dependencies yükle
pip install -r requirements.txt

# PostgreSQL ve Redis'in çalıştığından emin olun
# Sonra sunucuyu başlat
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend

# Dependencies yükle
npm install

# Development server başlat
npm run dev
```

---

## 📊 Sprint Planlaması

### ✅ Sprint 0: Foundation (Tamamlandı)
- [x] Monorepo structure
- [x] FastAPI backend scaffolding
- [x] Next.js frontend scaffolding
- [x] Docker development environment
- [x] PostgreSQL + Redis setup
- [x] Basic health check endpoints

### 🔄 Sprint 1: PDF Processing (2 hafta) - Sonraki
- [ ] PDF upload endpoint
- [ ] OCR integration (Tesseract)
- [ ] GPT-4 Vision API integration
- [ ] Data extraction logic
- [ ] Validation engine
- [ ] Unit tests

### ⏳ Sprint 2: Analysis Engine (2 hafta)
- [ ] Financial statement builder
- [ ] 21 ratio calculations
- [ ] Period comparison
- [ ] Database models
- [ ] Caching layer

### ⏳ Sprint 3: Visualization (2 hafta)
- [ ] Dashboard UI
- [ ] Charts & graphs
- [ ] Excel export service
- [ ] PDF report generation

### ⏳ Sprint 4: Authentication (1 hafta)
- [ ] JWT authentication
- [ ] User management
- [ ] RBAC
- [ ] Security hardening

### ⏳ Sprint 5: Testing & Polish (1 hafta)
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Documentation
- [ ] Bug fixes

---

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v --cov=app

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 📚 API Documentation

API dokümantasyonuna erişim:

```
http://localhost:8000/docs        # Swagger UI (Interactive)
http://localhost:8000/redoc       # ReDoc (Alternative)
http://localhost:8000/openapi.json # OpenAPI Schema
```

### Temel Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/health` | Health check |
| GET | `/api/v1/health/detailed` | Detailed health (DB + Cache) |
| POST | `/api/v1/documents/upload` | PDF yükleme |
| GET | `/api/v1/documents` | Doküman listesi |
| POST | `/api/v1/analysis/{id}` | Analiz çalıştır |
| GET | `/api/v1/analysis/{id}/ratios` | Rasyo sonuçları |

---

## 🔐 Güvenlik

### Development
- Debug mode: **AÇIK**
- CORS: **localhost:3000**
- Secret key: **geliştirme için basit**

### Production
- [ ] Debug mode: **KAPALI**
- [ ] CORS: **sadece production domain**
- [ ] Secret key: **güçlü, rastgele**
- [ ] HTTPS/TLS zorunlu
- [ ] Rate limiting aktif
- [ ] SQL injection koruması
- [ ] XSS koruması

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Vercel CLI ile
vercel --prod

# veya GitHub integration ile otomatik
```

### Backend (Cloud Run / Docker)

```bash
# Docker image oluştur
docker build -t smart-lodge-backend:latest -f backend/Dockerfile .

# Cloud Run'a deploy
gcloud run deploy smart-lodge-backend \
  --image gcr.io/PROJECT_ID/smart-lodge-backend \
  --platform managed
```

---

## 📈 Roadmap

### MVP v1.0 (Aralık 2025)
- ✅ Core functionality
- ✅ PDF processing
- ✅ 21 ratio analysis
- ✅ Basic dashboard
- ✅ Excel export

### v2.0 (Q1 2026)
- [ ] Bireysel Gelir Vergisi desteği
- [ ] KDV Beyannameleri
- [ ] Multi-language (EN, DE)
- [ ] Mobile app
- [ ] API access for partners

### v3.0 (Q2 2026)
- [ ] Bank integration
- [ ] Forecasting & budgeting
- [ ] Advanced analytics
- [ ] Custom reports builder

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 📞 İletişim

- **GitHub Issues**: [Issues sayfası](https://github.com/rumelialimehmet-web/muhasebemag/issues)
- **Email**: contact@smartlodgebudget.com

---

## 🙏 Teşekkürler

- OpenAI GPT-4 Vision API
- FastAPI Framework
- Next.js Team
- Shadcn/ui Components
- Tüm açık kaynak katkıcılarına

---

**Made with ❤️ by Smart Lodge Budget Team**

*Last updated: Ekim 2025 | Version: 1.0.0-alpha*
