
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { FitnessPlan } from '@/types';
import GoalForm from '@/components/goal-form';
import Dashboard from '@/components/dashboard';
import { generateFitnessPlan } from '@/lib/fitness';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import AuthPage from '@/components/auth-page';
import { Button } from '@/components/ui/button';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const contentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        const planRef = doc(db, 'fitnessPlans', currentUser.uid);
        try {
          const planSnap = await getDoc(planRef);
          if (planSnap.exists()) {
            const data = planSnap.data();
            // Convert Firestore Timestamps back to Dates
            const planWithDates: FitnessPlan = {
              ...data,
              goal: {
                ...data.goal,
                startDate: data.goal.startDate.toDate(),
                targetDate: data.goal.targetDate.toDate(),
                progress: data.goal.progress.map((p: any) => ({
                  ...p,
                  date: p.date.toDate(),
                })),
              },
               dailyCheckIns: (data.dailyCheckIns || []).map((c: any) => ({
                ...c,
                date: c.date.toDate(),
              })),
            } as FitnessPlan;
            setPlan(planWithDates);
          } else {
            setPlan(null);
          }
        } catch (error) {
          console.error("Error fetching fitness plan: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        setPlan(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePlanGenerated = async (formData: any) => {
    if (user) {
      setLoading(true);
      const newPlan = generateFitnessPlan({ ...formData, userId: user.uid });
      const planRef = doc(db, 'fitnessPlans', user.uid);
      await setDoc(planRef, newPlan);
      setPlan(newPlan);
      setLoading(false);
    }
  };
  
  const handleUpdatePlan = async (updatedPlan: FitnessPlan) => {
     if (user) {
      setPlan(updatedPlan);
      const planRef = doc(db, 'fitnessPlans', user.uid);
      await setDoc(planRef, updatedPlan, { merge: true });
    }
  }

  const handleReset = async () => {
    setPlan(null);
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  
  const handleSignOut = async () => {
    await auth.signOut();
  }
  
  const handleGetStarted = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className='text-muted-foreground'>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <AuthPage />;
    }

    if (plan) {
        return <Dashboard plan={plan} onReset={handleReset} setPlan={handleUpdatePlan} />;
    }

    return <GoalForm onPlanGenerated={handlePlanGenerated} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="FitGuide Pro Logo" 
              width={300} 
              height={90} 
              className="h-16 w-auto"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleGetStarted}>Sign In</Button>
            )}
             {(!user || !plan) && (
              <Button onClick={handleGetStarted} className="font-headline uppercase tracking-wider">
                  Get Started
              </Button>
             )}
          </div>
        </div>
      </header>

      <main className="w-full">
        {!user && !loading && (
          <>
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center text-center">
                <Image
                    data-ai-hint="fitness workout"
                    src={placeholderImages.hero}
                    alt="Person working out in modern gym with dumbbells and fitness equipment"
                    fill
                    className="object-cover object-center brightness-[0.3]"
                    priority
                />
                <div className="relative z-10 p-4 text-white max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-headline font-extrabold uppercase tracking-widest mb-4">
                        Chart Your Path to Fitness
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                        Stop guessing. Start achieving. FitGuide Pro is your AI-powered guide to personalized workout and nutrition plans that adapt to your unique goals.
                    </p>
                    <Button size="lg" onClick={handleGetStarted} className="mt-10 font-headline uppercase tracking-wider text-lg px-8 py-6">
                        Create Your Free Plan Now
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-wider mb-4">
                  Why Choose FitGuide Pro?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Transform your fitness journey with AI-powered personalization, diverse meal plans, and science-backed workout routines
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {/* Feature 1 */}
                <div className="relative group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={placeholderImages.personalTraining}
                      alt="Personal trainer helping client with weight training exercises"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">AI-Powered Personalization</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get workout and nutrition plans tailored to your body type, fitness level, dietary preferences, and goals. Our AI analyzes your progress and adapts your plan in real-time.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="relative group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={placeholderImages.mealPrep}
                      alt="Healthy meal prep containers with balanced nutrition and colorful vegetables"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">Culturally Diverse Meal Plans</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Never eat the same meal twice! Enjoy cuisine-themed meal plans from Mediterranean to Asian, Latin American to Middle Eastern, with detailed recipes and macro breakdowns.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="relative group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={placeholderImages.tracking}
                      alt="Fitness tracker showing workout progress and health metrics"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">Real-Time Progress Tracking</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Monitor your weight, BMI, workout completion, and diet adherence with interactive charts. Daily check-ins keep you accountable and motivated.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-secondary/20 py-20 md:py-28">
              <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-wider mb-4">
                    How It Works
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Your personalized fitness journey starts in just 3 simple steps
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {/* Step 1 */}
                  <div className="text-center">
                    <div className="relative h-72 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={placeholderImages.goal}
                        alt="Athlete setting fitness goals and planning workout routine"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                        1
                      </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-3">Set Your Goals</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tell us about your fitness goals, current stats, dietary preferences, and activity level. Whether it's weight loss, muscle gain, or general fitness, we've got you covered.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                    <div className="relative h-72 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={placeholderImages.strengthTraining}
                        alt="Person performing strength training with barbells in gym"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                        2
                      </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-3">Get Your Custom Plan</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Receive a personalized workout routine and weekly meal plans generated by our AI. Each plan is scientifically designed to help you reach your specific goals efficiently.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                    <div className="relative h-72 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={placeholderImages.progress}
                        alt="Fitness transformation showing before and after progress results"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                        3
                      </div>
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-3">Track & Achieve</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Log your daily workouts, meals, and weight. Watch your progress unfold with visual charts and celebrate milestones as you transform your body and lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Workout Types Section */}
            <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-wider mb-4">
                  Workout Plans for Every Goal
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From cardio to strength training, yoga to HIIT - we cover all types of workouts tailored to your fitness level
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative group overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={placeholderImages.strengthTraining}
                    alt="Strength training workout with dumbbells and weight lifting"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-headline font-bold">Strength Training</h3>
                      <p className="mt-2 text-sm">Build muscle and increase power</p>
                    </div>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={placeholderImages.cardio}
                    alt="Cardio workout running exercise for cardiovascular health"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-headline font-bold">Cardio</h3>
                      <p className="mt-2 text-sm">Boost endurance and burn calories</p>
                    </div>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={placeholderImages.yoga}
                    alt="Yoga practice for flexibility and mindfulness"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-headline font-bold">Yoga & Flexibility</h3>
                      <p className="mt-2 text-sm">Improve mobility and reduce stress</p>
                    </div>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={placeholderImages.workout3}
                    alt="HIIT high intensity interval training workout"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-headline font-bold">HIIT</h3>
                      <p className="mt-2 text-sm">Maximum results in minimum time</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Stats Section */}
            <section className="bg-primary/10 py-20">
              <div className="container mx-auto max-w-7xl px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-5xl md:text-6xl font-headline font-bold text-primary mb-2">100%</div>
                    <p className="text-lg font-medium">Personalized Plans</p>
                    <p className="text-sm text-muted-foreground mt-1">Tailored to your unique needs</p>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-headline font-bold text-primary mb-2">7</div>
                    <p className="text-lg font-medium">Cuisine Themes</p>
                    <p className="text-sm text-muted-foreground mt-1">Different meals every day</p>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-headline font-bold text-primary mb-2">24/7</div>
                    <p className="text-lg font-medium">AI Assistance</p>
                    <p className="text-sm text-muted-foreground mt-1">Always available support</p>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-headline font-bold text-primary mb-2">FREE</div>
                    <p className="text-lg font-medium">No Hidden Costs</p>
                    <p className="text-sm text-muted-foreground mt-1">Start your journey today</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Nutrition Section */}
            <section className="container mx-auto max-w-7xl px-4 py-20 md:py-28">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={placeholderImages.healthyFood}
                    alt="Variety of healthy nutritious foods including fruits vegetables and proteins"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-wider mb-6">
                    Diverse Nutrition Plans
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                    Say goodbye to boring meal prep! Our AI generates unique, culturally diverse meal plans for every day of the week.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                      <div>
                        <strong>7 Different Cuisines Weekly:</strong> Mediterranean, Asian, Latin American, Middle Eastern, European, Indian, and Fusion meals
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                      <div>
                        <strong>Macro-Balanced Recipes:</strong> Every meal includes detailed nutrition facts with calories, protein, carbs, and fat
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                      <div>
                        <strong>Dietary Preferences:</strong> Supports vegan, vegetarian, keto, paleo, balanced, and custom diet plans
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                      <div>
                        <strong>Allergy-Friendly:</strong> Automatically excludes foods you're allergic to or dislike
                      </div>
                    </li>
                  </ul>
                  <Button onClick={handleGetStarted} size="lg" className="font-headline uppercase tracking-wider">
                    Get Your Meal Plans
                  </Button>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary/90 text-primary-foreground py-20 md:py-28">
              <div className="container mx-auto max-w-4xl px-4 text-center">
                <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-wider mb-6">
                  Ready to Transform Your Life?
                </h2>
                <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
                  Join thousands of users who are achieving their fitness goals with AI-powered personalization. Start your free journey today!
                </p>
                <Button onClick={handleGetStarted} size="lg" variant="secondary" className="font-headline uppercase tracking-wider text-lg px-10 py-6">
                  Create Your Free Plan Now
                </Button>
                <p className="mt-6 text-sm opacity-75">No credit card required • Free forever • Start in 60 seconds</p>
              </div>
            </section>
          </>
        )}

        <div ref={contentRef} className="container mx-auto max-w-7xl p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      <footer className="border-t border-border/40 py-8">
        <div className="container max-w-7xl mx-auto text-center text-muted-foreground">
            <p>Built by You. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
