# 🎯 SMART LODGE BUDGET - MVP DEVELOPMENT PLAN

**Proje:** Muhasebe Mali Müşavirler İçin AI-Powered Finansal Analiz Platformu  
**Versiyon:** MVP v1.0  
**Hedef:** 30 saniyede Kurumlar Vergisi Beyannamesi analizi  
**Başlangıç Tarihi:** Kasım 2025  
**Tamamlanma Tarihi:** Aralık 2025 (8 hafta)

---

## 📋 İÇİNDEKİLER

1. [Proje Özeti](#proje-özeti)
2. [Teknik Mimari](#teknik-mimari)
3. [Sprint Planlaması](#sprint-planlaması)
4. [Detaylı Feature Breakdown](#detaylı-feature-breakdown)
5. [Database Şeması](#database-şeması)
6. [API Endpoints](#api-endpoints)
7. [Frontend Bileşenleri](#frontend-bileşenleri)
8. [AI/ML Pipeline](#aiml-pipeline)
9. [Testing Strategy](#testing-strategy)
10. [DevOps & Deployment](#devops--deployment)

---

## 🎯 PROJE ÖZETI

### Hedef Kullanıcı
- Mali müşavirler
- Muhasebe müdürleri
- Finansal analistler
- KOBİ sahipleri

### Temel Değer Önerisi
- ⏱️ **30 saniyede sonuç** (vs manuel 2-3 saat)
- 🤖 **%99 doğruluk** (manuel hata %15-20 vs <1%)
- 📊 **21 farklı analiz** (otomatik)
- 💾 **Kolay Excel çıktı** (hazır formatlar)

### MVP Kapsam
✅ Kurumlar Vergisi Beyannamesi PDF okuma  
✅ Temel finansal tablo oluşturma  
✅ Rasyo analizleri  
✅ Dönem karşılaştırması  
✅ Dashboard + Grafikler  
✅ Excel export  
❌ Bireysel Gelir Vergisi (v2.0)  
❌ KDV Beyannameleri (v2.0)  
❌ Banka entegrasyonu (v2.0)  

---

## 🏗️ TEKNIK MİMARİ

### Sistem Mimarisi

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                        │
│  React/Next.js + TypeScript + Tailwind CSS + Shadcn/ui     │
│  - Dashboard                                                 │
│  - PDF Upload UI                                             │
│  - Analysis Results View                                     │
│  - Excel Export                                              │
└───────────────┬───────────────────────────────────────────────┘
                │ HTTPS REST API / WebSocket
┌───────────────▼───────────────────────────────────────────────┐
│                        API GATEWAY LAYER                       │
│  FastAPI + Uvicorn (Python 3.11+)                            │
│  - Authentication (JWT)                                      │
│  - Rate Limiting                                             │
│  - Request Validation                                        │
└───────────────┬───────────────────────────────────────────────┘
                │
    ┌───────────┴────────────┬──────────────────┐
    │                        │                  │
┌───▼────────┐    ┌─────────▼────┐    ┌──────▼─────────┐
│   PDF      │    │   ANALYSIS   │    │    EXPORT      │
│  SERVICE   │    │   SERVICE    │    │    SERVICE     │
│            │    │              │    │                │
│ • OCR      │    │ • Ratios     │    │ • Excel Gen    │
│ • Parser   │    │ • Comparison │    │ • PDF Gen      │
│ • Validator│    │ • Forecasting│    │ • Email        │
└────┬───────┘    └──────┬───────┘    └────┬───────────┘
     │                   │                  │
     └───────────────────┼──────────────────┘
                         │
                ┌────────▼──────────┐
                │  ML/AI SERVICE    │
                │                   │
                │ • GPT-4 Vision    │
                │ • OCR (Tesseract) │
                │ • Data Extraction │
                │ • Validation      │
                └────────┬──────────┘
                         │
                ┌────────▼──────────┐
                │    DATABASE       │
                │   PostgreSQL      │
                │                   │
                │ • Users           │
                │ • Documents       │
                │ • Results         │
                │ • Audit Trail     │
                └───────────────────┘
```

### Technology Stack

| Layer | Technology | Versiyon |
|-------|-----------|----------|
| **Frontend** | Next.js 14 | 14.0+ |
| | React | 18.2+ |
| | TypeScript | 5.2+ |
| | Tailwind CSS | 3.3+ |
| | Shadcn/ui | Latest |
| | Axios | 1.6+ |
| | Recharts | 2.10+ |
| **Backend** | Python | 3.11+ |
| | FastAPI | 0.104+ |
| | Uvicorn | 0.24+ |
| | SQLAlchemy | 2.0+ |
| | Pydantic | 2.0+ |
| **AI/ML** | OpenAI GPT-4 Vision | API |
| | Tesseract OCR | 5.3+ |
| | PyPDF2 | 3.17+ |
| | pdf2image | 1.16+ |
| | Pillow | 10.0+ |
| **Database** | PostgreSQL | 15+ |
| | Redis | 7.0+ (Cache) |
| **DevOps** | Docker | 24+ |
| | Docker Compose | 2.20+ |
| | GitHub Actions | Latest |
| | Vercel | Next.js Hosting |
| **Excel** | openpyxl | 3.11+ |
| | xlsxwriter | 3.1+ |

---

## 📅 SPRINT PLANLAMASI

### Sprint 0: Foundation (Hafta 0-1)
**Hedef:** Projeyi başlatmak ve altyapıyı hazırlamak

**Tasks:**
- [ ] GitHub repository setup (monorepo structure)
- [ ] Docker ortamı konfigürasyonu
- [ ] Database migration setup
- [ ] Frontend & Backend project scaffolding
- [ ] CI/CD pipeline başlangıcı

**Deliverables:**
- Çalışan local development ortamı
- Database ready
- Git workflow'u tanımlanmış

**Completion Criteria:**
- `npm run dev` ile frontend çalışır
- `uvicorn main:app` ile backend çalışır
- PostgreSQL test verisi yüklü

---

### Sprint 1: PDF Processing Engine (Hafta 1-2)
**Hedef:** Kurumlar Vergisi Beyannamesi PDF'lerini okumak

**Tasks - Backend:**
- [ ] PDF upload endpoint (FastAPI)
- [ ] File validation (size, format, virus scan)
- [ ] OCR service integration (Tesseract)
- [ ] GPT-4 Vision API integration
- [ ] Data extraction logic
- [ ] Validation rules engine
- [ ] Error handling & logging

**Tasks - Frontend:**
- [ ] PDF upload component (drag & drop)
- [ ] Upload progress UI
- [ ] Error message display
- [ ] Loading states

**Tasks - Database:**
- [ ] Documents table
- [ ] Extracted data temporary storage
- [ ] Audit log table

**Deliverables:**
- PDF upload & parsing çalışması
- Extracted JSON data
- Unit tests (%80+ coverage)

**Completion Criteria:**
- 95%+ OCR accuracy
- <15 saniyede PDF parse
- Hata durumlarında graceful fallback

---

### Sprint 2: Financial Analysis Engine (Hafta 2-4)
**Heçef:** Finansal tablo oluşturma ve rasyo analizleri

**Tasks - Backend Analysis:**
- [ ] Trial Balance (Mizan) generator
- [ ] Balance Sheet (Bilanço) builder
  - [ ] Asset side organization
  - [ ] Liability & Equity side
  - [ ] Account code generation
- [ ] Income Statement (Gelir Tablosu)
- [ ] Ratio calculations
  - [ ] Liquidity Ratios (5 tane)
  - [ ] Profitability Ratios (6 tane)
  - [ ] Efficiency Ratios (4 tane)
  - [ ] Solvency Ratios (6 tane)
- [ ] Period comparison logic
- [ ] Vertical analysis (%)
- [ ] Horizontal analysis

**Tasks - Backend Services:**
- [ ] Results caching (Redis)
- [ ] Result storage
- [ ] Trend detection algorithms

**Tasks - Frontend:**
- [ ] Results dashboard layout
- [ ] Table components (Mizan, Bilanço, Gelir)
- [ ] Ratio display cards
- [ ] Period comparison views
- [ ] Loading skeletons

**Deliverables:**
- Tam finansal analiz engine
- 21 farklı analiz sonucu
- Unit + Integration tests

**Completion Criteria:**
- <30 saniyede tam analiz
- %99+ doğruluk
- Tüm 21 analiz ekran da gösterilir

---

### Sprint 3: Visualization & Export (Hafta 4-5)
**Hedef:** Dashboard, grafikler ve Excel çıktısı

**Tasks - Dashboard:**
- [ ] 3D Pie charts (Aktif, Pasif, Gelir yapısı)
- [ ] Bar charts (Period comparison)
- [ ] Line charts (Trends)
- [ ] KPI cards
- [ ] Executive summary

**Tasks - Export Service:**
- [ ] Excel file generation
  - [ ] Formatted tables
  - [ ] Charts embedded
  - [ ] Multiple sheets
  - [ ] Formulas preserved
- [ ] PDF report generation
- [ ] Email integration

**Tasks - Frontend:**
- [ ] Export UI buttons
- [ ] Format selection (Excel, PDF)
- [ ] Download management
- [ ] Email send UI

**Deliverables:**
- Interactive dashboard
- Professional Excel outputs
- PDF reports

**Completion Criteria:**
- Dashboard responsive (mobile friendly)
- Excel dosyası < 5MB
- PDF rapor professional görünüş

---

### Sprint 4: Authentication & Security (Hafta 5-6)
**Hedef:** User management ve security hardening

**Tasks:**
- [ ] JWT authentication
- [ ] User registration/login
- [ ] Password hashing (bcrypt)
- [ ] Role-based access control (RBAC)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Input validation & sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection

**Deliverables:**
- Secure authentication system
- User management

**Completion Criteria:**
- OWASP Top 10 compliance
- Security audit passed

---

### Sprint 5: Testing & Optimization (Hafta 6-7)
**Hedef:** Kalite assurance ve performans

**Tasks - Testing:**
- [ ] Unit tests (%90+ coverage)
- [ ] Integration tests
- [ ] E2E tests (Cypress)
- [ ] Performance testing
- [ ] Load testing (k6)
- [ ] Security testing

**Tasks - Optimization:**
- [ ] Frontend optimization (code splitting, lazy loading)
- [ ] Backend optimization (query optimization, caching)
- [ ] Database optimization (indexes)
- [ ] Image optimization
- [ ] CDN setup

**Tasks - Documentation:**
- [ ] API documentation (Swagger)
- [ ] User guide
- [ ] Admin guide
- [ ] Developer guide

**Deliverables:**
- Test reports
- Performance metrics
- Documentation

**Completion Criteria:**
- %90+ test coverage
- Lighthouse score >90
- <2s load time

---

### Sprint 6: Deployment & Launch (Hafta 7-8)
**Heçef:** Üretim ortamına deploy ve launch

**Tasks:**
- [ ] Production database setup
- [ ] Vercel deployment
- [ ] Environment variables configuration
- [ ] SSL certificates
- [ ] DNS setup
- [ ] Monitoring & alerting
- [ ] Backup strategy
- [ ] Disaster recovery plan

**Tasks - Pre-Launch:**
- [ ] Final testing
- [ ] UAT with pilot customers
- [ ] Bug fixes
- [ ] Performance tuning

**Deliverables:**
- Live production system
- Monitoring dashboard
- Documentation

**Completion Criteria:**
- 99.9% uptime SLA
- Zero critical bugs
- Users training completed

---

## 🔍 DETAYLÎ FEATURE BREAKDOWN

### Feature 1: PDF Upload & Parsing

#### Requirements
```
Functional:
- Accept PDF files (max 50MB)
- Extract tabular data
- Validate extracted data
- Support multiple Turkish tax forms
- Show parsing progress

Non-Functional:
- Process time: <15 seconds
- Accuracy: >95%
- Concurrent uploads: 100+
```

#### Implementation Details

**Backend - File Handler Service:**
```python
# /services/pdf_service.py

class PDFService:
    def __init__(self):
        self.ocr_engine = TesseractOCR()
        self.vision_client = OpenAI()
        self.validator = DataValidator()
    
    async def process_pdf(self, file: UploadFile) -> dict:
        # 1. Validate file
        await self.validate_file(file)
        
        # 2. Convert PDF to images
        images = await self.pdf_to_images(file)
        
        # 3. Extract text with OCR
        extracted_text = await self.extract_text_ocr(images)
        
        # 4. Use GPT-4 Vision for structured extraction
        structured_data = await self.extract_with_gpt4(images)
        
        # 5. Validate and reconcile
        validated_data = await self.validate_and_reconcile(
            extracted_text, 
            structured_data
        )
        
        # 6. Store temporarily
        await self.store_extracted_data(validated_data)
        
        return validated_data
```

**Frontend - Upload Component:**
```tsx
// /components/PDFUpload.tsx

export function PDFUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = async (e: React.DragEvent) => {
    const file = e.dataTransfer.files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
        }
      });
      
      // Redirect to results
      router.push(`/results/${response.data.document_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-12">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => uploadFile(e.target.files[0])}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      />
      {uploading && <ProgressBar value={progress} />}
      {error && <Alert variant="destructive">{error}</Alert>}
    </div>
  );
}
```

### Feature 2: Financial Analysis Engine

#### Ratio Calculations

**Liquidity Ratios:**
1. Current Ratio = Aktif Dönen Aktif / Kısa Vadeli Yükümlülükler
2. Quick Ratio = (Aktif Dönen Aktif - Stoklar) / Kısa Vadeli Yükümlülükler
3. Cash Ratio = Hazır Değerler / Kısa Vadeli Yükümlülükler
4. Working Capital = Dönen Aktif - Kısa Vadeli Pasif
5. Cash-to-Debt = Hazır Değerler / Toplam Borçlar

**Profitability Ratios:**
1. Gross Profit Margin = Brüt Kar / Satışlar
2. Net Profit Margin = Net Kar / Satışlar
3. ROA (Return on Assets) = Net Kar / Toplam Aktifler
4. ROE (Return on Equity) = Net Kar / Özkaynaklar
5. ROCE = EBIT / (Özkaynaklar + Uzun Vadeli Borçlar)
6. Dividend Payout Ratio = Temettü / Net Kar

**Efficiency Ratios:**
1. Asset Turnover = Satışlar / Toplam Aktifler
2. Inventory Turnover = Satışlar / Ortalama Stoklar
3. Receivables Turnover = Satışlar / Ortalama Alacaklar
4. DaysPayable = (Borç Hesapları / Satışlar) × 365

**Solvency Ratios:**
1. Debt-to-Equity = Toplam Borçlar / Özkaynaklar
2. Debt Ratio = Toplam Borçlar / Toplam Aktifler
3. Equity Ratio = Özkaynaklar / Toplam Aktifler
4. Interest Coverage = EBIT / Faiz Gideri
5. Debt Service Coverage = Faaliyet Nakit Akışı / Kısa Vadeli Borç Ödemesi
6. Long-term Debt Ratio = Uzun Vadeli Borçlar / Toplam Aktifler

#### Implementation
```python
# /services/analysis_service.py

class AnalysisService:
    def calculate_all_ratios(self, financial_data: dict) -> dict:
        ratios = {
            'liquidity': self.calculate_liquidity_ratios(financial_data),
            'profitability': self.calculate_profitability_ratios(financial_data),
            'efficiency': self.calculate_efficiency_ratios(financial_data),
            'solvency': self.calculate_solvency_ratios(financial_data),
            'growth': self.calculate_growth_ratios(financial_data),
            'per_share': self.calculate_per_share_ratios(financial_data)
        }
        
        # Cache results
        self.cache.set(f"ratios_{financial_data['company_id']}", ratios)
        
        return ratios
    
    def calculate_liquidity_ratios(self, data: dict) -> dict:
        current_ratio = data['current_assets'] / data['current_liabilities']
        quick_ratio = (data['current_assets'] - data['inventory']) / data['current_liabilities']
        cash_ratio = data['cash'] / data['current_liabilities']
        working_capital = data['current_assets'] - data['current_liabilities']
        
        return {
            'current_ratio': round(current_ratio, 2),
            'quick_ratio': round(quick_ratio, 2),
            'cash_ratio': round(cash_ratio, 2),
            'working_capital': round(working_capital, 2),
            'benchmark': {
                'current_ratio': 2.0,
                'quick_ratio': 1.0,
                'cash_ratio': 0.5
            }
        }
```

### Feature 3: Period Comparison Analysis

```python
# /services/comparison_service.py

class ComparisonService:
    def compare_periods(self, current: dict, previous: dict) -> dict:
        comparison = {
            'absolute_change': {},
            'percentage_change': {},
            'vertical_analysis_current': {},
            'vertical_analysis_previous': {},
            'trends': {},
            'alerts': []
        }
        
        # Absolute changes
        for account, value in current.items():
            prev_value = previous.get(account, 0)
            comparison['absolute_change'][account] = value - prev_value
            
            # Percentage change
            if prev_value != 0:
                pct = ((value - prev_value) / abs(prev_value)) * 100
                comparison['percentage_change'][account] = round(pct, 2)
            
            # Alerts for significant changes (>20%)
            if abs(comparison['percentage_change'].get(account, 0)) > 20:
                comparison['alerts'].append({
                    'account': account,
                    'change': comparison['percentage_change'][account],
                    'severity': 'warning' if abs(...) < 50 else 'alert'
                })
        
        # Vertical analysis
        total_current = sum(current.values())
        total_previous = sum(previous.values())
        
        for account, value in current.items():
            comparison['vertical_analysis_current'][account] = (value / total_current) * 100
            comparison['vertical_analysis_previous'][account] = (previous.get(account, 0) / total_previous) * 100
        
        return comparison
```

---

## 🗄️ DATABASE ŞEMASI

```sql
-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(20),
    role ENUM('admin', 'analyst', 'viewer') DEFAULT 'analyst',
    subscription_plan ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Companies/Organizations
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    company_name VARCHAR(255) NOT NULL,
    tax_id VARCHAR(50) UNIQUE NOT NULL,
    sector VARCHAR(100),
    employee_count INT,
    revenue_annual DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents (Uploaded PDFs)
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    company_id BIGINT REFERENCES companies(id),
    file_name VARCHAR(500) NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_size INT NOT NULL,
    file_hash VARCHAR(64) UNIQUE NOT NULL,
    document_type ENUM('corporate_tax', 'individual_tax', 'vat') DEFAULT 'corporate_tax',
    tax_year INT NOT NULL,
    status ENUM('uploaded', 'processing', 'completed', 'failed') DEFAULT 'uploaded',
    processing_start_at TIMESTAMP,
    processing_end_at TIMESTAMP,
    processing_duration_seconds INT,
    extraction_confidence_score DECIMAL(5, 2),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_company (user_id, company_id),
    INDEX idx_status (status),
    INDEX idx_tax_year (tax_year)
);

-- Extracted Financial Data
CREATE TABLE financial_statements (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    company_id BIGINT REFERENCES companies(id),
    statement_type ENUM('balance_sheet', 'income_statement', 'trial_balance') NOT NULL,
    period_start_date DATE,
    period_end_date DATE,
    currency VARCHAR(3) DEFAULT 'TRY',
    data_json JSONB NOT NULL, -- Stores structured data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_company_period (company_id, period_end_date)
);

-- Analysis Results
CREATE TABLE analysis_results (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    company_id BIGINT REFERENCES companies(id),
    analysis_type VARCHAR(100) NOT NULL, -- 'ratios', 'comparison', 'forecasting', etc.
    results_json JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_company_type (company_id, analysis_type)
);

-- Exports (Generated Reports)
CREATE TABLE exports (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL REFERENCES documents(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    export_format ENUM('excel', 'pdf', 'csv') NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_size INT,
    export_type VARCHAR(100), -- 'full_report', 'ratios_only', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL, -- 'upload', 'download', 'analyze', etc.
    resource_type VARCHAR(100),
    resource_id BIGINT,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_action (user_id, action, created_at)
);

-- API Keys (for programmatic access)
CREATE TABLE api_keys (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    key_hash VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create Indexes for Performance
CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_created ON documents(created_at DESC);
CREATE INDEX idx_financial_statements_company ON financial_statements(company_id);
CREATE INDEX idx_analysis_results_document ON analysis_results(document_id);
```

---

## 🔌 API ENDPOINTS

### Authentication
```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - Login user
POST   /api/auth/refresh            - Refresh JWT token
POST   /api/auth/logout             - Logout user
POST   /api/auth/forgot-password    - Request password reset
```

### Documents
```
POST   /api/documents/upload        - Upload PDF document
GET    /api/documents               - List user's documents
GET    /api/documents/{id}          - Get document details
DELETE /api/documents/{id}          - Delete document
GET    /api/documents/{id}/status   - Check processing status
```

### Analysis
```
POST   /api/analysis/{document_id}           - Run analysis
GET    /api/analysis/{document_id}           - Get analysis results
GET    /api/analysis/{document_id}/ratios    - Get ratio analysis
GET    /api/analysis/{document_id}/comparison - Get period comparison
GET    /api/analysis/{document_id}/forecast  - Get forecast analysis
```

### Financial Statements
```
GET    /api/financial/{document_id}/balance-sheet     - Get Balance Sheet
GET    /api/financial/{document_id}/income-statement  - Get Income Statement
GET    /api/financial/{document_id}/trial-balance     - Get Trial Balance
```

### Exports
```
POST   /api/exports/{document_id}/excel      - Generate Excel export
POST   /api/exports/{document_id}/pdf        - Generate PDF report
POST   /api/exports/{document_id}/email      - Email report to user
GET    /api/exports/{id}/download            - Download export file
```

### Companies
```
POST   /api/companies                - Create company
GET    /api/companies                - List companies
GET    /api/companies/{id}           - Get company details
PUT    /api/companies/{id}           - Update company
DELETE /api/companies/{id}           - Delete company
```

### Dashboard
```
GET    /api/dashboard/summary        - Dashboard summary stats
GET    /api/dashboard/recent         - Recent documents
GET    /api/dashboard/statistics     - Usage statistics
```

---

## 🎨 FRONTEND BİLEŞENLERİ

### Page Structure
```
/
├── /auth
│   ├── /login
│   ├── /register
│   └── /forgot-password
├── /dashboard
│   ├── /index (main dashboard)
│   ├── /documents
│   ├── /analytics
│   └── /settings
├── /upload
│   ├── /index (upload page)
│   └── /processing (processing status)
├── /results
│   ├── /[id] (analysis results)
│   ├── /[id]/comparison
│   ├── /[id]/export
│   └── /[id]/details
└── /admin (admin panel - future)
```

### Key Components

**1. PDF Upload Component**
```tsx
// /components/PDFUpload.tsx
- Drag & drop support
- File validation
- Progress indication
- Error handling
```

**2. Financial Tables**
```tsx
// /components/FinancialTables.tsx
- Trial Balance table
- Balance Sheet (Aktif/Pasif)
- Income Statement
- Sortable columns
- Export to CSV
```

**3. Ratio Cards**
```tsx
// /components/RatioCards.tsx
- Display individual ratios
- Compare with benchmarks
- Color coding (red/yellow/green)
- Trend indicators
```

**4. Charts/Visualizations**
```tsx
// /components/Charts/
- PieChart3D.tsx (Aktif, Pasif, Gelir)
- BarChart.tsx (Period comparison)
- LineChart.tsx (Trends)
- RevenueChart.tsx
```

**5. Dashboard**
```tsx
// /app/dashboard/page.tsx
- KPI cards
- Recent documents
- Quick upload
- Summary statistics
```

**6. Results View**
```tsx
// /app/results/[id]/page.tsx
- Tabbed interface
  - Summary tab
  - Financial Statements tab
  - Ratios tab
  - Comparison tab
  - Charts tab
- Export buttons
- Print functionality
```

---

## 🤖 AI/ML PIPELINE

### OCR Pipeline
```
PDF Input
    ↓
Convert PDF to Images
    ↓
Image Preprocessing (contrast, deskew)
    ↓
Tesseract OCR
    ↓
Text Cleaning & Normalization
    ↓
Turkish Language Correction
    ↓
Output: Extracted Text
```

### Data Extraction Pipeline
```
PDF Images
    ↓
GPT-4 Vision API
(Prompt: "Extract table data from Turkish tax form...")
    ↓
Structured JSON Output
    ↓
Validation Against Schema
    ↓
Fallback to OCR if needed
    ↓
Output: Structured Data
```

### Validation Pipeline
```
Extracted Data
    ↓
Schema Validation
(Required fields, data types)
    ↓
Business Rule Validation
(Assets = Liabilities + Equity)
    ↓
Consistency Checks
(Account codes exist, ranges valid)
    ↓
Confidence Scoring
    ↓
Output: Validated + Scored Data
```

### Prompts for GPT-4 Vision

**Main Extraction Prompt:**
```
Türkçe vergi formundan aşağıdaki tabloları çıkar ve JSON formatında ver:

1. Mizan (Trial Balance):
   - Hesap Kodu
   - Hesap Adı
   - Debit
   - Credit

2. Bilanço (Balance Sheet):
   - Dönen Aktif
   - Sabit Aktif
   - Kısa Vadeli Yükümlülükler
   - Uzun Vadeli Yükümlülükler
   - Özkaynaklar

3. Gelir Tablosu:
   - Satışlar
   - Satışların Maliyeti
   - Faaliyet Giderleri
   - Finansman Giderleri
   - Vergi
   - Net Kar

Format:
{
  "trial_balance": [...],
  "balance_sheet": {...},
  "income_statement": {...},
  "extraction_quality": 0.95,
  "warnings": []
}
```

---

## ✅ TESTING STRATEGY

### Unit Testing
- Framework: pytest (Backend), Jest (Frontend)
- Target Coverage: >90%
- Test structure:
  ```
  tests/
  ├── unit/
  │   ├── services/
  │   │   ├── test_pdf_service.py
  │   │   ├── test_analysis_service.py
  │   │   └── test_comparison_service.py
  │   ├── utils/
  │   │   ├── test_validators.py
  │   │   └── test_formatters.py
  │   └── components/
  │       ├── PDFUpload.test.tsx
  │       ├── RatioCards.test.tsx
  │       └── Charts.test.tsx
  ```

### Integration Testing
- Test API endpoints end-to-end
- Database integration
- External service mocking (GPT-4, Tesseract)

### E2E Testing
- Framework: Cypress
- Scenarios:
  ```
  1. User registration & login
  2. PDF upload flow
  3. Analysis generation
  4. Export generation
  5. Report viewing
  ```

### Performance Testing
- Load testing: k6 (1000 concurrent users)
- Targets:
  - PDF upload: <15s
  - Full analysis: <30s
  - Dashboard load: <2s
  - Export generation: <30s

### Security Testing
- OWASP Top 10 compliance
- SQL injection tests
- XSS prevention tests
- CSRF protection tests
- Rate limiting tests

---

## 🚀 DEVOPS & DEPLOYMENT

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/smart-lodge-budget.git
cd smart-lodge-budget

# Setup with Docker Compose
docker-compose -f docker-compose.dev.yml up

# Access
Frontend: http://localhost:3000
Backend: http://localhost:8000
Database: localhost:5432
```

### Docker Compose Configuration
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/smart_lodge
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=smart_lodge
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Production Deployment

**Frontend - Vercel**
```
1. Push to GitHub
2. Vercel auto-deploys on main branch
3. Custom domain: smartlodgebudget.com
4. Auto SSL, CDN, edge functions
5. Environment: production
```

**Backend - Cloud Run / EC2**
```
1. Docker image built in CI/CD
2. Push to Container Registry
3. Deploy to Cloud Run or EC2
4. Auto scaling based on load
5. Health checks enabled
6. Monitoring & alerting
```

**Database - Managed PostgreSQL**
```
- AWS RDS or Google Cloud SQL
- Automated backups (daily)
- Read replicas for scaling
- Point-in-time recovery
```

### CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm run test:ci
      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build frontend
        run: cd frontend && npm run build
      - name: Build backend
        run: cd backend && docker build -t gcr.io/project/backend:latest .
      - name: Push to Registry
        run: docker push gcr.io/project/backend:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy frontend to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
      - name: Deploy backend to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v0
        with:
          service: smart-lodge-backend
          image: gcr.io/project/backend:latest
```

### Monitoring & Observability
```
- Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
- APM: New Relic / DataDog
- Error Tracking: Sentry
- Uptime Monitoring: StatusPage
- Metrics: Prometheus + Grafana
```

### Backup & Disaster Recovery
```
- Database backups: Daily automated, 30-day retention
- RTO (Recovery Time Objective): 1 hour
- RPO (Recovery Point Objective): 1 hour
- Test recovery monthly
- Backup stored in multiple regions
```

---

## 📊 SUCCESS METRICS

### Technical Metrics
- PDF Processing Speed: <15 seconds (target)
- Full Analysis: <30 seconds (target)
- OCR Accuracy: >95%
- System Uptime: 99.9%
- API Response Time: <500ms (p95)
- Page Load Time: <2 seconds

### Business Metrics
- User Registration: 100+ in first month
- Active Users: 50+ daily
- Documents Processed: 500+
- Customer Satisfaction: >4.5/5
- Feature Adoption: >70%
- Churn Rate: <5%

### Quality Metrics
- Test Coverage: >90%
- Bug Detection: <0.1 per 1000 transactions
- Security Incidents: 0
- Data Accuracy: >99%

---

## 📝 NOTLAR & NEXT STEPS

### v1.0 Scope (MVP)
- Kurumlar Vergisi Beyannamesi
- Temel finansal tablo analizi
- 21 standart rasyo
- Dönem karşılaştırması
- Excel export
- Dashboard

### v2.0 Roadmap (Future)
- Bireysel Gelir Vergisi desteği
- KDV Beyannameleri
- Multi-language support (EN, DE)
- API access for partners
- Custom reports builder
- Forecasting & budgeting
- Bank reconciliation
- Banka entegrasyonu
- Mobile app
- Advanced analytics

### Estimated Budget
- Development: 3-4 ay, 2-3 developer
- Infrastructure: $2000/month (production)
- AI/ML API costs: $500-1000/month (OpenAI)
- Total first year: ~$70-80k

---

**Hazırlanma Tarihi:** Ekim 2025  
**Sürüm:** 1.0 - Draft  
**Status:** Kullanıma Hazır ✅
