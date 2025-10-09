
'use client';

import type { FitnessPlan } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressChart from '@/components/progress-chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Target, Weight, TrendingUp, CalendarDays } from 'lucide-react';
import { kgToLbs, lbsToKg } from '@/lib/utils';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';


interface ProgressTrackerProps {
  plan: FitnessPlan;
  setPlan: (plan: FitnessPlan) => void;
}

const formSchema = z.object({
  newWeight: z.coerce.number().positive('Please enter a valid weight'),
});

export default function ProgressTracker({ plan, setPlan }: ProgressTrackerProps) {
  const { goal } = plan;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        newWeight: '' as any,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    let newWeightInKg = data.newWeight;
    if (goal.units === 'imperial') {
        newWeightInKg = lbsToKg(data.newWeight);
    }

    const newProgressEntry = {
      date: new Date(),
      weight: newWeightInKg,
    };
    
    const updatedProgress = [...plan.goal.progress, newProgressEntry];
    updatedProgress.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const updatedPlan: FitnessPlan = {
        ...plan,
        goal: {
            ...plan.goal,
            currentWeight: newWeightInKg,
            progress: updatedProgress
        }
    };
    
    setPlan(updatedPlan);

    toast({
        title: 'Progress updated!',
        description: `Your new weight of ${data.newWeight}${weightUnit} has been logged.`,
    });
    
    form.reset({ newWeight: "" as any });
  };

  const weightUnit = goal.units === 'metric' ? 'kg' : 'lbs';
  
  const displayCurrentWeight = goal.units === 'imperial' ? kgToLbs(goal.currentWeight) : goal.currentWeight;
  const displayTargetWeight = goal.units === 'imperial' ? kgToLbs(goal.targetWeight) : goal.targetWeight;

  const weightDifference = (displayCurrentWeight - displayTargetWeight).toFixed(1);
  const isLosing = Array.isArray(goal.goalType) 
    ? goal.goalType.includes('weight-loss') 
    : goal.goalType === 'weight-loss';

  return (
    <Card>
        <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Visualize your journey and log your progress.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center justify-center">
                    <CalendarDays className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-lg font-bold">{new Date(goal.startDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center justify-center">
                    <Weight className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-lg font-bold">{displayCurrentWeight.toFixed(1)} {weightUnit}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center justify-center">
                    <Target className="w-6 h-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Target</p>
                    <p className="text-lg font-bold">{displayTargetWeight.toFixed(1)} {weightUnit}</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/20 text-accent-foreground flex flex-col items-center justify-center">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <p className="text-sm">To {isLosing ? "Lose" : "Gain"}</p>
                    <p className="text-lg font-bold">{Math.abs(parseFloat(weightDifference)).toFixed(1)} {weightUnit}</p>
                </div>
            </div>

            <div className="h-64 md:h-80 rounded-lg border bg-background/30 p-4 relative overflow-hidden">
                <Image
                    src={placeholderImages.progress}
                    alt="Woman stretching"
                    data-ai-hint="progress stretching"
                    fill
                    className="object-cover object-center absolute inset-0 z-0 opacity-20"
                />
                <div className="relative z-10 h-full w-full">
                    <ProgressChart data={goal.progress} targetWeight={goal.targetWeight} units={goal.units} />
                </div>
            </div>
            
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4 p-4 border rounded-lg bg-background/30">
                <FormField
                control={form.control}
                name="newWeight"
                render={({ field }) => (
                    <FormItem className="flex-grow w-full">
                    <FormLabel>Log Today's Weight ({weightUnit})</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.1" placeholder={`Enter current weight`} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full md:w-auto">Log Weight</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
