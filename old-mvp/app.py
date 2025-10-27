import os
import pdfplumber
import pandas as pd
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Yükleme klasörü ayarları
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def extract_financial_data(pdf_path):
    """
    Bu fonksiyon, PDF'ten Bilanço ve Gelir Tablosu verilerini çıkarmak için
    pdfplumber kullanır.

    ÖNEMLİ NOT: Bu kısım projenizin 'beynidir'.
    Kurumlar Vergisi Beyannamesi standart bir formattadır.
    Gerçek bir projede, "Bilanço"nun hangi sayfada (örn: 10. sayfa)
    ve hangi koordinatlarda olduğunu bilmeniz gerekir.

    Bu MVP'de, PDF'teki *ilk* anlamlı tabloyu bulmaya çalışacağız.
    Gerçekçi bir senaryo için bu fonksiyonun detaylıca özelleştirilmesi gerekir.
    """
    bilanco_data = []
    gelir_tablosu_data = []

    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"PDF açıldı. Toplam sayfa sayısı: {len(pdf.pages)}")

            # --- MVP İÇİN BASİT YAKLAŞIM ---
            # PDF'teki tüm sayfalardaki tüm tabloları çekmeyi deneyelim
            # ve bunları iki kategoriye ayıralım (Basit bir varsayım)

            all_tables = []
            for i, page in enumerate(pdf.pages):
                print(f"Sayfa {i+1} işleniyor...")
                tables = page.extract_tables()
                if tables:
                    print(f"  - {len(tables)} tablo bulundu")
                    all_tables.extend(tables)

            print(f"Toplam {len(all_tables)} tablo bulundu")

            # Varsayım: İlk bulunan tablo Bilanço, ikincisi Gelir Tablosu'dur.
            # BU KISMI KESİNLİKLE KENDİ PDF YAPINIZA GÖRE GÜNCELLEMELİSİNİZ.
            if len(all_tables) > 0:
                bilanco_data = all_tables[0]
                print(f"Bilanço tablosu: {len(bilanco_data)} satır")

            if len(all_tables) > 1:
                gelir_tablosu_data = all_tables[1]
                print(f"Gelir Tablosu: {len(gelir_tablosu_data)} satır")

        # Veriyi Pandas DataFrame'e çevirip JSON formatına hazırlayalım
        result = {}

        if bilanco_data and len(bilanco_data) > 1:
            df_bilanco = pd.DataFrame(bilanco_data[1:], columns=bilanco_data[0])
            result["bilanco"] = df_bilanco.to_dict(orient='records')
        else:
            result["bilanco"] = []

        if gelir_tablosu_data and len(gelir_tablosu_data) > 1:
            df_gelir = pd.DataFrame(gelir_tablosu_data[1:], columns=gelir_tablosu_data[0])
            result["gelir_tablosu"] = df_gelir.to_dict(orient='records')
        else:
            result["gelir_tablosu"] = []

        return result

    except Exception as e:
        print(f"Hata oluştu: {e}")
        import traceback
        traceback.print_exc()
        return None
    finally:
        # Geçici dosyayı sil
        if os.path.exists(pdf_path):
            try:
                os.remove(pdf_path)
                print(f"Geçici dosya silindi: {pdf_path}")
            except Exception as e:
                print(f"Dosya silinirken hata: {e}")

@app.route('/')
def index():
    """Ana sayfayı (HTML) gösterir."""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    """PDF dosyasını alır, işler ve sonucu döner."""
    if 'file' not in request.files:
        return jsonify({"error": "Dosya bulunamadı"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Dosya seçilmedi"}), 400

    if file and file.filename.endswith('.pdf'):
        # Dosyayı geçici olarak kaydet
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        print(f"Dosya kaydedildi: {filepath}")

        # PDF'ten veriyi çıkar
        data = extract_financial_data(filepath)

        if data:
            return jsonify(data)
        else:
            return jsonify({"error": "PDF işlenemedi veya veri bulunamadı"}), 500

    return jsonify({"error": "Geçersiz dosya formatı. Lütfen PDF yükleyin."}), 400

@app.route('/health')
def health():
    """Sağlık kontrolü endpoint'i"""
    return jsonify({"status": "ok", "message": "Sunucu çalışıyor"})

if __name__ == '__main__':
    print("=" * 50)
    print("Mali Tablo Analiz MVP - Sunucu Başlatılıyor")
    print("=" * 50)
    print("Sunucu adresi: http://127.0.0.1:5000")
    print("Durdurmak için: CTRL+C")
    print("=" * 50)
    app.run(debug=True, port=5000, host='0.0.0.0')
