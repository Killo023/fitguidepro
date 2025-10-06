'use server';

/**
 * @fileOverview AI agent that suggests meal replacements and alternatives
 *   based on macronutrient goals and diet preferences for a single day.
 *
 * - suggestDailyMealPlan - A function that suggests a meal plan for one day.
 * - SuggestDailyMealPlanInput - The input type for the suggestDailyMealPlan function.
 * - SuggestDailyMealPlanOutput - The return type for the suggestDailyMealPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDailyMealPlanInputSchema = z.object({
  dailyCalories: z.number().describe('The daily calorie goal.'),
  macros: z
    .object({
      protein: z.number().describe('The protein macro goal in grams.'),
      carbs: z.number().describe('The carbohydrate macro goal in grams.'),
      fat: z.number().describe('The fat macro goal in grams.'),
    })
    .describe('The daily macro goals.'),
  dietPreference: z
    .string()
    .describe(
      'The dietary preference of the user, such as vegetarian, keto, balanced, etc.'
    ),
  goalType: z.enum(['weight-loss', 'weightlifting', 'fitness']).describe('The primary fitness goal of the user.'),
  allergies: z.string().optional().describe('A comma-separated list of foods the user is allergic to.'),
  dislikedFoods: z.string().optional().describe('A comma-separated list of foods the user dislikes.'),
  isLactoseIntolerant: z.boolean().optional().describe('Whether the user is lactose intolerant.'),
  dayOfWeek: z.string().describe("The day of the week for which to generate the plan (e.g., 'Monday').")
});
export type SuggestDailyMealPlanInput = z.infer<
  typeof SuggestDailyMealPlanInputSchema
>;

const NutritionInfoSchema = z.object({
    calories: z.number().describe('Estimated calories for the meal.'),
    protein: z.number().describe('Estimated protein in grams for the meal.'),
    carbs: z.number().describe('Estimated carbohydrates in grams for the meal.'),
    fat: z.number().describe('Estimated fat in grams for the meal.'),
});

const SuggestionSchema = z.object({
  name: z.string().describe('The name of the meal suggestion.'),
  reason: z.string().describe('A brief explanation of why this meal is suggested, focusing on goal progress.'),
  ingredients: z.array(z.string()).describe('A list of ingredients with specific quantities (e.g., "100g Chicken Breast", "1/2 cup Brown Rice").'),
  nutrition: NutritionInfoSchema.describe('The detailed nutritional breakdown for the meal.'),
});

const DailyMealPlanSchema = z.object({
  Breakfast: z.array(SuggestionSchema).describe('Suggestions for Breakfast.'),
  Lunch: z.array(SuggestionSchema).describe('Suggestions for Lunch.'),
  Dinner: z.array(SuggestionSchema).describe('Suggestions for Dinner.'),
  Snacks: z.array(SuggestionSchema).describe('Suggestions for Snacks.'),
});

const SuggestDailyMealPlanOutputSchema = z.object({
  plan: DailyMealPlanSchema.describe(
      'A daily eating plan. The plan should have a variety of meal suggestions for Breakfast, Lunch, Dinner, and Snacks for the specified day. Each suggestion should include a name and a reason that connects it to the user\'s fitness goals.'
    ),
});
export type SuggestDailyMealPlanOutput = z.infer<
  typeof SuggestDailyMealPlanOutputSchema
>;

export async function suggestDailyMealPlan(
  input: SuggestDailyMealPlanInput
): Promise<SuggestDailyMealPlanOutput> {
  return suggestDailyMealPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDailyMealPlanPrompt',
  input: {schema: SuggestDailyMealPlanInputSchema},
  output: {schema: SuggestDailyMealPlanOutputSchema},
  prompt: `You are an AI nutrition expert. Your task is to create a detailed eating plan for a specific day of the week based on a user's macronutrient goals, diet preferences, fitness goal, and dietary restrictions.

  The user's daily calorie goal is {{dailyCalories}}.
  The user's macro goals are:
  - Protein: {{macros.protein}}g
  - Carbs: {{macros.carbs}}g
  - Fat: {{macros.fat}}g
  
  The user's diet preference is {{dietPreference}}.
  The user's primary fitness goal is {{goalType}}.
  Today is {{dayOfWeek}}. Please generate a plan for this day.

  IMPORTANT: You must adhere to the following dietary restrictions:
  - Allergies: DO NOT include any meals containing these ingredients: {{#if allergies}}{{allergies}}{{else}}None specified{{/if}}.
  - Disliked Foods: DO NOT include any meals containing these ingredients: {{#if dislikedFoods}}{{dislikedFoods}}{{else}}None specified{{/if}}.
  - Lactose Intolerance: {{#if isLactoseIntolerant}}The user is lactose intolerant. All suggestions must be dairy-free or use lactose-free alternatives.{{else}}Not applicable.{{/if}}

  Generate a comprehensive and varied eating plan for {{dayOfWeek}}. 
  Provide suggestions for Breakfast, Lunch, Dinner, and Snacks.
  For each meal, provide a few different options.
  For each suggestion, provide the following details:
  - 'name': The name of the meal.
  - 'ingredients': A list of all ingredients with specific quantities (e.g., "150g salmon fillet", "1 cup quinoa", "1/2 avocado").
  - 'nutrition': An object with the estimated 'calories', 'protein', 'carbs', and 'fat' in grams for the meal.
  - 'reason': A brief explanation of how the meal helps the user achieve their specific fitness goal (e.g., 'High in protein to support muscle repair for weightlifting' or 'Low in calories but high in fiber to keep you full for weight loss').
  
  Return the daily plan as a JSON object that strictly follows the output schema. Ensure all fields are populated accurately.
`,
});

const suggestDailyMealPlanFlow = ai.defineFlow(
  {
    name: 'suggestDailyMealPlanFlow',
    inputSchema: SuggestDailyMealPlanInputSchema,
    outputSchema: SuggestDailyMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
