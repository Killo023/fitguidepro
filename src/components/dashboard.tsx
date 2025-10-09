
'use client';

import type { FitnessPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressTracker from '@/components/progress-tracker';
import WorkoutPlan from '@/components/workout-plan';
import NutritionPlan from '@/components/nutrition-plan';
import { ArrowLeft, Calendar, Target, TrendingUp, Clock, Users, Plus } from 'lucide-react';
import DailyCheckin from './daily-checkin';
import { useState } from 'react';

interface DashboardProps {
  plan: FitnessPlan;
  onReset: () => void;
  setPlan: (plan: FitnessPlan) => void;
}

export default function Dashboard({ plan, onReset, setPlan }: DashboardProps) {
    const { goal } = plan;
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate some quick stats
    const daysSinceStart = Math.ceil((new Date().getTime() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((new Date(goal.targetDate).getTime() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const progressPercentage = Math.min((daysSinceStart / totalDays) * 100, 100);
    
    const recentCheckIns = plan.dailyCheckIns?.slice(-7) || [];
    const workoutCompletion = recentCheckIns.filter(check => check.didWorkout === true).length;
    const dietAdherence = recentCheckIns.filter(check => check.followedDiet === true).length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight uppercase">
                Your Fitness Journey
              </h2>
              <p className="text-muted-foreground">
                {goal.goalType === 'weight-loss' ? 'Weight Loss' : 
                 goal.goalType === 'weightlifting' ? 'Muscle Building' : 'General Fitness'} • Day {daysSinceStart}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset} className="font-medium">
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
          <Button variant="outline" onClick={onReset} className="font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Active</p>
                <p className="text-xl font-bold">{daysSinceStart}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-xl font-bold">{progressPercentage.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Workouts</p>
                <p className="text-xl font-bold">{workoutCompletion}/7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diet Days</p>
                <p className="text-xl font-bold">{dietAdherence}/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList className="inline-flex w-max min-w-full h-auto p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <TabsTrigger 
              value="overview" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workout" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <Target className="w-5 h-5 flex-shrink-0" />
              <span>My Workouts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span>My Meal Plan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <span>My Progress</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              <span>My Plans</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[80px] h-auto data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:dark:text-gray-300 data-[state=inactive]:hover:bg-gray-200 data-[state=inactive]:dark:hover:bg-gray-700 transition-colors"
            >
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Progress
                </CardTitle>
                <CardDescription>Your fitness journey at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressTracker plan={plan} setPlan={setPlan} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  This Week's Focus
                </CardTitle>
                <CardDescription>Your current workout and nutrition plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Current Goal</h4>
                  <p className="text-sm text-muted-foreground">
                    {goal.goalType === 'weight-loss' ? 'Lose weight through cardio and strength training' :
                     goal.goalType === 'weightlifting' ? 'Build muscle with progressive strength training' :
                     'Improve overall fitness with balanced workouts'}
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Diet Preference</h4>
                  <p className="text-sm text-muted-foreground capitalize">{goal.dietPreference} diet</p>
                </div>
                <div className="p-4 bg-accent/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Daily Target</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.nutritionPlan.dailyCalories.toLocaleString()} calories • {plan.nutritionPlan.macros.protein}g protein
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>

        {/* Workout Tab */}
        <TabsContent value="workout" className="space-y-6">
          <WorkoutPlan workoutPlan={plan.workoutPlan} />
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>

        {/* Nutrition Tab */}
        <TabsContent value="nutrition" className="space-y-6">
          <NutritionPlan nutritionPlan={plan.nutritionPlan} goal={goal} />
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <ProgressTracker plan={plan} setPlan={setPlan} />
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>

        {/* My Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Fitness Plans
              </CardTitle>
              <CardDescription>All your created fitness plans and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {goal.goalType === 'weight-loss' ? 'Weight Loss Plan' :
                               goal.goalType === 'weightlifting' ? 'Muscle Building Plan' :
                               'General Fitness Plan'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Started {new Date(goal.startDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="text-center p-3 bg-background/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Goal Type</p>
                            <p className="font-semibold capitalize">{goal.goalType.replace('-', ' ')}</p>
                          </div>
                          <div className="text-center p-3 bg-background/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Current Weight</p>
                            <p className="font-semibold">
                              {goal.units === 'imperial' ? 
                                ((goal.currentWeight * 2.205).toFixed(1) + ' lbs') : 
                                (goal.currentWeight.toFixed(1) + ' kg')}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-background/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Target Weight</p>
                            <p className="font-semibold">
                              {goal.units === 'imperial' ? 
                                ((goal.targetWeight * 2.205).toFixed(1) + ' lbs') : 
                                (goal.targetWeight.toFixed(1) + ' kg')}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-background/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">Progress</p>
                            <p className="font-semibold text-primary">{progressPercentage.toFixed(0)}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={onReset}>
                          Create New Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-muted-foreground/25">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                      <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Create Another Plan</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a new fitness journey with different goals
                    </p>
                    <Button onClick={onReset} className="font-medium">
                      <Plus className="mr-2 h-4 w-4" />
                      New Fitness Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Settings</CardTitle>
              <CardDescription>Manage your current fitness plan settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Goal Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Goal Type</span>
                      <span className="font-medium capitalize">{goal.goalType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Diet Preference</span>
                      <span className="font-medium capitalize">{goal.dietPreference}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Activity Level</span>
                      <span className="font-medium capitalize">{goal.activityLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Personal Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Age</span>
                      <span className="font-medium">{goal.age} years</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">Height</span>
                      <span className="font-medium">
                        {goal.units === 'imperial' ? 
                          `${Math.floor(goal.height / 30.48)}'${Math.floor((goal.height % 30.48) / 2.54)}"` : 
                          `${goal.height} cm`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm">BMI</span>
                      <span className="font-medium">{goal.bmi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onReset}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Plan
                  </Button>
                  <Button variant="destructive" onClick={onReset}>
                    Reset Current Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Check-in at bottom */}
          <DailyCheckin plan={plan} setPlan={setPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
