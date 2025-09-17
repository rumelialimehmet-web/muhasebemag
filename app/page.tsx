// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SearchFilterSection from '@/components/search-filter-section';
import TestimonialsSection from '@/components/testimonials-section';
import NewsletterSection from '@/components/newsletter-section';
import EnhancedDealCard from '@/components/enhanced-deal-card';
import PartnerBrandingFooter from '@/components/partner-branding-footer';
import DealOfTheDaySection from '@/components/deal-of-the-day-section';

// Veri yapımızı tanımlıyoruz
interface FlightDeal {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  price: number;
  depart_at: string;
  return_at: string;
  link: string;
  image?: { src: string; alt: string; }; // Bileşenlerin beklediği 'image' alanı
  city_name?: string;
  country_name?: string;
}

export default function HomePage() {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/deals');

        if (!response.ok) {
          throw new Error('Deals konden niet worden geladen.');
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        // ===> KESİN ÇÖZÜM 1: GELEN VERİYİ ZENGİNLEŞTİRME <===
        // API'den gelen her bir fırsata, bileşenlerin çökmemesi için
        // bir 'image' nesnesi ekliyoruz.
        const enrichedDeals = (data.items || []).map((deal: FlightDeal) => ({
            ...deal,
            image: { 
                src: `https://source.unsplash.com/400x300/?${deal.destination},city`,
                alt: `Uitzicht op ${deal.destination}`
            },
            city_name: deal.destination,
            country_name: 'Bestemming'
        }));

        setDeals(enrichedDeals);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDeals();
  }, []);

  // ===> KESİN ÇÖZÜM 2: YEDEK VERİ OLUŞTURMA <===
  // API'den veri gelmeden önce sayfanın çökmemesi için
  // 'DealOfTheDaySection' gibi bileşenlere göndereceğimiz boş bir veri.
  const placeholderDeal: FlightDeal = {
    id: 'placeholder',
    origin: 'Laden...',
    destination: 'Laden...',
    airline: '',
    price: 0,
    depart_at: '',
    return_at: '',
    link: '#',
    image: { src: '/placeholder.jpg', alt: 'Laden...' },
    city_name: 'Laden...',
    country_name: ''
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <SearchFilterSection />
        {/* API'den veri gelene kadar yedek veriyi kullanıyoruz */}
        <DealOfTheDaySection deal={deals[0] || placeholderDeal} />
        <section className="container mx-auto px-4 md:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Populaire Vliegdeals</h2>
          {isLoading && <p className="text-center py-10">Deals worden geladen...</p>}
          {error && <p className="text-center text-red-500 py-10">Fout: {error}</p>}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deals.length > 0 ? (
                deals.map((deal) => (
                  <EnhancedDealCard key={deal.id} deal={deal} />
                ))
              ) : (
                <p className="col-span-full text-center py-10">Geen passende deals gevonden.</p>
              )}
            </div>
          )}
        </section>
        <TestimonialsSection />
        <NewsletterSection />
        <PartnerBrandingFooter />
      </main>
      <Footer />
    </div>
  );
}
