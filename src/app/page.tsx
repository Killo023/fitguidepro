
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
              width={200} 
              height={60} 
              className="h-10 w-auto"
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

      <main className="container mx-auto max-w-7xl p-4 md:p-8">
        {!user && !loading && (
            <section className="relative h-[60vh] flex items-center justify-center text-center -mx-4 md:-mx-8">
                <Image
                    data-ai-hint="fitness workout"
                    src={placeholderImages.hero}
                    alt="Hero background"
                    fill
                    className="object-cover object-center brightness-[0.3]"
                    priority
                />
                <div className="relative z-10 p-4 text-white max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-headline font-extrabold uppercase tracking-widest">
                        Chart Your Path to Fitness
                    </h2>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
                        Stop guessing. Start achieving. FitGuide Pro is your AI-powered guide to personalized workout and nutrition plans that adapt to you.
                    </p>
                    <Button size="lg" onClick={handleGetStarted} className="mt-8 font-headline uppercase tracking-wider text-lg">
                        Create Your Free Plan
                    </Button>
                </div>
            </section>
        )}

        <div ref={contentRef} className="pt-8">
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
