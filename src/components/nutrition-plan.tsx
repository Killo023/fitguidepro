
'use client';

import type { NutritionPlan as NutritionPlanType, Goal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import MealSuggestions from './meal-suggestions';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

interface NutritionPlanProps {
  nutritionPlan: NutritionPlanType;
  goal: Goal;
}

export default function NutritionPlan({ nutritionPlan, goal }: NutritionPlanProps) {
  const { dailyCalories, macros } = nutritionPlan;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Daily Nutrition Guide</CardTitle>
        <CardDescription>Your recommended daily intake to fuel your goals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative h-48 md:h-56 mb-6">
            <Image
                src={placeholderImages.nutrition}
                alt="Healthy food"
                data-ai-hint="healthy food"
                fill
                className="rounded-lg object-cover"
            />
        </div>
        <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-center gap-4">
          <Flame className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-primary">Daily Calorie Target</p>
            <p className="text-2xl font-bold text-primary">{dailyCalories.toLocaleString()} kcal</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-center">Macronutrient Split</h4>
          <div className="flex justify-around items-end gap-2 text-center">
            <div className="flex-1 p-2 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-lg font-bold">{macros.protein}g</p>
            </div>
            <div className="flex-1 p-2 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="text-lg font-bold">{macros.carbs}g</p>
            </div>
            <div className="flex-1 p-2 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="text-lg font-bold">{macros.fat}g</p>
            </div>
          </div>
        </div>

        <MealSuggestions 
            dailyCalories={dailyCalories}
            macros={macros}
            dietPreference={goal.dietPreference}
            goalType={goal.goalType}
            allergies={goal.allergies}
            dislikedFoods={goal.dislikedFoods}
            isLactoseIntolerant={goal.isLactoseIntolerant}
        />
      </CardContent>
    </Card>
  );
}
