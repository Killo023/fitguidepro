
'use client';

import type { FitnessPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressTracker from '@/components/progress-tracker';
import WorkoutPlan from '@/components/workout-plan';
import NutritionPlan from '@/components/nutrition-plan';
import { ArrowLeft } from 'lucide-react';
import DailyCheckin from './daily-checkin';

interface DashboardProps {
  plan: FitnessPlan;
  onReset: () => void;
  setPlan: (plan: FitnessPlan) => void;
}

export default function Dashboard({ plan, onReset, setPlan }: DashboardProps) {
    const { goal } = plan;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h2 className="text-4xl font-headline font-bold tracking-tight uppercase">Your Dashboard</h2>
            <p className="text-muted-foreground mt-2">Your personalized fitness journey awaits.</p>
        </div>
        <Button variant="outline" onClick={onReset}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Start a New Plan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
            <DailyCheckin plan={plan} setPlan={setPlan} />
        </div>

        <div className="lg:col-span-3">
          <ProgressTracker plan={plan} setPlan={setPlan} />
        </div>
        
        <div className="lg:col-span-2">
            <WorkoutPlan workoutPlan={plan.workoutPlan} />
        </div>

        <div className="lg:col-span-1">
            <NutritionPlan 
              nutritionPlan={plan.nutritionPlan} 
              goal={goal}
            />
        </div>
      </div>
    </div>
  );
}
