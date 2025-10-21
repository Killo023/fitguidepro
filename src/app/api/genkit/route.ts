import { genkitHandler } from '@genkit-ai/next';
import { ai } from '@/ai/genkit';

// Import all your flows to register them
import '@/ai/flows/suggest-meal-replacements';

export const { POST, GET } = genkitHandler({
  ai,
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://fitguidepro-qdte-3cbjzf37v-cyles-projects-7887f86a.vercel.app']
      : ['http://localhost:9002'],
    credentials: true,
  },
});
