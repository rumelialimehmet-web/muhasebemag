"""
Google Gemini AI Service for PDF analysis and data extraction.
Uses Gemini Pro Vision for document processing.
"""
import os
import base64
from typing import Dict, Any, Optional, List
import google.generativeai as genai
from PIL import Image
import io

from app.core.config import settings


class GeminiService:
    """
    Service for interacting with Google Gemini AI.
    Handles PDF processing, OCR, and structured data extraction.
    """

    def __init__(self):
        """Initialize Gemini service with API key."""
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-pro')

    async def extract_financial_data_from_image(
        self,
        image_path: str,
        prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Extract financial data from a PDF page image using Gemini Vision.

        Args:
            image_path: Path to the image file
            prompt: Custom prompt (optional)

        Returns:
            Extracted financial data as JSON
        """
        try:
            # Load image
            img = Image.open(image_path)

            # Default prompt for Turkish tax forms
            if prompt is None:
                prompt = self._get_default_extraction_prompt()

            # Generate content with Gemini
            response = self.model.generate_content([prompt, img])

            # Parse response
            result = self._parse_gemini_response(response.text)

            return result

        except Exception as e:
            print(f"Error in Gemini extraction: {e}")
            return {
                "error": str(e),
                "success": False
            }

    async def extract_from_multiple_pages(
        self,
        image_paths: List[str]
    ) -> Dict[str, Any]:
        """
        Extract data from multiple PDF pages.

        Args:
            image_paths: List of image file paths

        Returns:
            Combined extraction results
        """
        results = {
            "trial_balance": [],
            "balance_sheet": {},
            "income_statement": {},
            "pages_processed": 0,
            "success": True
        }

        for i, image_path in enumerate(image_paths):
            print(f"Processing page {i+1}/{len(image_paths)}...")

            page_result = await self.extract_financial_data_from_image(image_path)

            if not page_result.get("success", False):
                continue

            # Merge results
            if "trial_balance" in page_result:
                results["trial_balance"].extend(page_result["trial_balance"])

            if "balance_sheet" in page_result:
                results["balance_sheet"].update(page_result["balance_sheet"])

            if "income_statement" in page_result:
                results["income_statement"].update(page_result["income_statement"])

            results["pages_processed"] += 1

        return results

    async def analyze_financial_statements(
        self,
        financial_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Analyze financial statements and generate insights.

        Args:
            financial_data: Extracted financial data

        Returns:
            Analysis results with ratios and insights
        """
        prompt = f"""
        Aşağıdaki finansal verileri analiz et ve şunları hesapla:

        1. Likidite Rasyoları (5 adet)
        2. Karlılık Rasyoları (6 adet)
        3. Verimlilik Rasyoları (4 adet)
        4. Borçlanma Rasyoları (6 adet)

        Finansal Veriler:
        {financial_data}

        Sonucu JSON formatında ver:
        {{
          "liquidity_ratios": {{}},
          "profitability_ratios": {{}},
          "efficiency_ratios": {{}},
          "solvency_ratios": {{}},
          "analysis_summary": "",
          "warnings": []
        }}
        """

        try:
            response = self.model.generate_content(prompt)
            result = self._parse_gemini_response(response.text)
            return result
        except Exception as e:
            print(f"Error in financial analysis: {e}")
            return {
                "error": str(e),
                "success": False
            }

    def _get_default_extraction_prompt(self) -> str:
        """Get default prompt for Turkish tax form extraction."""
        return """
        Bu Türkçe Kurumlar Vergisi Beyannamesi sayfasından finansal verileri çıkar.

        Aşağıdaki bilgileri JSON formatında ver:

        1. MIZAN (Trial Balance):
           - Hesap Kodu
           - Hesap Adı
           - Borç (Debit)
           - Alacak (Credit)

        2. BİLANÇO (Balance Sheet):
           - Dönen Varlıklar (Current Assets)
             * Hazır Değerler (Cash)
             * Menkul Kıymetler (Securities)
             * Ticari Alacaklar (Receivables)
             * Stoklar (Inventory)
           - Duran Varlıklar (Fixed Assets)
             * Maddi Duran Varlıklar (Tangible Assets)
             * Maddi Olmayan Duran Varlıklar (Intangible Assets)
           - Kısa Vadeli Yükümlülükler (Current Liabilities)
           - Uzun Vadeli Yükümlülükler (Long-term Liabilities)
           - Özkaynaklar (Equity)

        3. GELİR TABLOSU (Income Statement):
           - Brüt Satışlar (Gross Sales)
           - Satışların Maliyeti (Cost of Sales)
           - Brüt Kar (Gross Profit)
           - Faaliyet Giderleri (Operating Expenses)
           - Faaliyet Karı (Operating Income)
           - Finansman Giderleri (Financial Expenses)
           - Vergi Öncesi Kar (Pre-tax Income)
           - Vergi (Tax)
           - Net Kar (Net Income)

        Sonuç formatı:
        {
          "trial_balance": [
            {
              "code": "100",
              "name": "Kasa",
              "debit": 50000,
              "credit": 0
            }
          ],
          "balance_sheet": {
            "current_assets": {
              "cash": 50000,
              "securities": 0,
              "receivables": 100000,
              "inventory": 75000,
              "total": 225000
            },
            "fixed_assets": {
              "tangible": 500000,
              "intangible": 50000,
              "total": 550000
            },
            "current_liabilities": 150000,
            "long_term_liabilities": 200000,
            "equity": 425000,
            "total_assets": 775000,
            "total_liabilities_equity": 775000
          },
          "income_statement": {
            "gross_sales": 1000000,
            "cost_of_sales": 600000,
            "gross_profit": 400000,
            "operating_expenses": 200000,
            "operating_income": 200000,
            "financial_expenses": 50000,
            "pre_tax_income": 150000,
            "tax": 30000,
            "net_income": 120000
          },
          "extraction_quality": 0.95,
          "warnings": [],
          "success": true
        }

        ÖNEMLİ: Sadece JSON formatında yanıt ver, açıklama ekleme.
        """

    def _parse_gemini_response(self, response_text: str) -> Dict[str, Any]:
        """
        Parse Gemini response and extract JSON.

        Args:
            response_text: Raw response from Gemini

        Returns:
            Parsed JSON data
        """
        import json
        import re

        try:
            # Try to find JSON in response
            # Remove markdown code blocks if present
            cleaned = response_text.strip()

            # Remove ```json and ``` if present
            if cleaned.startswith('```'):
                cleaned = re.sub(r'^```(?:json)?\s*\n', '', cleaned)
                cleaned = re.sub(r'\n```\s*$', '', cleaned)

            # Parse JSON
            data = json.loads(cleaned)

            # Ensure success flag
            if "success" not in data:
                data["success"] = True

            return data

        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response text: {response_text[:500]}...")

            return {
                "error": "Failed to parse Gemini response",
                "raw_response": response_text[:1000],
                "success": False
            }


# Create global instance
gemini_service = GeminiService()
