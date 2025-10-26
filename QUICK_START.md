# ⚡ QUICK START - 10 Dakikada Deploy!

**Gemini AI + Vercel + Railway ile canlıya alma**

---

## 🎯 3 Basit Adım

### 1️⃣ API Keys Alın (5 dakika)

```bash
# Google Gemini API
https://ai.google.dev/
→ "Get API Key"
→ Kopyala: AIzaSyBxxxxxx

# Supabase Database
https://supabase.com/
→ New Project
→ Connection string kopyala
→ Değiştir: postgresql → postgresql+asyncpg

# Upstash Redis
https://upstash.com/
→ Create Database
→ Connection URL kopyala
```

---

### 2️⃣ Railway Deploy (3 dakika)

```bash
# 1. Railway'e git
https://railway.app/

# 2. "Deploy from GitHub"
→ muhasebemag repository seçin

# 3. Environment Variables ekle
DATABASE_URL=postgresql+asyncpg://postgres:xxx@db.xxx.supabase.co:5432/postgres
REDIS_URL=redis://:xxx@apn1-xxx.upstash.io:6379
GEMINI_API_KEY=AIzaSyBxxxxxx
SECRET_KEY=random-32-character-string
ALLOWED_ORIGINS=https://your-app.vercel.app

# 4. Deploy!
→ Domain kopyala: your-backend.up.railway.app
```

---

### 3️⃣ Vercel Deploy (2 dakika)

```bash
# 1. Vercel'e git
https://vercel.com/

# 2. "New Project"
→ muhasebemag repository seçin
→ Root Directory: frontend

# 3. Environment Variable ekle
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app

# 4. Deploy!
→ Canlı: https://your-app.vercel.app
```

---

## ✅ Test Et

```bash
# Backend test
curl https://your-backend.up.railway.app/health

# Frontend test
https://your-app.vercel.app
```

---

## 🎉 TAMAMLANDI!

Artık tamamen online bir sistem var:

✅ **Frontend:** Vercel'de çalışıyor
✅ **Backend:** Railway'de çalışıyor
✅ **Database:** Supabase'de
✅ **Cache:** Upstash'de
✅ **AI:** Google Gemini ile

**Maliyet:** ~$5/ay (veya tamamen ücretsiz tier'da)

---

## 🔥 Sonraki Adımlar

1. PDF upload fonksiyonunu test edin
2. Gemini AI extraction test edin
3. Gerçek beyanname PDF'i ile deneyin

Detaylı guide için: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Hazır mısınız? Başlayın! 🚀**
