import { appRoute } from '@genkit-ai/next';
import { suggestDailyMealPlanFlow } from '@/ai/flows/suggest-meal-replacements';

export const POST = appRoute(suggestDailyMealPlanFlow);
