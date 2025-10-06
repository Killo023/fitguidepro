
'use client';

import type { WorkoutPlan as WorkoutPlanType } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Flame, HeartPulse, Zap, Clock, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface WorkoutPlanProps {
  workoutPlan: WorkoutPlanType;
}

const getIconForExercise = (type: string = '') => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('strength')) {
        return <Dumbbell className="h-5 w-5 text-primary" />;
    }
    if (lowerType.includes('cardio')) {
        return <HeartPulse className="h-5 w-5 text-red-500" />;
    }
    if (lowerType.includes('hiit')) {
        return <Zap className="h-5 w-5 text-yellow-500" />;
    }
    return <Flame className="h-5 w-5 text-orange-500" />;
}

const workoutImages = [
    { src: placeholderImages.workout1, alt: 'Man lifting weights', hint: 'weight lifting' },
    { src: placeholderImages.workout2, alt: 'Woman running on a treadmill', hint: 'cardio running' },
    { src: placeholderImages.workout3, alt: 'Woman doing yoga', hint: 'yoga stretching' }
]

export default function WorkoutPlan({ workoutPlan }: WorkoutPlanProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Weekly Workout Plan</CardTitle>
        <CardDescription>Follow this routine to stay on track with your goals.</CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full mb-6" opts={{loop: true}}>
            <CarouselContent>
                {workoutImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative h-48 md:h-64">
                            <Image 
                                src={image.src}
                                alt={image.alt}
                                data-ai-hint={image.hint}
                                fill
                                className="rounded-lg object-cover"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
        </Carousel>

        <div className="space-y-4">
          {workoutPlan.routine.map((day, index) => (
            <div key={index} className={cn(
                "p-4 rounded-lg border flex items-start gap-4 transition-all",
                day.isRestDay ? "bg-secondary/50" : "bg-background"
            )}>
              <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg",
                  day.isRestDay ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
              )}>
                {day.day.substring(0, 3)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{day.day}</p>
                    <Badge variant={day.isRestDay ? "secondary" : "default"}>{day.title}</Badge>
                </div>
                {day.isRestDay ? (
                  <p className="text-muted-foreground mt-1">Rest Day - recover and recharge!</p>
                ) : (
                  <ul className="mt-2 space-y-3">
                    {day.exercises.map((exercise, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="mt-1">{getIconForExercise(exercise.type)}</div>
                        <div className='flex-grow'>
                            <span className="font-semibold">{exercise.name}</span>
                            <div className="flex items-center gap-4 text-muted-foreground text-xs mt-1">
                                {exercise.sets && exercise.reps && (
                                    <div className="flex items-center gap-1">
                                        <Repeat className="h-3 w-3" />
                                        <span>{exercise.sets} sets x {exercise.reps} reps</span>
                                    </div>
                                )}
                                {exercise.duration && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{exercise.duration}</span>
                                    </div>
                                )}
                                {exercise.type && <Badge variant="outline" className="text-xs">{exercise.type}</Badge>}
                            </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
