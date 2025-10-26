# ⚡ QUICK START - 5 Dakikada Deploy!

**%100 ÜCRETSİZ! - Gemini AI + Vercel + Render.com**

---

## 💰 Tamamen Ücretsiz Stack

✅ **Backend:** Render.com (ücretsiz + database dahil!)
✅ **Frontend:** Vercel (ücretsiz)
✅ **Database:** Render PostgreSQL (ücretsiz 1GB!)
✅ **Cache:** Upstash Redis (ücretsiz 10K req/day)
✅ **AI:** Google Gemini (ücretsiz 60 req/min)

**TOPLAM MALİYET: $0/ay** 🎉

---

## 🎯 3 Basit Adım

### 1️⃣ API Keys Alın (2 dakika)

```bash
# Google Gemini API (ZORUNLU)
https://ai.google.dev/
→ "Get API Key"
→ Kopyala: AIzaSyBxxxxxx

# Upstash Redis (OPSİYONEL ama önerilen)
https://upstash.com/
→ Create Database
→ Singapore region
→ Connection URL kopyala
```

---

### 2️⃣ Render.com Deploy (2 dakika)

```bash
# 1. Render.com'a git
https://render.com/
→ GitHub ile giriş yap

# 2. "New +" → "Blueprint"
→ muhasebemag repository seçin
→ render.yaml otomatik okunur

# 3. Sadece 2 environment variable ekle
GEMINI_API_KEY=AIzaSyBxxxxxx
REDIS_URL=redis://:xxx@apn1-xxx.upstash.io:6379 (opsiyonel)

# 4. "Apply" → Deploy başlar!
→ 5 dakika bekle
→ Domain: https://smart-lodge-backend.onrender.com
```

**DİKKAT:** Database otomatik oluşur, başka bir şey eklemeyin!

---

### 3️⃣ Vercel Deploy (1 dakika)

```bash
# 1. Vercel'e git
https://vercel.com/
→ GitHub ile giriş yap

# 2. "New Project"
→ muhasebemag repository seçin
→ Root Directory: frontend

# 3. Environment Variable ekle
NEXT_PUBLIC_API_URL=https://smart-lodge-backend.onrender.com

# 4. Deploy!
→ Canlı: https://your-app.vercel.app
```

---

## ✅ Test Et

```bash
# Backend test
curl https://smart-lodge-backend.onrender.com/health

# Frontend test
https://your-app.vercel.app
```

**İLK İSTEK YAVAŞ OLABİLİR** (30-60 saniye)
- Render free tier 15 dakika sonra uyur
- Sonraki istekler hızlı olur!

---

## 🎉 TAMAMLANDI!

Artık tamamen ÜCRETSİZ online sistem:

✅ **Frontend:** Vercel'de çalışıyor
✅ **Backend:** Render.com'da çalışıyor
✅ **Database:** Render PostgreSQL (otomatik!)
✅ **Cache:** Upstash'de
✅ **AI:** Google Gemini ile

**TOPLAM MALİYET: $0/ay** 💰

---

## 🔥 Sonraki Adımlar

1. PDF upload fonksiyonunu test edin
2. Gemini AI extraction test edin
3. Gerçek beyanname PDF'i ile deneyin

Detaylı guide için: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Hazır mısınız? Başlayın! 🚀**
