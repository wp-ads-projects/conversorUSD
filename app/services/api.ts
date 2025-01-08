import axios from 'axios';

export const getExchangeRates = async (baseCurrency: string) => {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    return response.data;
  } catch (e) {
    throw new Error('Error al obtener las tasas de cambio : '+e);
  }
};

