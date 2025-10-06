
import type { Goal, WorkoutPlan, NutritionPlan, FitnessPlan, Exercise } from '@/types';

export const calculateBMI = (weightInKg: number, heightInCm: number): number => {
  if (heightInCm <= 0) return 0;
  const heightInMeters = heightInCm / 100;
  return parseFloat((weightInKg / (heightInMeters * heightInMeters)).toFixed(1));
};

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
};

const calculateBMR = (goal: Goal): number => {
  if (goal.gender === 'male') {
    return 10 * goal.currentWeight + 6.25 * goal.height - 5 * goal.age + 5;
  } else {
    return 10 * goal.currentWeight + 6.25 * goal.height - 5 * goal.age - 161;
  }
};


const generateWeightLossPlan = (goal: Goal): { workoutPlan: WorkoutPlan, nutritionPlan: NutritionPlan } => {
  const bmr = calculateBMR(goal);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[goal.activityLevel];
  const calorieTarget = tdee - 500;

  const nutritionPlan: NutritionPlan = {
    id: `nut_${goal.id}`,
    goalId: goal.id,
    dailyCalories: Math.round(calorieTarget),
    macros: {
      protein: Math.round((calorieTarget * 0.3) / 4),
      carbs: Math.round((calorieTarget * 0.4) / 4),
      fat: Math.round((calorieTarget * 0.3) / 9),
    },
    mealPlan: [
      { meal: 'Breakfast', items: ['Oatmeal with fruits'] },
      { meal: 'Lunch', items: ['Grilled Chicken Salad'] },
      { meal: 'Dinner', items: ['Salmon with Quinoa and steamed vegetables'] },
      { meal: 'Snack', items: ['Greek Yogurt'] },
    ],
  };

  const routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [
    { day: 'Monday', title: 'Full Body Strength & Cardio', exercises: [
        { name: 'Full Body Strength Training', type: 'Strength', sets: '3-4', reps: '8-12', duration: '45-60 min' },
        { name: 'Brisk Walk', type: 'Cardio', duration: '30 min' }
    ] },
    { day: 'Tuesday', title: 'Cardio', exercises: [{ name: 'Running or Cycling', type: 'Cardio', duration: '30-45 min' }] },
    { day: 'Wednesday', title: 'Full Body Strength', exercises: [{ name: 'Full Body Strength Training', type: 'Strength', sets: '3-4', reps: '8-12', duration: '45-60 min' }] },
    { day: 'Thursday', title: 'HIIT', exercises: [{ name: 'HIIT Workout', type: 'HIIT', duration: '20 min' }] },
    { day: 'Friday', title: 'Full Body Strength', exercises: [{ name: 'Full Body Strength Training', type: 'Strength', sets: '3-4', reps: '8-12', duration: '45-60 min' }] },
    { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Active Recovery (Yoga or Light Walk)', type: 'Flexibility', duration: '30-60 min' }] },
    { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
  ];

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine.slice(0, 7),
    createdAt: new Date(),
  };

  return { workoutPlan, nutritionPlan };
};

const generateWeightliftingPlan = (goal: Goal): { workoutPlan: WorkoutPlan, nutritionPlan: NutritionPlan } => {
  const bmr = calculateBMR(goal);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[goal.activityLevel];
  const calorieTarget = tdee + 300;

  const nutritionPlan: NutritionPlan = {
    id: `nut_${goal.id}`,
    goalId: goal.id,
    dailyCalories: Math.round(calorieTarget),
    macros: {
      protein: Math.round((calorieTarget * 0.35) / 4),
      carbs: Math.round((calorieTarget * 0.45) / 4),
      fat: Math.round((calorieTarget * 0.2) / 9),
    },
    mealPlan: [
        { meal: 'Breakfast', items: ['Scrambled Eggs with whole wheat toast'] },
        { meal: 'Post-Workout', items: ['Protein Shake'] },
        { meal: 'Lunch', items: ['Lean Beef with Brown Rice and broccoli'] },
        { meal: 'Dinner', items: ['Chicken Breast with sweet potatoes and asparagus'] },
        { meal: 'Snack', items: ['Cottage Cheese'] },
    ],
  };

  const routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [
    { day: 'Monday', title: 'Chest & Triceps', exercises: [
        { name: 'Bench Press', type: 'Strength', sets: '4', reps: '6-8' },
        { name: 'Incline Dumbbell Press', type: 'Strength', sets: '3', reps: '8-10' },
        { name: 'Tricep Dips', type: 'Strength', sets: '3', reps: '10-12' },
        { name: 'Skull Crushers', type: 'Strength', sets: '3', reps: '10-12' },
    ] },
    { day: 'Tuesday', title: 'Back & Biceps', exercises: [
        { name: 'Pull-ups', type: 'Strength', sets: '4', reps: 'As many as possible' },
        { name: 'Bent-over Rows', type: 'Strength', sets: '4', reps: '8-10' },
        { name: 'Bicep Curls', type: 'Strength', sets: '3', reps: '10-12' },
        { name: 'Hammer Curls', type: 'Strength', sets: '3', reps: '10-12' },
    ] },
    { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
    { day: 'Thursday', title: 'Leg Day', exercises: [
        { name: 'Squats', type: 'Strength', sets: '5', reps: '5' },
        { name: 'Deadlifts', type: 'Strength', sets: '3', reps: '5' },
        { name: 'Leg Press', type: 'Strength', sets: '4', reps: '10-12' },
        { name: 'Calf Raises', type: 'Strength', sets: '4', reps: '15-20' },
    ] },
    { day: 'Friday', title: 'Shoulders & Core', exercises: [
        { name: 'Overhead Press', type: 'Strength', sets: '4', reps: '6-8' },
        { name: 'Lateral Raises', type: 'Strength', sets: '3', reps: '12-15' },
        { name: 'Planks', type: 'Core', duration: '3 sets x 60s' },
        { name: 'Leg Raises', type: 'Core', sets: '3', reps: '15-20' },
    ] },
    { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Light Cardio & Stretching', type: 'Cardio', duration: '30-45 min' }] },
    { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
  ];

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine.slice(0, 7),
    createdAt: new Date(),
  };
  
  return { workoutPlan, nutritionPlan };
};

const generateGeneralFitnessPlan = (goal: Goal): { workoutPlan: WorkoutPlan, nutritionPlan: NutritionPlan } => {
  const bmr = calculateBMR(goal);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[goal.activityLevel];
  const calorieTarget = tdee; // Maintain weight

  const nutritionPlan: NutritionPlan = {
    id: `nut_${goal.id}`,
    goalId: goal.id,
    dailyCalories: Math.round(calorieTarget),
    macros: {
      protein: Math.round((calorieTarget * 0.25) / 4),
      carbs: Math.round((calorieTarget * 0.5) / 4),
      fat: Math.round((calorieTarget * 0.25) / 9),
    },
    mealPlan: [
        { meal: 'Breakfast', items: ['Greek yogurt with granola and berries'] },
        { meal: 'Lunch', items: ['Turkey and avocado wrap'] },
        { meal: 'Dinner', items: ['Stir-fry with mixed vegetables and tofu'] },
        { meal: 'Snack', items: ['Apple with peanut butter'] },
    ],
  };

  const routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [
    { day: 'Monday', title: 'Upper Body Strength', exercises: [
        { name: 'Push-ups', type: 'Strength', sets: '3', reps: '10-15' },
        { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '10-12' },
        { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '10-12' },
    ] },
    { day: 'Tuesday', title: 'Cardio', exercises: [{ name: 'Jogging or Swimming', type: 'Cardio', duration: '30-45 min' }] },
    { day: 'Wednesday', title: 'Lower Body Strength', exercises: [
        { name: 'Goblet Squats', type: 'Strength', sets: '3', reps: '12-15' },
        { name: 'Lunges', type: 'Strength', sets: '3', reps: '10-12 per leg' },
        { name: 'Glute Bridges', type: 'Strength', sets: '3', reps: '15-20' },
    ] },
    { day: 'Thursday', title: 'Active Recovery', exercises: [{ name: 'Stretching or Yoga', type: 'Flexibility', duration: '20-30 min' }] },
    { day: 'Friday', title: 'Full Body Circuit', exercises: [
        { name: 'Burpees', type: 'HIIT', duration: '3 sets of 45s' },
        { name: 'Kettlebell Swings', type: 'Strength', duration: '3 sets of 45s' },
        { name: 'Plank', type: 'Core', duration: '3 sets, hold as long as possible' },
    ] },
    { day: 'Saturday', title: 'Recreational Activity', exercises: [{ name: 'Hiking, dancing, or sports', type: 'Cardio', duration: '60 min' }] },
    { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
  ];

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine.slice(0, 7),
    createdAt: new Date(),
  };

  return { workoutPlan, nutritionPlan };
};


export const generateFitnessPlan = (formData: any): FitnessPlan => {
  const goalId = `goal_${formData.userId}_${new Date().getTime()}`;
  const bmi = calculateBMI(formData.currentWeight, formData.height);

  const goal: Goal = {
    ...formData,
    id: goalId,
    startDate: new Date(),
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    bmi,
    progress: [{ date: new Date(), weight: formData.currentWeight }],
  };

  let plans;
  if (goal.goalType === 'weight-loss') {
    plans = generateWeightLossPlan(goal);
  } else if (goal.goalType === 'weightlifting') {
    plans = generateWeightliftingPlan(goal);
  } else {
    plans = generateGeneralFitnessPlan(goal);
  }

  return {
    goal,
    ...plans,
    dailyCheckIns: [],
  };
};
