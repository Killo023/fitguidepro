
export interface ProgressEntry {
  date: Date;
  weight: number;
}

export interface DailyCheckIn {
  date: Date;
  didWorkout: boolean | null;
  workoutReason: string;
  followedDiet: boolean | null;
  dietReason: string;
}

export interface Goal {
  id: string;
  userId: string;
  goalType: ('weight-loss' | 'weightlifting' | 'fitness')[];
  gender: 'male' | 'female';
  startDate: Date;
  targetDate: Date;
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  bmi: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  dietPreference: 'vegetarian' | 'keto' | 'balanced' | 'vegan' | 'paleo';
  allergies: string;
  dislikedFoods: string;
  isLactoseIntolerant: boolean;
  progress: ProgressEntry[];
  units: 'metric' | 'imperial';
}

export interface Exercise {
  name: string;
  type?: string;
  sets?: string;
  reps?: string;
  duration?: string;
}

export interface WorkoutPlan {
  id: string;
  goalId: string;
  routine: {
    day: string;
    title: string;
    exercises: Exercise[];
    isRestDay?: boolean;
  }[];
  createdAt: Date;
}

export interface NutritionPlan {
  id:string;
  goalId: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  mealPlan: { meal: string; items: string[] }[];
}

export interface FitnessPlan {
  goal: Goal;
  workoutPlan: WorkoutPlan;
  nutritionPlan: NutritionPlan;
  dailyCheckIns: DailyCheckIn[];
}
