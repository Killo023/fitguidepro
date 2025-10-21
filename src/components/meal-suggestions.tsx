'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Apple, Beef, Wheat, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface MealSuggestionsProps {
  dailyCalories: number;
  macros: { protein: number; carbs: number; fat: number; };
  dietPreference: string;
  goalType: ('weight-loss' | 'weightlifting' | 'fitness')[];
  allergies?: string;
  dislikedFoods?: string;
  isLactoseIntolerant?: boolean;
}

interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface Suggestion {
  name: string;
  reason: string;
  ingredients: string[];
  nutrition: NutritionInfo;
}

interface DailyPlan {
    Breakfast: Suggestion[];
    Lunch: Suggestion[];
    Dinner: Suggestion[];
    Snacks: Suggestion[];
}

interface WeeklyPlan {
    Monday?: DailyPlan;
    Tuesday?: DailyPlan;
    Wednesday?: DailyPlan;
    Thursday?: DailyPlan;
    Friday?: DailyPlan;
    Saturday?: DailyPlan;
    Sunday?: DailyPlan;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MealSuggestions({ 
    dailyCalories, 
    macros, 
    dietPreference, 
    goalType,
    allergies,
    dislikedFoods,
    isLactoseIntolerant 
}: MealSuggestionsProps) {
  const [loadingDay, setLoadingDay] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<WeeklyPlan>({});
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getSuggestionsForDay = async (day: string) => {
    setLoadingDay(day);
    setError(null);
    try {
      const response = await fetch('/api/genkit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flow: 'suggestDailyMealPlanFlow',
          input: {
            dailyCalories,
            macros,
            dietPreference,
            goalType,
            allergies,
            dislikedFoods,
            isLactoseIntolerant,
            dayOfWeek: day,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.plan) {
        setSuggestions(prev => ({
            ...prev,
            [day]: data.plan
        }));
      } else {
        throw new Error(`Received no suggestions from the AI for ${day}.`);
      }
    } catch (e: any) {
      console.error(e);
      const errorMessage = "Sorry, I couldn't generate suggestions at the moment. Please try again.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: errorMessage,
      });
    } finally {
      setLoadingDay(null);
    }
  };

  const renderDayContent = (day: string, dailyPlan: DailyPlan) => {
    if (loadingDay === day) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <p>Generating plan for {day}...</p>
            </div>
        )
    }
    
    if (!dailyPlan) {
        return (
            <div className="p-4 text-center">
                <Button 
                    onClick={() => getSuggestionsForDay(day)}
                    className="w-full sm:w-auto min-w-[120px] px-4 py-2 text-sm sm:text-base"
                >
                    <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                    Generate
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 pl-2">
            {Object.entries(dailyPlan).map(([mealType, mealSuggestions]) => (
                <div key={mealType}>
                    <h4 className="font-semibold capitalize mb-2">{mealType}</h4>
                    <div className="space-y-4">
                    {(mealSuggestions as Suggestion[]).map((suggestion, index) => (
                    <div key={index} className="p-3 rounded-md border bg-background/50">
                        <p className='font-bold'>{suggestion.name}</p>
                        <p className="text-muted-foreground text-sm mt-1 mb-3">{suggestion.reason}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm font-semibold mb-2">Ingredients</h5>
                                <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                    {suggestion.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold mb-2">Nutrition Facts</h5>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Apple className="h-4 w-4 text-primary" />
                                        <span>{suggestion.nutrition.calories} kcal</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Beef className="h-4 w-4 text-red-500" />
                                        <span>{suggestion.nutrition.protein}g Protein</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wheat className="h-4 w-4 text-yellow-600" />
                                        <span>{suggestion.nutrition.carbs}g Carbs</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wind className="h-4 w-4 text-gray-500" />
                                        <span>{suggestion.nutrition.fat}g Fat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="text-lg">AI-Powered Daily Meal Planner</CardTitle>
        <CardDescription>Generate a personalized meal plan for each day of the week.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <Accordion type="single" collapsible className="w-full">
            {daysOfWeek.map((day) => {
                const dailyPlan = suggestions[day as keyof WeeklyPlan];
                return (
                    <AccordionItem value={day} key={day}>
                        <AccordionTrigger className="font-semibold text-base">{day}</AccordionTrigger>
                        <AccordionContent>
                           {renderDayContent(day, dailyPlan!)}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
