import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dolar-valor.cl/',  
      lastModified: new Date().toISOString(),  
      changeFrequency: 'yearly',  
      priority: 1.0, 
    },
  ];
}
