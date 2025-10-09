
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

  // Generate workout routine based on activity level
  let routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [];
  
  if (goal.activityLevel === 'sedentary') {
    // 3 workout days for sedentary users
    routine = [
      { day: 'Monday', title: 'Light Full Body Strength', exercises: [
          { name: 'Bodyweight Squats', type: 'Strength', sets: '2-3', reps: '10-12' },
          { name: 'Push-ups (Modified)', type: 'Strength', sets: '2-3', reps: '5-8' },
          { name: 'Light Walk', type: 'Cardio', duration: '20-30 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Gentle Cardio', exercises: [{ name: 'Brisk Walking or Swimming', type: 'Cardio', duration: '25-35 min' }] },
      { day: 'Thursday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Friday', title: 'Light Full Body', exercises: [
          { name: 'Wall Push-ups', type: 'Strength', sets: '2-3', reps: '8-10' },
          { name: 'Chair Squats', type: 'Strength', sets: '2-3', reps: '10-12' },
          { name: 'Light Stretching', type: 'Flexibility', duration: '15-20 min' }
      ] },
      { day: 'Saturday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'light') {
    // 3-4 workout days for light activity users
    routine = [
      { day: 'Monday', title: 'Full Body Strength', exercises: [
          { name: 'Bodyweight Squats', type: 'Strength', sets: '3', reps: '12-15' },
          { name: 'Push-ups', type: 'Strength', sets: '3', reps: '8-12' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '10-12 per leg' },
          { name: 'Light Cardio', type: 'Cardio', duration: '20-25 min' }
      ] },
      { day: 'Tuesday', title: 'Cardio', exercises: [{ name: 'Brisk Walking or Cycling', type: 'Cardio', duration: '30-40 min' }] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Upper Body & Core', exercises: [
          { name: 'Modified Push-ups', type: 'Strength', sets: '3', reps: '10-15' },
          { name: 'Plank', type: 'Core', duration: '3 sets x 30-45s' },
          { name: 'Arm Circles', type: 'Strength', sets: '3', reps: '15-20' }
      ] },
      { day: 'Friday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Saturday', title: 'Lower Body & Cardio', exercises: [
          { name: 'Squats', type: 'Strength', sets: '3', reps: '12-15' },
          { name: 'Calf Raises', type: 'Strength', sets: '3', reps: '15-20' },
          { name: 'Light Jogging', type: 'Cardio', duration: '20-25 min' }
      ] },
      { day: 'Sunday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Light Walk', type: 'Flexibility', duration: '30-40 min' }] },
    ];
  } else if (goal.activityLevel === 'moderate') {
    // 4-5 workout days for moderate activity users
    routine = [
      { day: 'Monday', title: 'Full Body Strength', exercises: [
          { name: 'Full Body Strength Training', type: 'Strength', sets: '3-4', reps: '8-12', duration: '45-60 min' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Cardio & Core', exercises: [
          { name: 'Running or Cycling', type: 'Cardio', duration: '30-45 min' },
          { name: 'Core Workout', type: 'Core', duration: '10-15 min' }
      ] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Upper Body Strength', exercises: [
          { name: 'Push-ups Variations', type: 'Strength', sets: '3-4', reps: '10-15' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3-4', reps: '10-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Friday', title: 'HIIT & Lower Body', exercises: [
          { name: 'HIIT Workout', type: 'HIIT', duration: '20-25 min' },
          { name: 'Squats & Lunges', type: 'Strength', sets: '3', reps: '12-15' }
      ] },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Light Activity', type: 'Flexibility', duration: '30-45 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'active') {
    // 5-6 workout days for active users
    routine = [
      { day: 'Monday', title: 'Full Body Strength', exercises: [
          { name: 'Full Body Strength Training', type: 'Strength', sets: '4', reps: '8-12', duration: '60-75 min' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Cardio & HIIT', exercises: [
          { name: 'Running or Cycling', type: 'Cardio', duration: '45-60 min' },
          { name: 'HIIT Finisher', type: 'HIIT', duration: '10-15 min' }
      ] },
      { day: 'Wednesday', title: 'Upper Body Strength', exercises: [
          { name: 'Push-ups & Variations', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Pull-ups/Assisted Pull-ups', type: 'Strength', sets: '4', reps: '8-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '4', reps: '10-12' },
          { name: 'Core Circuit', type: 'Core', duration: '15-20 min' }
      ] },
      { day: 'Thursday', title: 'HIIT & Lower Body', exercises: [
          { name: 'HIIT Workout', type: 'HIIT', duration: '25-30 min' },
          { name: 'Squats & Lunges', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Deadlift Variations', type: 'Strength', sets: '3-4', reps: '8-12' }
      ] },
      { day: 'Friday', title: 'Full Body Circuit', exercises: [
          { name: 'Burpees', type: 'HIIT', duration: '4 sets of 45s' },
          { name: 'Kettlebell Swings', type: 'Strength', duration: '4 sets of 45s' },
          { name: 'Battle Ropes', type: 'HIIT', duration: '4 sets of 30s' },
          { name: 'Core Finisher', type: 'Core', duration: '10-15 min' }
      ] },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Yoga, Swimming, or Light Activity', type: 'Flexibility', duration: '45-60 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  }

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine,
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

  // Generate workout routine based on activity level
  let routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [];
  
  if (goal.activityLevel === 'sedentary') {
    // 3 workout days for sedentary users (beginner-friendly)
    routine = [
      { day: 'Monday', title: 'Full Body (Beginner)', exercises: [
          { name: 'Bodyweight Squats', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Wall Push-ups', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Assisted Pull-ups', type: 'Strength', sets: '3', reps: '5-8' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Upper Body (Light)', exercises: [
          { name: 'Dumbbell Press', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Bicep Curls', type: 'Strength', sets: '2', reps: '10-12' },
          { name: 'Light Stretching', type: 'Flexibility', duration: '10-15 min' }
      ] },
      { day: 'Friday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Saturday', title: 'Lower Body (Light)', exercises: [
          { name: 'Goblet Squats', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '8-10 per leg' },
          { name: 'Calf Raises', type: 'Strength', sets: '3', reps: '12-15' }
      ] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'light') {
    // 4 workout days for light activity users
    routine = [
      { day: 'Monday', title: 'Push Day', exercises: [
          { name: 'Bench Press', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Overhead Press', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Tricep Dips', type: 'Strength', sets: '3', reps: '8-12' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Pull Day', exercises: [
          { name: 'Pull-ups/Assisted Pull-ups', type: 'Strength', sets: '3', reps: '6-10' },
          { name: 'Bent-over Rows', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Bicep Curls', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Thursday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Friday', title: 'Leg Day', exercises: [
          { name: 'Squats', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Deadlifts', type: 'Strength', sets: '3', reps: '6-8' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '10-12 per leg' }
      ] },
      { day: 'Saturday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Sunday', title: 'Active Recovery', exercises: [{ name: 'Light Cardio & Stretching', type: 'Flexibility', duration: '30-40 min' }] },
    ];
  } else if (goal.activityLevel === 'moderate') {
    // 5 workout days for moderate activity users
    routine = [
      { day: 'Monday', title: 'Chest & Triceps', exercises: [
          { name: 'Bench Press', type: 'Strength', sets: '4', reps: '6-8' },
          { name: 'Incline Dumbbell Press', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Tricep Dips', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Skull Crushers', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Tuesday', title: 'Back & Biceps', exercises: [
          { name: 'Pull-ups', type: 'Strength', sets: '4', reps: '6-10' },
          { name: 'Bent-over Rows', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Bicep Curls', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Hammer Curls', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Leg Day', exercises: [
          { name: 'Squats', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Deadlifts', type: 'Strength', sets: '3', reps: '5' },
          { name: 'Leg Press', type: 'Strength', sets: '4', reps: '10-12' },
          { name: 'Calf Raises', type: 'Strength', sets: '4', reps: '15-20' }
      ] },
      { day: 'Friday', title: 'Shoulders & Core', exercises: [
          { name: 'Overhead Press', type: 'Strength', sets: '4', reps: '6-8' },
          { name: 'Lateral Raises', type: 'Strength', sets: '3', reps: '12-15' },
          { name: 'Planks', type: 'Core', duration: '3 sets x 60s' },
          { name: 'Leg Raises', type: 'Core', sets: '3', reps: '15-20' }
      ] },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Light Cardio & Stretching', type: 'Cardio', duration: '30-45 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'active') {
    // 6 workout days for active users
    routine = [
      { day: 'Monday', title: 'Chest & Triceps', exercises: [
          { name: 'Bench Press', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Incline Dumbbell Press', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Dips', type: 'Strength', sets: '4', reps: '8-12' },
          { name: 'Close-grip Bench Press', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Tricep Extensions', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Tuesday', title: 'Back & Biceps', exercises: [
          { name: 'Deadlifts', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Pull-ups', type: 'Strength', sets: '5', reps: '8-12' },
          { name: 'Bent-over Rows', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Barbell Curls', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Hammer Curls', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Wednesday', title: 'Legs', exercises: [
          { name: 'Squats', type: 'Strength', sets: '6', reps: '5' },
          { name: 'Romanian Deadlifts', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Bulgarian Split Squats', type: 'Strength', sets: '3', reps: '10-12 per leg' },
          { name: 'Leg Press', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Calf Raises', type: 'Strength', sets: '5', reps: '15-20' }
      ] },
      { day: 'Thursday', title: 'Shoulders & Arms', exercises: [
          { name: 'Overhead Press', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Lateral Raises', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Rear Delt Flyes', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Preacher Curls', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Overhead Tricep Extension', type: 'Strength', sets: '4', reps: '8-10' }
      ] },
      { day: 'Friday', title: 'Full Body Power', exercises: [
          { name: 'Power Cleans', type: 'Strength', sets: '4', reps: '3-5' },
          { name: 'Box Jumps', type: 'Plyometric', sets: '4', reps: '5-8' },
          { name: 'Kettlebell Swings', type: 'Strength', sets: '4', reps: '15-20' },
          { name: 'Battle Ropes', type: 'HIIT', duration: '4 sets x 30s' }
      ] },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Light Cardio & Mobility', type: 'Flexibility', duration: '45-60 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  }

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine,
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

  // Generate workout routine based on activity level
  let routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [];
  
  if (goal.activityLevel === 'sedentary') {
    // 3 workout days for sedentary users
    routine = [
      { day: 'Monday', title: 'Light Full Body', exercises: [
          { name: 'Bodyweight Squats', type: 'Strength', sets: '2-3', reps: '10-12' },
          { name: 'Wall Push-ups', type: 'Strength', sets: '2-3', reps: '8-10' },
          { name: 'Light Walking', type: 'Cardio', duration: '20-25 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Gentle Cardio', exercises: [{ name: 'Brisk Walking or Swimming', type: 'Cardio', duration: '25-35 min' }] },
      { day: 'Friday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Saturday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'light') {
    // 3-4 workout days for light activity users
    routine = [
      { day: 'Monday', title: 'Upper Body Strength', exercises: [
          { name: 'Push-ups (Modified)', type: 'Strength', sets: '3', reps: '8-12' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '8-10' }
      ] },
      { day: 'Tuesday', title: 'Cardio', exercises: [{ name: 'Brisk Walking or Cycling', type: 'Cardio', duration: '30-40 min' }] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Lower Body Strength', exercises: [
          { name: 'Goblet Squats', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '8-10 per leg' },
          { name: 'Glute Bridges', type: 'Strength', sets: '3', reps: '12-15' }
      ] },
      { day: 'Friday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Light Activity', type: 'Flexibility', duration: '30-40 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'moderate') {
    // 4-5 workout days for moderate activity users
    routine = [
      { day: 'Monday', title: 'Upper Body Strength', exercises: [
          { name: 'Push-ups', type: 'Strength', sets: '3', reps: '10-15' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Cardio', exercises: [{ name: 'Jogging or Swimming', type: 'Cardio', duration: '30-45 min' }] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Lower Body Strength', exercises: [
          { name: 'Goblet Squats', type: 'Strength', sets: '3', reps: '12-15' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '10-12 per leg' },
          { name: 'Glute Bridges', type: 'Strength', sets: '3', reps: '15-20' }
      ] },
      { day: 'Friday', title: 'Active Recovery', exercises: [{ name: 'Stretching or Yoga', type: 'Flexibility', duration: '20-30 min' }] },
      { day: 'Saturday', title: 'Full Body Circuit', exercises: [
          { name: 'Burpees', type: 'HIIT', duration: '3 sets of 45s' },
          { name: 'Kettlebell Swings', type: 'Strength', duration: '3 sets of 45s' },
          { name: 'Plank', type: 'Core', duration: '3 sets, hold as long as possible' }
      ] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'active') {
    // 5-6 workout days for active users
    routine = [
      { day: 'Monday', title: 'Upper Body Strength', exercises: [
          { name: 'Push-ups Variations', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Pull-ups/Assisted Pull-ups', type: 'Strength', sets: '4', reps: '6-10' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '4', reps: '10-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '4', reps: '10-12' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Cardio & HIIT', exercises: [
          { name: 'Running or Swimming', type: 'Cardio', duration: '40-50 min' },
          { name: 'HIIT Finisher', type: 'HIIT', duration: '10-15 min' }
      ] },
      { day: 'Wednesday', title: 'Lower Body Strength', exercises: [
          { name: 'Squats', type: 'Strength', sets: '4', reps: '12-15' },
          { name: 'Lunges', type: 'Strength', sets: '4', reps: '12-15 per leg' },
          { name: 'Glute Bridges', type: 'Strength', sets: '4', reps: '15-20' },
          { name: 'Calf Raises', type: 'Strength', sets: '3', reps: '15-20' }
      ] },
      { day: 'Thursday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Mobility', type: 'Flexibility', duration: '30-45 min' }] },
      { day: 'Friday', title: 'Full Body Circuit', exercises: [
          { name: 'Burpees', type: 'HIIT', duration: '4 sets of 45s' },
          { name: 'Kettlebell Swings', type: 'Strength', duration: '4 sets of 45s' },
          { name: 'Battle Ropes', type: 'HIIT', duration: '4 sets of 30s' },
          { name: 'Plank', type: 'Core', duration: '4 sets, hold as long as possible' }
      ] },
      { day: 'Saturday', title: 'Recreational Activity', exercises: [{ name: 'Hiking, dancing, or sports', type: 'Cardio', duration: '60-90 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  }

  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine,
    createdAt: new Date(),
  };

  return { workoutPlan, nutritionPlan };
};


// Combined plan for multiple goals (e.g., Weight Loss + Muscle Building)
const generateCombinedPlan = (goal: Goal): { workoutPlan: WorkoutPlan, nutritionPlan: NutritionPlan } => {
  const bmr = calculateBMR(goal);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[goal.activityLevel];
  
  const goals = goal.goalType;
  const hasWeightLoss = goals.includes('weight-loss');
  const hasMuscleBuilding = goals.includes('weightlifting');
  const hasFitness = goals.includes('fitness');
  
  // Nutrition: Balance between goals
  let calorieTarget = tdee;
  let proteinRatio = 0.25;
  let carbsRatio = 0.5;
  let fatRatio = 0.25;
  
  if (hasWeightLoss && hasMuscleBuilding) {
    // Body recomposition: Slight deficit with high protein
    calorieTarget = tdee - 250; // Smaller deficit for muscle preservation
    proteinRatio = 0.35; // Higher protein for muscle building
    carbsRatio = 0.35;
    fatRatio = 0.3;
  } else if (hasWeightLoss && hasFitness) {
    // Weight loss with general fitness
    calorieTarget = tdee - 400;
    proteinRatio = 0.3;
    carbsRatio = 0.4;
    fatRatio = 0.3;
  } else if (hasMuscleBuilding && hasFitness) {
    // Muscle building with endurance
    calorieTarget = tdee + 200;
    proteinRatio = 0.3;
    carbsRatio = 0.45;
    fatRatio = 0.25;
  }
  
  const nutritionPlan: NutritionPlan = {
    id: `nut_${goal.id}`,
    goalId: goal.id,
    dailyCalories: Math.round(calorieTarget),
    macros: {
      protein: Math.round((calorieTarget * proteinRatio) / 4),
      carbs: Math.round((calorieTarget * carbsRatio) / 4),
      fat: Math.round((calorieTarget * fatRatio) / 9),
    },
    mealPlan: [
      { meal: 'Breakfast', items: ['High-protein oatmeal with Greek yogurt and berries'] },
      { meal: 'Lunch', items: ['Grilled chicken with quinoa and roasted vegetables'] },
      { meal: 'Dinner', items: ['Lean salmon with sweet potato and broccoli'] },
      { meal: 'Snack', items: ['Protein shake or mixed nuts'] },
    ],
  };
  
  // Workout: Combine cardio and strength based on activity level
  let routine: { day: string; title: string; exercises: Exercise[]; isRestDay?: boolean }[] = [];
  
  if (goal.activityLevel === 'sedentary') {
    routine = [
      { day: 'Monday', title: 'Full Body Strength', exercises: [
          { name: 'Squats', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Push-ups', type: 'Strength', sets: '3', reps: '8-10' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Cardio & Core', exercises: [
          { name: 'Brisk Walking', type: 'Cardio', duration: '25-30 min' },
          { name: 'Plank', type: 'Core', duration: '3 sets x 30-45s' },
          { name: 'Crunches', type: 'Core', sets: '3', reps: '12-15' }
      ] },
      { day: 'Thursday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Friday', title: 'Upper Body & Cardio', exercises: [
          { name: 'Dumbbell Press', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Bicep Curls', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Light Jogging', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Saturday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'light') {
    routine = [
      { day: 'Monday', title: 'Strength & Cardio', exercises: [
          { name: 'Squats', type: 'Strength', sets: '3', reps: '12-15' },
          { name: 'Push-ups', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Running', type: 'Cardio', duration: '20-25 min' }
      ] },
      { day: 'Tuesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Wednesday', title: 'Full Body Circuit', exercises: [
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '12-15 per leg' },
          { name: 'Dumbbell Rows', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Burpees', type: 'HIIT', duration: '3 sets of 30s' }
      ] },
      { day: 'Thursday', title: 'Cardio Day', exercises: [
          { name: 'Cycling or Swimming', type: 'Cardio', duration: '30-35 min' }
      ] },
      { day: 'Friday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Saturday', title: 'Total Body', exercises: [
          { name: 'Deadlifts (Light)', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Core Circuit', type: 'Core', duration: '10-15 min' }
      ] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  } else if (goal.activityLevel === 'moderate') {
    routine = [
      { day: 'Monday', title: 'Upper Body Strength', exercises: [
          { name: 'Bench Press', type: 'Strength', sets: '4', reps: '8-10' },
          { name: 'Pull-ups', type: 'Strength', sets: '3', reps: '6-10' },
          { name: 'Shoulder Press', type: 'Strength', sets: '3', reps: '10-12' },
          { name: 'Light Cardio', type: 'Cardio', duration: '15-20 min' }
      ] },
      { day: 'Tuesday', title: 'HIIT Cardio', exercises: [
          { name: 'HIIT Intervals', type: 'HIIT', duration: '25-30 min' },
          { name: 'Core Work', type: 'Core', duration: '10 min' }
      ] },
      { day: 'Wednesday', title: 'Rest Day', exercises: [], isRestDay: true },
      { day: 'Thursday', title: 'Lower Body Strength', exercises: [
          { name: 'Squats', type: 'Strength', sets: '4', reps: '8-12' },
          { name: 'Deadlifts', type: 'Strength', sets: '3', reps: '6-8' },
          { name: 'Lunges', type: 'Strength', sets: '3', reps: '12-15 per leg' }
      ] },
      { day: 'Friday', title: 'Cardio & Core', exercises: [
          { name: 'Running or Cycling', type: 'Cardio', duration: '30-40 min' },
          { name: 'Ab Circuit', type: 'Core', duration: '15 min' }
      ] },
      { day: 'Saturday', title: 'Full Body Circuit', exercises: [
          { name: 'Kettlebell Swings', type: 'Strength', duration: '3 sets of 45s' },
          { name: 'Burpees', type: 'HIIT', duration: '3 sets of 45s' },
          { name: 'Plank Variations', type: 'Core', duration: '3 sets of 60s' }
      ] },
      { day: 'Sunday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Light Walk', type: 'Flexibility', duration: '30-45 min' }] },
    ];
  } else if (goal.activityLevel === 'active') {
    routine = [
      { day: 'Monday', title: 'Upper Body Strength', exercises: [
          { name: 'Bench Press', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Pull-ups', type: 'Strength', sets: '4', reps: '8-12' },
          { name: 'Overhead Press', type: 'Strength', sets: '4', reps: '6-8' },
          { name: 'Bicep & Tricep Superset', type: 'Strength', sets: '3', reps: '10-12' }
      ] },
      { day: 'Tuesday', title: 'HIIT & Cardio', exercises: [
          { name: 'Sprint Intervals', type: 'HIIT', duration: '25-30 min' },
          { name: 'Battle Ropes', type: 'HIIT', duration: '3 sets of 45s' },
          { name: 'Core Finisher', type: 'Core', duration: '10-15 min' }
      ] },
      { day: 'Wednesday', title: 'Lower Body Strength', exercises: [
          { name: 'Squats', type: 'Strength', sets: '5', reps: '5' },
          { name: 'Deadlifts', type: 'Strength', sets: '4', reps: '6-8' },
          { name: 'Leg Press', type: 'Strength', sets: '4', reps: '10-12' },
          { name: 'Calf Raises', type: 'Strength', sets: '4', reps: '15-20' }
      ] },
      { day: 'Thursday', title: 'Cardio Endurance', exercises: [
          { name: 'Running or Cycling', type: 'Cardio', duration: '40-50 min' }
      ] },
      { day: 'Friday', title: 'Full Body Power', exercises: [
          { name: 'Power Cleans', type: 'Strength', sets: '4', reps: '3-5' },
          { name: 'Box Jumps', type: 'Plyometric', sets: '4', reps: '5-8' },
          { name: 'Burpees', type: 'HIIT', duration: '4 sets of 60s' },
          { name: 'Core Circuit', type: 'Core', duration: '15 min' }
      ] },
      { day: 'Saturday', title: 'Active Recovery', exercises: [{ name: 'Yoga or Swimming', type: 'Flexibility', duration: '45-60 min' }] },
      { day: 'Sunday', title: 'Rest Day', exercises: [], isRestDay: true },
    ];
  }
  
  const workoutPlan: WorkoutPlan = {
    id: `wp_${goal.id}`,
    goalId: goal.id,
    routine: routine,
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
  const goals = goal.goalType;
  
  // Check if user has multiple goals
  if (goals.length > 1) {
    plans = generateCombinedPlan(goal);
  } else {
    // Single goal logic
    const singleGoal = goals[0];
    if (singleGoal === 'weight-loss') {
      plans = generateWeightLossPlan(goal);
    } else if (singleGoal === 'weightlifting') {
      plans = generateWeightliftingPlan(goal);
    } else {
      plans = generateGeneralFitnessPlan(goal);
    }
  }

  return {
    goal,
    ...plans,
    dailyCheckIns: [],
  };
};
