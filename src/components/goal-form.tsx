
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateBMI } from '@/lib/fitness';
import { useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { inchesToCm, lbsToKg } from '@/lib/utils';


const formSchema = z.object({
  goalType: z.array(z.enum(['weight-loss', 'weightlifting', 'fitness'])).min(1, 'Select at least one goal').max(2, 'Select maximum 2 goals'),
  gender: z.enum(['male', 'female']),
  currentWeight: z.coerce.number().positive('Must be positive'),
  targetWeight: z.coerce.number().positive('Must be positive'),
  height: z.coerce.number().positive('Must be positive'),
  age: z.coerce.number().positive('Must be positive').min(16, 'Must be at least 16'),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active']),
  dietPreference: z.enum(['balanced', 'vegetarian', 'vegan', 'keto', 'paleo']),
  allergies: z.string().optional(),
  dislikedFoods: z.string().optional(),
  isLactoseIntolerant: z.boolean().default(false),
  units: z.enum(['metric', 'imperial']).default('metric'),
});

type GoalFormValues = z.infer<typeof formSchema>;

interface GoalFormProps {
  onPlanGenerated: (data: GoalFormValues) => void;
}

export default function GoalForm({ onPlanGenerated }: GoalFormProps) {
    const [bmi, setBmi] = useState<number | null>(null);
    const [defaultUnits, setDefaultUnits] = useState<'metric' | 'imperial'>('metric');

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userLocale = navigator.language;
            if (userLocale === 'en-US') {
                setDefaultUnits('imperial');
            } else {
                setDefaultUnits('metric');
            }
        }
    }, []);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(formSchema),
    values: {
        goalType: ['weight-loss'],
        gender: 'male',
        currentWeight: defaultUnits === 'metric' ? 70 : 155,
        targetWeight: defaultUnits === 'metric' ? 65 : 145,
        height: defaultUnits === 'metric' ? 175 : 69,
        age: 30,
        activityLevel: 'moderate',
        dietPreference: 'balanced',
        allergies: '',
        dislikedFoods: '',
        isLactoseIntolerant: false,
        units: defaultUnits,
    },
  });
  
  useEffect(() => {
    form.reset({
        goalType: ['weight-loss'],
        gender: 'male',
        currentWeight: defaultUnits === 'metric' ? 70 : 155,
        targetWeight: defaultUnits === 'metric' ? 65 : 145,
        height: defaultUnits === 'metric' ? 175 : 69,
        age: 30,
        activityLevel: 'moderate',
        dietPreference: 'balanced',
        allergies: '',
        dislikedFoods: '',
        isLactoseIntolerant: false,
        units: defaultUnits,
    });
  }, [defaultUnits, form])

  const watchUnits = form.watch('units');
  const watchWeight = form.watch('currentWeight');
  const watchHeight = form.watch('height');

  const handleCalculateBmi = () => {
    let weightInKg = form.getValues('currentWeight');
    let heightInCm = form.getValues('height');
    const units = form.getValues('units');

    if (units === 'imperial') {
        weightInKg = lbsToKg(weightInKg);
        heightInCm = inchesToCm(heightInCm);
    }
    
    if (weightInKg > 0 && heightInCm > 0) {
      const calculatedBmi = calculateBMI(weightInKg, heightInCm);
      setBmi(calculatedBmi);
    }
  }

  function onSubmit(data: GoalFormValues) {
    let submissionData = { ...data };
    if (data.units === 'imperial') {
        submissionData.currentWeight = lbsToKg(data.currentWeight);
        submissionData.targetWeight = lbsToKg(data.targetWeight);
        submissionData.height = inchesToCm(data.height);
    }
    onPlanGenerated(submissionData);
  }

  const weightUnit = watchUnits === 'metric' ? 'kg' : 'lbs';
  const heightUnit = watchUnits === 'metric' ? 'cm' : 'in';

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
            <Card className="mx-auto w-full max-w-xl border-0 md:border md:shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline uppercase tracking-wider">Set Your Goal</CardTitle>
                    <CardDescription>
                    Tell us about yourself and we'll create a personalized plan for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="units"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Unit System</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex items-center space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="metric" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Metric (kg, cm)</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="imperial" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Imperial (lbs, inches)</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="goalType"
                            render={() => (
                            <FormItem>
                                <div className="mb-4">
                                <FormLabel className="text-base">Fitness Goals (Select 1-2)</FormLabel>
                                <FormDescription>
                                    Choose up to 2 goals for a combined plan
                                </FormDescription>
                                </div>
                                {[
                                { id: 'weight-loss', label: 'Weight Loss' },
                                { id: 'weightlifting', label: 'Muscle Building' },
                                { id: 'fitness', label: 'General Fitness' },
                                ].map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="goalType"
                                    render={({ field }) => {
                                    return (
                                        <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                        <FormControl>
                                            <Checkbox
                                            checked={field.value?.includes(item.id as any)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value: string) => value !== item.id
                                                    )
                                                    )
                                            }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item.label}
                                        </FormLabel>
                                        </FormItem>
                                    )
                                    }}
                                />
                                ))}
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="currentWeight"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Weight ({weightUnit})</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder={watchUnits === 'metric' ? '70' : '155'} {...field} onChange={(e) => {field.onChange(e); handleCalculateBmi()}}/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="targetWeight"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Target ({weightUnit})</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder={watchUnits === 'metric' ? '65' : '145'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="height"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Height ({heightUnit})</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder={watchUnits === 'metric' ? '175' : '69'} {...field} onChange={(e) => {field.onChange(e); handleCalculateBmi()}}/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="30" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {watchWeight > 0 && watchHeight > 0 && bmi !== null && (
                            <FormDescription>
                                Your estimated BMI is {bmi}.
                            </FormDescription>
                        )}

                        <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Activity Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your activity level" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                                <SelectItem value="light">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                                <SelectItem value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                                <SelectItem value="active">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <Card className='p-4 md:p-6 bg-background/50 border'>
                            <div className="space-y-6">
                                <CardHeader className='p-0'>
                                    <CardTitle className="text-xl font-headline uppercase tracking-wider">Dietary Needs</CardTitle>
                                    <CardDescription>
                                        Help us tailor the perfect meal plan.
                                    </CardDescription>
                                </CardHeader>
                                
                                <FormField
                                control={form.control}
                                name="dietPreference"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Diet Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your diet preference" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="balanced">Balanced</SelectItem>
                                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                        <SelectItem value="vegan">Vegan</SelectItem>
                                        <SelectItem value="keto">Keto</SelectItem>
                                        <SelectItem value="paleo">Paleo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="allergies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allergies</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., Peanuts, Shellfish" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dislikedFoods"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Disliked Foods</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="e.g., Mushrooms, Olives" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="isLactoseIntolerant"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-background">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Are you lactose intolerant?
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </Card>

                        <Button type="submit" size="lg" className="w-full uppercase tracking-wider text-lg font-headline">
                        Generate My Plan
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="hidden bg-muted lg:block relative">
            <Image
              data-ai-hint="workout planning"
              src={placeholderImages.goal}
              alt="Image"
              fill
              className="h-full w-full object-cover dark:brightness-[0.3]"
            />
        </div>
    </div>
  );
}
