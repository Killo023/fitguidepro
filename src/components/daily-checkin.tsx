
'use client';

import { useState, useEffect } from 'react';
import type { FitnessPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dumbbell, UtensilsCrossed, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DailyCheckinProps {
  plan: FitnessPlan;
  setPlan: (plan: FitnessPlan) => void;
}

export default function DailyCheckin({ plan, setPlan }: DailyCheckinProps) {
  const { toast } = useToast();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysLog = plan.dailyCheckIns?.find(
    (log) => new Date(log.date).setHours(0,0,0,0) === today.getTime()
  );

  const [didWorkout, setDidWorkout] = useState<boolean | null>(todaysLog?.didWorkout ?? null);
  const [workoutReason, setWorkoutReason] = useState(todaysLog?.workoutReason ?? '');
  const [followedDiet, setFollowedDiet] = useState<boolean | null>(todaysLog?.followedDiet ?? null);
  const [dietReason, setDietReason] = useState(todaysLog?.dietReason ?? '');
  const [isSaved, setIsSaved] = useState(!!todaysLog);

  useEffect(() => {
    const todaysLog = plan.dailyCheckIns?.find(
        (log) => new Date(log.date).setHours(0,0,0,0) === today.getTime()
    );
    setDidWorkout(todaysLog?.didWorkout ?? null);
    setWorkoutReason(todaysLog?.workoutReason ?? '');
    setFollowedDiet(todaysLog?.followedDiet ?? null);
    setDietReason(todaysLog?.dietReason ?? '');
    setIsSaved(!!todaysLog);
  }, [plan.dailyCheckIns, today.getTime()]);


  const handleSave = () => {
    if (didWorkout === null || followedDiet === null) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Form',
        description: 'Please select "Yes" or "No" for both workout and diet.',
      });
      return;
    }
    if (didWorkout === false && !workoutReason) {
      toast({
        variant: 'destructive',
        title: 'Reason Required',
        description: 'Please provide a reason for not working out.',
      });
      return;
    }
    if (followedDiet === false && !dietReason) {
      toast({
        variant: 'destructive',
        title: 'Reason Required',
        description: 'Please provide a reason for not following the diet.',
      });
      return;
    }

    const newCheckIn = {
      date: today,
      didWorkout,
      workoutReason,
      followedDiet,
      dietReason,
    };

    const existingCheckinIndex = plan.dailyCheckIns?.findIndex(
      (log) => new Date(log.date).setHours(0,0,0,0) === today.getTime()
    );

    let updatedCheckIns = [...(plan.dailyCheckIns || [])];

    if (existingCheckinIndex !== undefined && existingCheckinIndex > -1) {
      updatedCheckIns[existingCheckinIndex] = newCheckIn;
    } else {
      updatedCheckIns.push(newCheckIn);
    }
    
    setPlan({ ...plan, dailyCheckIns: updatedCheckIns });

    toast({
      title: 'Progress Logged!',
      description: "Today's check-in has been saved successfully.",
    });
    setIsSaved(true);
  };
  
  const todayFormatted = format(today, "eeee, MMMM do");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Check-in</CardTitle>
        <CardDescription>Log your adherence for {todayFormatted}. Consistency is key!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workout Check-in Tile */}
          <div className="p-4 border rounded-lg bg-background/50">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Workout</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Did you complete your scheduled workout today?</p>
            <div className="flex gap-2 mb-3">
              <Button
                variant={didWorkout === true ? 'default' : 'outline'}
                className={cn("flex-1", didWorkout === true && "border-primary ring-2 ring-primary/50")}
                onClick={() => setDidWorkout(true)}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Yes
              </Button>
              <Button
                variant={didWorkout === false ? 'destructive' : 'outline'}
                className="flex-1"
                onClick={() => setDidWorkout(false)}
              >
                <XCircle className="mr-2 h-4 w-4" /> No
              </Button>
            </div>
            {didWorkout === false && (
              <Textarea
                value={workoutReason}
                onChange={(e) => setWorkoutReason(e.target.value)}
                placeholder="What was the reason? (e.g., too busy, felt unwell)"
              />
            )}
          </div>

          {/* Diet Check-in Tile */}
          <div className="p-4 border rounded-lg bg-background/50">
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg">Diet</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Did you stick to your nutrition plan today?</p>
            <div className="flex gap-2 mb-3">
              <Button
                variant={followedDiet === true ? 'default' : 'outline'}
                className={cn("flex-1", followedDiet === true && "border-primary ring-2 ring-primary/50")}
                onClick={() => setFollowedDiet(true)}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Yes
              </Button>
              <Button
                variant={followedDiet === false ? 'destructive' : 'outline'}
                className="flex-1"
                onClick={() => setFollowedDiet(false)}
              >
                <XCircle className="mr-2 h-4 w-4" /> No
              </Button>
            </div>
            {followedDiet === false && (
              <Textarea
                value={dietReason}
                onChange={(e) => setDietReason(e.target.value)}
                placeholder="What happened? (e.g., social event, cravings)"
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaved}>
            {isSaved ? "Saved for Today" : "Save Today's Log"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
