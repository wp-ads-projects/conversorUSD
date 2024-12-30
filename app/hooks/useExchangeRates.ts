import { useState, useEffect, useRef } from "react";
import { getExchangeRates } from "@/app/services/api";

type Rates = {
  [currency: string]: number;
};

type ExchangeRateData = {
  rates: Rates;
  date: string;
};

type CachedRates = {
  [currency: string]: {
    data: ExchangeRateData;
    timestamp: number;
  };
};

type Flags = {
  [countryCode: string]: string;
};

export function useExchangeRates(baseCurrency: string = "USD") {
  const [rates, setRates] = useState<Rates>({});
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cachedRates = useRef<CachedRates>({});
  const cachedFlags = useRef<Flags>({});

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      const cachedData = cachedRates.current[baseCurrency];
      const isCacheValid = cachedData && (Date.now() - cachedData.timestamp) < 3600000; // 1 hora en milisegundos

      if (isCacheValid) {
        setRates(cachedData.data.rates);
        setDate(cachedData.data.date);
      } else {
        try {
          const data: ExchangeRateData = await getExchangeRates(baseCurrency);
          cachedRates.current[baseCurrency] = { data, timestamp: Date.now() };
          setRates(data.rates);
          setDate(data.date);
        } catch {
          setError("Error al obtener las tasas de cambio");
        }
      }
      setLoading(false);
    };

    fetchRates();
  }, [baseCurrency]);

  useEffect(() => {
    const fetchFlags = async () => {
      if (Object.keys(cachedFlags.current).length === 0) {
        try {
          const response = await fetch("/countryFlags.json");
          if (!response.ok) throw new Error("Error al cargar las banderas");
          cachedFlags.current = (await response.json()) as Flags;
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchFlags();
  }, []);

  return { rates, date, flags: cachedFlags.current, loading, error };
}
