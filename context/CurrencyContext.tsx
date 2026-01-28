"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'KES' | 'TZS' | 'ZAR' | 'NGN' | 'GBP' | 'EUR';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to base currency (assuming NGN is base based on existing code)
}

// Exchange rates relative to NGN (Base)
// NOTE: In a real app, fetch these from an API
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  NGN: 1,
  USD: 0.00065, // 1 NGN = 0.00065 USD (approx 1500 NGN/USD)
  KES: 0.10,    // 1 NGN = 0.10 KES
  TZS: 1.65,    // 1 NGN = 1.65 TZS
  ZAR: 0.012,   // 1 NGN = 0.012 ZAR
  GBP: 0.00051, 
  EUR: 0.00060,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  NGN: '₦',
  USD: '$',
  KES: 'KSh',
  TZS: 'TSh',
  ZAR: 'R',
  GBP: '£',
  EUR: '€',
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInBase: number) => string;
  availableCurrencies: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      // 1. Check localStorage
      const savedCurrency = localStorage.getItem('waka_currency') as CurrencyCode;
      if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
        setCurrencyCode(savedCurrency);
        setLoading(false);
        return;
      }

      // 2. Detect location
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const country = data.country_code; // e.g., US, KE, TZ, ZA, NG

        let detectedCurrency: CurrencyCode = 'USD';

        switch (country) {
          case 'KE': detectedCurrency = 'KES'; break;
          case 'TZ': detectedCurrency = 'TZS'; break;
          case 'ZA': detectedCurrency = 'ZAR'; break;
          case 'NG': detectedCurrency = 'NGN'; break;
          case 'GB': detectedCurrency = 'GBP'; break;
          // Add more mappings as needed
          default: detectedCurrency = 'USD';
        }

        setCurrencyCode(detectedCurrency);
        localStorage.setItem('waka_currency', detectedCurrency); // Save auto-detected preference
      } catch (error) {
        console.error("Failed to detect location:", error);
        // Default to USD is already set
      } finally {
        setLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyCode(code);
    localStorage.setItem('waka_currency', code);
  };

  const currency: Currency = {
    code: currencyCode,
    symbol: CURRENCY_SYMBOLS[currencyCode],
    rate: EXCHANGE_RATES[currencyCode],
  };

  const formatPrice = (priceInBase: number) => {
    const value = priceInBase * currency.rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice,
      availableCurrencies: Object.keys(EXCHANGE_RATES) as CurrencyCode[]
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
