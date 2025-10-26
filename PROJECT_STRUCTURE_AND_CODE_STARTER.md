# 🏗️ SMART LODGE BUDGET - Project Structure & Starter Code

## 📁 Monorepo Yapısı

```
smart-lodge-budget/
├── frontend/                    # Next.js React App
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── documents/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── upload/
│   │   │   ├── page.tsx
│   │   │   └── processing/
│   │   └── results/
│   │       ├── [id]/
│   │       └── [id]/export/
│   ├── components/
│   │   ├── PDFUpload.tsx
│   │   ├── FinancialTables.tsx
│   │   ├── RatioCards.tsx
│   │   ├── Charts/
│   │   ├── Navigation.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useUpload.ts
│   │   └── useAnalysis.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── documents.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── financial.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── styles/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── backend/                     # FastAPI Python App
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── middleware.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── documents.py
│   │   │   ├── analysis.py
│   │   │   ├── financial.py
│   │   │   ├── exports.py
│   │   │   └── dashboard.py
│   │   ├── services/
│   │   │   ├── pdf_service.py
│   │   │   ├── analysis_service.py
│   │   │   ├── comparison_service.py
│   │   │   ├── export_service.py
│   │   │   └── ai_service.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── document.py
│   │   │   ├── financial.py
│   │   │   └── analysis.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── document.py
│   │   │   └── analysis.py
│   │   ├── utils/
│   │   │   ├── validators.py
│   │   │   ├── security.py
│   │   │   └── helpers.py
│   │   └── database.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── pyproject.toml
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── deploy.yml
│       └── lint.yml
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── USER_GUIDE.md
├── .gitignore
├── README.md
└── LICENSE
```

---

## 💻 BACKEND - FastAPI Starter Code

### 1. Main Application (main.py)

```python
# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
import logging
from app.config import settings
from app.routers import auth, documents, analysis, financial, exports, dashboard
from app.database import Base, engine
from app.middleware import ErrorHandlingMiddleware

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
    yield
    # Shutdown
    logger.info("Application shutdown")

# Initialize FastAPI app
app = FastAPI(
    title="Smart Lodge Budget API",
    description="AI-powered financial analysis platform for tax advisors",
    version="1.0.0",
    lifespan=lifespan
)

# Middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)
app.add_middleware(ErrorHandlingMiddleware)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["analysis"])
app.include_router(financial.router, prefix="/api/financial", tags=["financial"])
app.include_router(exports.router, prefix="/api/exports", tags=["exports"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```

### 2. Configuration (config.py)

```python
# backend/app/config.py

from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Smart Lodge Budget"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/smart_lodge"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://smartlodgebudget.com",
    ]
    
    ALLOWED_HOSTS: List[str] = [
        "localhost",
        "127.0.0.1",
        "smartlodgebudget.com",
    ]
    
    # File Upload
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB
    UPLOAD_DIR: str = "uploads"
    ALLOWED_EXTENSIONS: List[str] = ["pdf"]
    
    # External APIs
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4-vision-preview"
    
    # Tesseract
    TESSERACT_PATH: str = "/usr/bin/tesseract"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
```

### 3. Database Models (models/financial.py)

```python
# backend/app/models/financial.py

from sqlalchemy import Column, Integer, String, Float, Date, JSON, ForeignKey, Enum, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
import enum
from app.database import Base

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    company_id = Column(Integer, ForeignKey("companies.id"))
    file_name = Column(String(500), nullable=False)
    file_path = Column(String(1000), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_hash = Column(String(64), unique=True, nullable=False)
    document_type = Column(String(50), default="corporate_tax")
    tax_year = Column(Integer, nullable=False)
    status = Column(String(50), default="uploaded")  # uploaded, processing, completed, failed
    extraction_confidence_score = Column(DECIMAL(5, 2))
    error_message = Column(String(1000))
    created_at = Column(Date)
    updated_at = Column(Date)
    
    # Relationships
    financial_statements = relationship("FinancialStatement", back_populates="document")
    analysis_results = relationship("AnalysisResult", back_populates="document")

class FinancialStatement(Base):
    __tablename__ = "financial_statements"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    company_id = Column(Integer, ForeignKey("companies.id"))
    statement_type = Column(String(50), nullable=False)  # balance_sheet, income_statement, trial_balance
    period_start_date = Column(Date)
    period_end_date = Column(Date)
    currency = Column(String(3), default="TRY")
    data_json = Column(JSONB, nullable=False)
    created_at = Column(Date)
    updated_at = Column(Date)
    
    # Relationships
    document = relationship("Document", back_populates="financial_statements")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    company_id = Column(Integer, ForeignKey("companies.id"))
    analysis_type = Column(String(100), nullable=False)  # ratios, comparison, etc.
    results_json = Column(JSONB, nullable=False)
    generated_at = Column(Date)
    
    # Relationships
    document = relationship("Document", back_populates="analysis_results")
```

### 4. Schemas (schemas/analysis.py)

```python
# backend/app/schemas/analysis.py

from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from datetime import date

class RatioData(BaseModel):
    current_ratio: float
    quick_ratio: float
    cash_ratio: float
    debt_to_equity: float
    roe: float  # Return on Equity
    roa: float  # Return on Assets
    
class AnalysisResult(BaseModel):
    document_id: int
    analysis_type: str
    ratios: Optional[RatioData]
    comparison: Optional[Dict[str, Any]]
    generated_at: date
    
    class Config:
        from_attributes = True

class FinancialStatementRequest(BaseModel):
    trial_balance: List[Dict[str, Any]]
    balance_sheet: Dict[str, Any]
    income_statement: Dict[str, Any]
```

### 5. Services (services/pdf_service.py)

```python
# backend/app/services/pdf_service.py

import asyncio
import logging
from typing import Tuple, Dict, Any
from pathlib import Path
import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io
from openai import AsyncOpenAI
from app.config import settings
from app.utils.validators import validate_extracted_data

logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self.openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.tesseract_path = settings.TESSERACT_PATH
    
    async def process_pdf(self, file_path: str) -> Dict[str, Any]:
        """
        Process PDF and extract financial data
        """
        try:
            logger.info(f"Starting PDF processing: {file_path}")
            
            # Convert PDF to images
            images = await self._pdf_to_images(file_path)
            logger.info(f"Converted PDF to {len(images)} images")
            
            # Extract text using OCR
            ocr_text = await self._extract_text_ocr(images)
            logger.info("OCR extraction completed")
            
            # Extract structured data using GPT-4 Vision
            structured_data = await self._extract_with_gpt4(images)
            logger.info("GPT-4 Vision extraction completed")
            
            # Validate and reconcile
            validated_data = await self._validate_and_reconcile(
                ocr_text, 
                structured_data
            )
            
            return {
                "status": "success",
                "data": validated_data,
                "confidence_score": validated_data.get("confidence_score", 0)
            }
        
        except Exception as e:
            logger.error(f"PDF processing error: {str(e)}")
            return {
                "status": "error",
                "message": str(e),
                "confidence_score": 0
            }
    
    async def _pdf_to_images(self, file_path: str) -> list:
        """Convert PDF pages to images"""
        doc = fitz.open(file_path)
        images = []
        
        for page_num in range(len(doc)):
            page = doc[page_num]
            # Render at higher DPI for better OCR
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            images.append(image)
        
        doc.close()
        return images
    
    async def _extract_text_ocr(self, images: list) -> str:
        """Extract text using Tesseract OCR"""
        extracted_text = ""
        
        for image in images:
            text = pytesseract.image_to_string(image, lang="tur+eng")
            extracted_text += text + "\n"
        
        return extracted_text
    
    async def _extract_with_gpt4(self, images: list) -> Dict[str, Any]:
        """Use GPT-4 Vision to extract structured data"""
        
        prompt = """
        Lütfen bu Türk vergi formundan aşağıdaki bilgileri çıkar ve JSON formatında döndür:
        
        1. Mizan (Trial Balance):
           - Hesap Kodu
           - Hesap Adı
           - Debit
           - Credit
        
        2. Bilanço (Balance Sheet):
           - Dönen Aktif (Current Assets)
           - Sabit Aktif (Fixed Assets)
           - Kısa Vadeli Yükümlülükler (Current Liabilities)
           - Uzun Vadeli Yükümlülükler (Long-term Liabilities)
           - Özkaynaklar (Equity)
        
        3. Gelir Tablosu (Income Statement):
           - Satışlar (Sales)
           - Satışların Maliyeti (Cost of Sales)
           - Brüt Kar (Gross Profit)
           - Faaliyet Giderleri (Operating Expenses)
           - Finansman Giderleri (Financial Expenses)
           - Vergi (Tax)
           - Net Kar (Net Income)
        
        Response format:
        {
            "trial_balance": [...],
            "balance_sheet": {...},
            "income_statement": {...},
            "extraction_quality": 0.95,
            "warnings": []
        }
        """
        
        # Convert images to base64
        base64_images = []
        for image in images[:3]:  # Limit to first 3 pages
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            import base64
            base64_images.append(base64.b64encode(buffered.getvalue()).decode())
        
        # Call GPT-4 Vision API
        message = await self.openai_client.messages.create(
            model=settings.OPENAI_MODEL,
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        *[
                            {
                                "type": "image",
                                "source": {
                                    "type": "base64",
                                    "media_type": "image/png",
                                    "data": img
                                }
                            }
                            for img in base64_images
                        ]
                    ]
                }
            ]
        )
        
        # Parse response
        import json
        try:
            response_text = message.content[0].text
            # Find JSON in response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            json_str = response_text[json_start:json_end]
            return json.loads(json_str)
        except:
            return {"error": "Failed to parse GPT response"}
    
    async def _validate_and_reconcile(
        self, 
        ocr_text: str, 
        gpt_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Validate extracted data against business rules"""
        
        # Run validation
        is_valid, errors = validate_extracted_data(gpt_data)
        
        confidence_score = gpt_data.get("extraction_quality", 0)
        
        return {
            **gpt_data,
            "is_valid": is_valid,
            "validation_errors": errors,
            "confidence_score": confidence_score
        }
```

### 6. Analysis Service (services/analysis_service.py)

```python
# backend/app/services/analysis_service.py

from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class AnalysisService:
    
    @staticmethod
    def calculate_all_ratios(financial_data: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate all financial ratios"""
        
        ratios = {
            'liquidity': AnalysisService.calculate_liquidity_ratios(financial_data),
            'profitability': AnalysisService.calculate_profitability_ratios(financial_data),
            'efficiency': AnalysisService.calculate_efficiency_ratios(financial_data),
            'solvency': AnalysisService.calculate_solvency_ratios(financial_data),
            'growth': AnalysisService.calculate_growth_ratios(financial_data),
        }
        
        return ratios
    
    @staticmethod
    def calculate_liquidity_ratios(data: Dict[str, Any]) -> Dict[str, float]:
        """Likidite Oranları"""
        
        current_assets = data.get('current_assets', 0)
        current_liabilities = data.get('current_liabilities', 0)
        inventory = data.get('inventory', 0)
        cash = data.get('cash', 0)
        
        current_ratio = current_assets / current_liabilities if current_liabilities > 0 else 0
        quick_ratio = (current_assets - inventory) / current_liabilities if current_liabilities > 0 else 0
        cash_ratio = cash / current_liabilities if current_liabilities > 0 else 0
        working_capital = current_assets - current_liabilities
        
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
    
    @staticmethod
    def calculate_profitability_ratios(data: Dict[str, Any]) -> Dict[str, float]:
        """Kârlılık Oranları"""
        
        sales = data.get('sales', 0)
        net_income = data.get('net_income', 0)
        total_assets = data.get('total_assets', 0)
        equity = data.get('equity', 0)
        gross_profit = data.get('gross_profit', 0)
        
        gross_profit_margin = (gross_profit / sales * 100) if sales > 0 else 0
        net_profit_margin = (net_income / sales * 100) if sales > 0 else 0
        roa = (net_income / total_assets * 100) if total_assets > 0 else 0
        roe = (net_income / equity * 100) if equity > 0 else 0
        
        return {
            'gross_profit_margin': round(gross_profit_margin, 2),
            'net_profit_margin': round(net_profit_margin, 2),
            'roa': round(roa, 2),
            'roe': round(roe, 2),
        }
    
    @staticmethod
    def calculate_efficiency_ratios(data: Dict[str, Any]) -> Dict[str, float]:
        """Verimlilik Oranları"""
        
        sales = data.get('sales', 0)
        total_assets = data.get('total_assets', 0)
        inventory = data.get('inventory', 0)
        receivables = data.get('receivables', 0)
        
        asset_turnover = sales / total_assets if total_assets > 0 else 0
        inventory_turnover = sales / inventory if inventory > 0 else 0
        receivables_turnover = sales / receivables if receivables > 0 else 0
        
        return {
            'asset_turnover': round(asset_turnover, 2),
            'inventory_turnover': round(inventory_turnover, 2),
            'receivables_turnover': round(receivables_turnover, 2),
        }
    
    @staticmethod
    def calculate_solvency_ratios(data: Dict[str, Any]) -> Dict[str, float]:
        """Ödeme Gücü Oranları"""
        
        total_debt = data.get('total_debt', 0)
        equity = data.get('equity', 0)
        total_assets = data.get('total_assets', 0)
        long_term_debt = data.get('long_term_debt', 0)
        
        debt_to_equity = total_debt / equity if equity > 0 else 0
        debt_ratio = total_debt / total_assets if total_assets > 0 else 0
        equity_ratio = equity / total_assets if total_assets > 0 else 0
        long_term_debt_ratio = long_term_debt / total_assets if total_assets > 0 else 0
        
        return {
            'debt_to_equity': round(debt_to_equity, 2),
            'debt_ratio': round(debt_ratio, 2),
            'equity_ratio': round(equity_ratio, 2),
            'long_term_debt_ratio': round(long_term_debt_ratio, 2),
        }
    
    @staticmethod
    def calculate_growth_ratios(data: Dict[str, Any]) -> Dict[str, float]:
        """Büyüme Oranları"""
        
        current_sales = data.get('current_sales', 0)
        previous_sales = data.get('previous_sales', 0)
        current_income = data.get('current_income', 0)
        previous_income = data.get('previous_income', 0)
        
        sales_growth = ((current_sales - previous_sales) / previous_sales * 100) if previous_sales > 0 else 0
        income_growth = ((current_income - previous_income) / previous_income * 100) if previous_income > 0 else 0
        
        return {
            'sales_growth': round(sales_growth, 2),
            'income_growth': round(income_growth, 2),
        }
```

### 7. API Router (routers/documents.py)

```python
# backend/app/routers/documents.py

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
import asyncio
import logging
from app.database import get_db
from app.services.pdf_service import PDFService
from app.services.analysis_service import AnalysisService
from app.models.financial import Document, FinancialStatement, AnalysisResult
from app.dependencies import get_current_user

router = APIRouter()
logger = logging.getLogger(__name__)

pdf_service = PDFService()
analysis_service = AnalysisService()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = BackgroundTasks(),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Upload and process PDF document"""
    
    try:
        # Validate file
        if not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files allowed")
        
        if file.size > 50 * 1024 * 1024:  # 50MB
            raise HTTPException(status_code=400, detail="File too large")
        
        # Save file temporarily
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            contents = await file.read()
            f.write(contents)
        
        # Create document record
        db_document = Document(
            user_id=current_user.id,
            file_name=file.filename,
            file_path=file_path,
            file_size=len(contents),
            status="processing"
        )
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
        
        # Process PDF in background
        background_tasks.add_task(
            process_document_task,
            db_document.id,
            file_path,
            db
        )
        
        return {
            "document_id": db_document.id,
            "status": "processing",
            "message": "Document uploaded successfully"
        }
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

async def process_document_task(document_id: int, file_path: str, db: Session):
    """Background task to process document"""
    
    try:
        # Process PDF
        result = await pdf_service.process_pdf(file_path)
        
        if result['status'] == 'error':
            # Update document status
            doc = db.query(Document).filter(Document.id == document_id).first()
            doc.status = "failed"
            doc.error_message = result['message']
            db.commit()
            return
        
        # Extract financial data
        financial_data = result['data']
        
        # Calculate ratios
        ratios = analysis_service.calculate_all_ratios(financial_data)
        
        # Save financial statements
        fs = FinancialStatement(
            document_id=document_id,
            statement_type="balance_sheet",
            data_json=financial_data.get('balance_sheet', {})
        )
        db.add(fs)
        
        # Save analysis results
        analysis = AnalysisResult(
            document_id=document_id,
            analysis_type="ratios",
            results_json=ratios
        )
        db.add(analysis)
        
        # Update document status
        doc = db.query(Document).filter(Document.id == document_id).first()
        doc.status = "completed"
        doc.extraction_confidence_score = result['confidence_score']
        
        db.commit()
        logger.info(f"Document {document_id} processed successfully")
    
    except Exception as e:
        logger.error(f"Document processing error: {str(e)}")
        doc = db.query(Document).filter(Document.id == document_id).first()
        doc.status = "failed"
        doc.error_message = str(e)
        db.commit()

@router.get("/list")
async def list_documents(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
    skip: int = 0,
    limit: int = 10
):
    """List user's documents"""
    
    documents = db.query(Document).filter(
        Document.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return documents

@router.get("/{document_id}")
async def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get document details"""
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    return document
```

---

## 🎨 FRONTEND - Next.js Starter Code

### 1. Environment Configuration

```bash
# frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME="Smart Lodge Budget"
```

### 2. API Service (services/api.ts)

```typescript
// frontend/services/api.ts

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth
  async register(email: string, password: string, fullName: string) {
    return this.client.post('/api/auth/register', {
      email,
      password,
      full_name: fullName,
    });
  }

  async login(email: string, password: string) {
    return this.client.post('/api/auth/login', {
      email,
      password,
    });
  }

  // Documents
  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.client.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getDocuments(skip = 0, limit = 10) {
    return this.client.get('/api/documents/list', {
      params: { skip, limit },
    });
  }

  async getDocument(id: number) {
    return this.client.get(`/api/documents/${id}`);
  }

  // Analysis
  async getAnalysis(documentId: number) {
    return this.client.get(`/api/analysis/${documentId}`);
  }

  // Financial Statements
  async getBalanceSheet(documentId: number) {
    return this.client.get(`/api/financial/${documentId}/balance-sheet`);
  }

  async getIncomeStatement(documentId: number) {
    return this.client.get(`/api/financial/${documentId}/income-statement`);
  }

  // Exports
  async exportToExcel(documentId: number) {
    return this.client.post(`/api/exports/${documentId}/excel`, {
      responseType: 'blob',
    });
  }

  async exportToPdf(documentId: number) {
    return this.client.post(`/api/exports/${documentId}/pdf`, {
      responseType: 'blob',
    });
  }
}

export const apiService = new ApiService();
```

### 3. Upload Component (components/PDFUpload.tsx)

```typescript
// frontend/components/PDFUpload.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, AlertCircle } from 'lucide-react';
import { apiService } from '@/services/api';

export function PDFUpload() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      // Validate
      if (!file.name.endsWith('.pdf')) {
        throw new Error('Only PDF files are allowed');
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error('File size must be less than 50MB');
      }

      // Upload
      const response = await apiService.uploadDocument(file);

      // Redirect to processing page
      router.push(`/upload/processing?documentId=${response.data.document_id}`);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
          disabled={uploading}
          className="hidden"
          id="pdf-input"
        />

        <label htmlFor="pdf-input" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold mb-2">
            {uploading ? 'Uploading...' : 'Drop PDF or click to upload'}
          </p>
          <p className="text-sm text-gray-500">
            Kurumlar Vergisi Beyannamesi PDF'ini yükleyin
          </p>
        </label>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
```

### 4. Results Dashboard (app/results/[id]/page.tsx)

```typescript
// frontend/app/results/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { apiService } from '@/services/api';
import FinancialTables from '@/components/FinancialTables';
import RatioCards from '@/components/RatioCards';
import Charts from '@/components/Charts';

export default function ResultsPage() {
  const params = useParams();
  const documentId = parseInt(params.id as string);

  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalysis();
  }, [documentId]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAnalysis(documentId);
      setAnalysis(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Finansal Analiz Sonuçları</h1>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Özet</TabsTrigger>
          <TabsTrigger value="tables">Tablolar</TabsTrigger>
          <TabsTrigger value="ratios">Oranlar</TabsTrigger>
          <TabsTrigger value="charts">Grafikler</TabsTrigger>
          <TabsTrigger value="export">İndir</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-4 gap-4">
            {/* KPI Cards */}
          </div>
        </TabsContent>

        <TabsContent value="tables">
          <FinancialTables data={analysis} />
        </TabsContent>

        <TabsContent value="ratios">
          <RatioCards ratios={analysis.ratios} />
        </TabsContent>

        <TabsContent value="charts">
          <Charts data={analysis} />
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <button
            onClick={() => apiService.exportToExcel(documentId)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Excel'e İndir
          </button>
          <button
            onClick={() => apiService.exportToPdf(documentId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            PDF'ye İndir
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 📦 Dependencies

### Backend Requirements

```txt
# backend/requirements.txt

fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pydantic==2.5.0
pydantic-settings==2.1.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
pyjwt==2.8.1
python-dotenv==1.0.0
openai==1.3.5
pytesseract==0.3.10
pillow==10.1.0
pdf2image==1.17.0
PyMuPDF==1.23.8
requests==2.31.0
redis==5.0.1
httpx==0.25.1
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.12.0
flake8==6.1.0
```

### Frontend Dependencies

```json
{
  "dependencies": {
    "next": "14.0.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "5.3.3",
    "tailwindcss": "3.3.6",
    "axios": "1.6.2",
    "recharts": "2.10.3",
    "lucide-react": "0.263.1",
    "next-themes": "0.2.1",
    "react-hook-form": "7.48.0",
    "zod": "3.22.4"
  },
  "devDependencies": {
    "@types/node": "20.10.4",
    "@types/react": "18.2.45",
    "eslint": "8.55.0",
    "eslint-config-next": "14.0.3",
    "jest": "29.7.0",
    "@testing-library/react": "14.1.2"
  }
}
```

---

## 🚀 Getting Started

### Setup Development Environment

```bash
# Clone repo
git clone <repo-url>
cd smart-lodge-budget

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/smart_lodge
OPENAI_API_KEY=your-key-here
SECRET_KEY=your-secret-key
EOF

# Run migrations
alembic upgrade head

# Start backend
uvicorn app.main:app --reload

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev

# Open http://localhost:3000
```

### Run with Docker Compose

```bash
docker-compose -f docker-compose.dev.yml up
```

---

**Version:** 1.0  
**Last Updated:** Ekim 2025
