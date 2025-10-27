# 🚀 DEPLOYMENT GUIDE - Vercel + Railway + Gemini

**Tamamen Online Deployment (Ücretsiz/Düşük Maliyet)**

Bu guide ile projenizi tamamen online platformlarda çalıştıracaksınız.

---

## 📋 GEREKL İ HESAPLAR

Aşağıdaki servislere üye olmanız gerekiyor (hepsi ücretsiz tier sunuyor):

### 1. Google Gemini API
- **URL**: https://ai.google.dev/
- **Ücretsiz Tier**: 60 request/dakika
- **Kullanım**: PDF processing ve AI analiz

### 2. Supabase (PostgreSQL Database)
- **URL**: https://supabase.com/
- **Ücretsiz Tier**: 500MB database, 2GB transfer
- **Kullanım**: Ana veritabanı

### 3. Upstash (Redis Cache)
- **URL**: https://upstash.com/
- **Ücretsiz Tier**: 10,000 commands/day
- **Kullanım**: Cache ve rate limiting

### 4. Railway (Backend Hosting)
- **URL**: https://railway.app/
- **Ücretsiz Tier**: $5 credit (yeterli)
- **Kullanım**: FastAPI backend hosting

### 5. Vercel (Frontend Hosting)
- **URL**: https://vercel.com/
- **Ücretsiz Tier**: Unlimited deployments
- **Kullanım**: Next.js frontend hosting

---

## 🎯 DEPLOYMENT SIRASI

### ADIM 1: Google Gemini API Key Alın

1. https://ai.google.dev/ adresine gidin
2. "Get API Key" butonuna tıklayın
3. Google hesabınızla giriş yapın
4. "Create API Key" tıklayın
5. API Key'i kopyalayın ve bir yere kaydedin

**Örnek API Key formatı:**
```
AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### ADIM 2: Supabase PostgreSQL Setup

1. https://supabase.com/ hesap açın
2. "New Project" oluşturun
   - Name: `smart-lodge-budget`
   - Database Password: (güçlü bir şifre belirleyin)
   - Region: `Southeast Asia` (Singapur - en yakın)

3. Project Settings > Database > Connection string
4. "URI" connection string'i kopyalayın:

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

5. AsyncPG için değiştirin (sadece `postgresql` başlangıcını `postgresql+asyncpg` yapın):

```
postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

---

### ADIM 3: Upstash Redis Setup

1. https://upstash.com/ hesap açın
2. "Create Database" tıklayın
   - Name: `smart-lodge-redis`
   - Type: Regional
   - Region: `ap-southeast-1` (Singapore)

3. Database > Details > REST API
4. "Redis Connection URL" kopyalayın:

```
redis://:AXbrAAIxxxxxxxxxxxx@apn1-xxxxx.upstash.io:6379
```

---

### ADIM 4: Railway Backend Deploy

1. https://railway.app/ hesap açın (GitHub ile)
2. "New Project" > "Deploy from GitHub repo"
3. Repository seçin: `muhasebemag`
4. "Add variables" tıklayın
5. Aşağıdaki environment variables'ı ekleyin:

```bash
APP_NAME=Smart Lodge Budget
APP_VERSION=1.0.0
DEBUG=False
ENVIRONMENT=production

HOST=0.0.0.0
PORT=8000

# Supabase Database URL (Adım 2'den)
DATABASE_URL=postgresql+asyncpg://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
DATABASE_POOL_SIZE=5
DATABASE_MAX_OVERFLOW=10

# Upstash Redis URL (Adım 3'ten)
REDIS_URL=redis://:AXbrAAIxxx@apn1-xxxxx.upstash.io:6379
REDIS_CACHE_TTL=3600

# Security (güçlü bir random string oluşturun)
SECRET_KEY=your-super-secret-random-string-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Gemini API (Adım 1'den)
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_MODEL=gemini-1.5-pro
GEMINI_MAX_TOKENS=8192

# File Upload
MAX_UPLOAD_SIZE=52428800
ALLOWED_EXTENSIONS=.pdf
UPLOAD_DIR=/tmp/uploads

# CORS (Vercel domain'inizi ekleyin sonra)
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
ALLOWED_HEADERS=*

# Rate Limiting
RATE_LIMIT_REQUESTS=1000
RATE_LIMIT_PERIOD=3600
```

6. "Settings" > "Networking" > "Generate Domain"
7. Domain'i kopyalayın (örn: `your-backend.up.railway.app`)

---

### ADIM 5: Vercel Frontend Deploy

1. https://vercel.com/ hesap açın (GitHub ile)
2. "New Project" > Repository seçin: `muhasebemag`
3. "Root Directory" değiştirin: `frontend`
4. "Environment Variables" ekleyin:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

5. "Deploy" tıklayın
6. Deploy tamamlanınca domain'inizi kopyalayın (örn: `your-app.vercel.app`)

---

### ADIM 6: Railway CORS Güncelleme

1. Railway project'inizde "Variables" bölümüne geri dönün
2. `ALLOWED_ORIGINS` değişkenini güncelleyin:

```bash
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

3. Backend otomatik yeniden deploy olacak

---

## ✅ TEST ETME

### Backend Test

```bash
# Health check
curl https://your-backend.up.railway.app/health

# Detailed health
curl https://your-backend.up.railway.app/api/v1/health/detailed
```

**Beklenen yanıt:**
```json
{
  "status": "healthy",
  "service": "Smart Lodge Budget",
  "version": "1.0.0",
  "environment": "production"
}
```

### Frontend Test

1. Tarayıcıda açın: `https://your-app.vercel.app`
2. Backend connection status: **✅ Connected** görmeli
3. API Docs linkine tıklayın: Swagger UI açılmalı

---

## 🐛 SORUN GİDERME

### Backend 500 Error

**Sorun:** Database connection error
**Çözüm:**
1. Railway Variables'da `DATABASE_URL` kontrol edin
2. `postgresql+asyncpg://` ile başladığından emin olun
3. Supabase password doğru mu kontrol edin

```bash
# Railway logs'u kontrol edin
railway logs
```

### Frontend "Backend not running"

**Sorun:** CORS veya backend connection error
**Çözüm:**
1. Railway backend çalışıyor mu kontrol edin
2. `NEXT_PUBLIC_API_URL` doğru mu kontrol edin
3. Railway `ALLOWED_ORIGINS` Vercel domain'ini içeriyor mu kontrol edin

### Gemini API Error

**Sorun:** "Invalid API key"
**Çözüm:**
1. https://ai.google.dev/ API key aktif mi kontrol edin
2. Railway `GEMINI_API_KEY` doğru kopyalandı mı kontrol edin
3. API key quotası doldu mu kontrol edin (60 req/min limit)

---

## 📊 DEPLOYMENT CHECKLISTS

### ✅ Pre-Deploy Checklist

- [ ] Gemini API key aldım
- [ ] Supabase database oluşturdum
- [ ] Upstash Redis oluşturdum
- [ ] Railway hesabı açtım
- [ ] Vercel hesabı açtım

### ✅ Backend Deploy Checklist

- [ ] Railway project oluşturuldu
- [ ] Tüm environment variables eklendi
- [ ] Database URL doğru formatta
- [ ] Redis URL doğru formatta
- [ ] Gemini API key eklendi
- [ ] Backend deploy başarılı
- [ ] Health check çalışıyor
- [ ] Domain kopyalandı

### ✅ Frontend Deploy Checklist

- [ ] Vercel project oluşturuldu
- [ ] Root directory: `frontend` seçildi
- [ ] `NEXT_PUBLIC_API_URL` eklendi
- [ ] Deploy başarılı
- [ ] Domain kopyalandı
- [ ] Railway CORS güncellendi
- [ ] Frontend açılıyor
- [ ] Backend connection çalışıyor

---

## 💰 MALİYET TAHMİNİ

### Ücretsiz Tier Limitleri

| Servis | Ücretsiz Limit | Yeterli mi? |
|--------|---------------|-------------|
| **Gemini** | 60 req/min | ✅ Yes (MVP için) |
| **Supabase** | 500MB database | ✅ Yes |
| **Upstash** | 10K commands/day | ✅ Yes |
| **Railway** | $5 credit | ✅ Yes (1-2 ay) |
| **Vercel** | Unlimited | ✅ Yes |

### Production Maliyeti (100 kullanıcı/gün)

- **Railway:** $5/ay (500 saat uptime)
- **Supabase:** $0 (free tier içinde)
- **Upstash:** $0 (free tier içinde)
- **Vercel:** $0 (free tier içinde)
- **Gemini:** $0 (free tier içinde)

**Toplam:** ~$5/ay 🎉

---

## 🔄 GÜNCELLEMELove

### Kod Değişikliği Sonrası

**Frontend (Vercel):**
```bash
git add .
git commit -m "Update frontend"
git push
# Vercel otomatik deploy eder
```

**Backend (Railway):**
```bash
git add .
git commit -m "Update backend"
git push
# Railway otomatik deploy eder
```

### Environment Variable Değişikliği

**Railway:** Variables bölümünden değiştir, otomatik redeploy
**Vercel:** Settings > Environment Variables, manual redeploy gerekebilir

---

## 📞 DESTEK

Sorun yaşarsanız:

1. **Railway Logs:** `railway logs --tail 100`
2. **Vercel Logs:** Vercel Dashboard > Deployments > Logs
3. **GitHub Issues:** Repository'de issue açın

---

**Hazırlayan:** Claude
**Tarih:** Ekim 2025
**Versiyon:** 1.0

Başarılar! 🚀
