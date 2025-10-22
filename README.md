# 📊 Mali Tablo Analiz MVP

Kurumlar Vergisi Beyannamesi PDF'lerinden otomatik olarak Bilanço ve Gelir Tablosu verilerini çıkaran web tabanlı analiz sistemi.

## 🎯 Proje Hedefi

Bu MVP (Minimum Uygulanabilir Ürün), finansal belge analizinin en kritik kısmını çözmeyi amaçlar: **PDF'ten veri çıkarma**. Kullanıcılar bir Kurumlar Vergisi Beyannamesi PDF'i yükleyebilir ve sistem otomatik olarak:

- 💰 Bilanço verilerini (Aktif/Pasif)
- 📈 Gelir Tablosu verilerini
- 📊 Diğer finansal tabloları

Çıkarıp web arayüzünde görüntüler.

## ✨ Özellikler

- 📤 **Kolay PDF Yükleme**: Sürükle-bırak veya dosya seçici ile PDF yükleme
- ⚡ **Hızlı İşleme**: Saniyeler içinde PDF analizi
- 📊 **Tablo Görünümü**: Çıkarılan verileri düzenli HTML tablolarında gösterim
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz
- 🎨 **Modern UI**: Kullanıcı dostu, modern web arayüzü

## 🛠️ Teknoloji Stack

- **Backend**: Python + Flask
- **PDF İşleme**: pdfplumber
- **Veri İşleme**: pandas
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: RESTful JSON API

## 📋 Gereksinimler

- Python 3.8 veya üzeri
- pip (Python paket yöneticisi)

## 🚀 Kurulum

### 1. Projeyi İndirin

```bash
git clone <repository-url>
cd muhasebemag
```

### 2. Sanal Ortam Oluşturun (Önerilen)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Bağımlılıkları Yükleyin

```bash
pip install -r requirements.txt
```

### 4. Uygulamayı Başlatın

```bash
python app.py
```

Sunucu başlatıldıktan sonra şu mesajı göreceksiniz:
```
==================================================
Mali Tablo Analiz MVP - Sunucu Başlatılıyor
==================================================
Sunucu adresi: http://127.0.0.1:5000
Durdurmak için: CTRL+C
==================================================
```

### 5. Web Arayüzünü Açın

Tarayıcınızda şu adresi açın:
```
http://127.0.0.1:5000
```

## 📖 Kullanım

1. **PDF Seçin**: "Dosya Seç" butonuna tıklayarak Kurumlar Vergisi Beyannamesi PDF'inizi seçin
2. **Yükle ve Analiz Et**: Yükleme butonuna tıklayın
3. **Sonuçları İnceleyin**: Sistem PDF'i işleyip Bilanço ve Gelir Tablosu verilerini gösterecektir

## 📁 Proje Yapısı

```
muhasebemag/
│
├── app.py                  # Flask backend uygulaması
├── requirements.txt        # Python bağımlılıkları
├── README.md              # Bu dosya
│
├── templates/             # HTML şablonları
│   └── index.html        # Ana sayfa arayüzü
│
└── uploads/              # Geçici PDF dosyaları (otomatik oluşur)
```

## 🔧 API Endpoints

### GET /
Ana sayfa HTML arayüzü

### POST /upload
PDF dosyası yükler ve analiz eder

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (PDF dosyası)

**Response:**
```json
{
  "bilanco": [
    {
      "Kalem": "Dönen Varlıklar",
      "Tutar": "1000000"
    }
  ],
  "gelir_tablosu": [
    {
      "Kalem": "Satış Gelirleri",
      "Tutar": "5000000"
    }
  ]
}
```

### GET /health
Sunucu sağlık kontrolü

**Response:**
```json
{
  "status": "ok",
  "message": "Sunucu çalışıyor"
}
```

## ⚠️ Önemli Notlar

### PDF Yapısı Özelleştirmesi

Bu MVP, **genel bir yaklaşım** kullanır ve PDF'teki ilk iki tabloyu Bilanço ve Gelir Tablosu olarak kabul eder. **Gerçek kullanım için**, `app.py` dosyasındaki `extract_financial_data()` fonksiyonunu şu şekilde özelleştirmeniz gerekir:

1. **Sayfa Numaralarını Belirleyin**: Bilanço ve Gelir Tablosu'nun hangi sayfalarda olduğunu tespit edin
2. **Koordinatları Ayarlayın**: Gerekirse belirli koordinatlardaki tabloları çekin
3. **Başlıkları Tanımlayın**: Tablo başlıklarını doğru şekilde algılayın

Örnek özelleştirme:
```python
# Bilanço 10. sayfada
page_bilanco = pdf.pages[9]  # İndeks 0'dan başlar
tables_bilanco = page_bilanco.extract_tables()

# Gelir Tablosu 11. sayfada
page_gelir = pdf.pages[10]
tables_gelir = page_gelir.extract_tables()
```

## 🚀 Gelecek Özellikler (Roadmap)

Bu MVP başarıyla tamamlandıktan sonra eklenebilecek özellikler:

- [ ] 🎯 **Gelişmiş PDF Okuma**: %100 doğrulukla beyanname analizi
- [ ] 📊 **Mizan Oluşturma**: Otomatik mizan tablosu türetme
- [ ] 📈 **Rasyo Analizleri**: Likidite, Kârlılık, Borçlanma oranları
- [ ] 🔄 **Karşılaştırmalı Analiz**: Farklı dönemleri karşılaştırma
- [ ] 📉 **Grafikler ve Dashboard**: Chart.js ile görselleştirme
- [ ] 📥 **Excel Çıktısı**: Verileri Excel formatında indirme
- [ ] 🤖 **Yapay Zeka Yorumlama**: KURGAN analizi gibi AI destekli yorumlama
- [ ] 💾 **Veri Tabanı**: Geçmiş analizleri saklama
- [ ] 👥 **Kullanıcı Yönetimi**: Çoklu kullanıcı desteği
- [ ] 🔐 **Güvenlik**: Dosya şifreleme ve güvenli depolama

## 🐛 Sorun Giderme

### Port 5000 Kullanımda
Eğer 5000 portu başka bir uygulama tarafından kullanılıyorsa, `app.py` dosyasının son satırındaki port numarasını değiştirin:
```python
app.run(debug=True, port=5001, host='0.0.0.0')
```

### PDF İşlenemiyor
- PDF dosyasının bozuk olmadığından emin olun
- PDF'in metin tabanlı olduğundan emin olun (taranan görüntü değil)
- Konsol çıktılarını kontrol ederek hangi aşamada hata aldığınızı görün

### Bağımlılık Hataları
Tüm bağımlılıkları tekrar yükleyin:
```bash
pip install --upgrade -r requirements.txt
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📧 İletişim

Sorularınız için issue açabilir veya proje sahibiyle iletişime geçebilirsiniz.

---

**Not**: Bu bir MVP'dir ve üretim ortamı için ek güvenlik ve performans optimizasyonları gerektirir.
