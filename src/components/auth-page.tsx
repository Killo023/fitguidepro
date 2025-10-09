
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './login-form';
import SignUpForm from './signup-form';
import ResetPasswordForm from './reset-password-form';
import placeholderImages from '@/lib/placeholder-images.json';


type AuthView = "login" | "signup" | "reset_password";

export default function AuthPage() {
    const [view, setView] = useState<AuthView>('login');

    const renderView = () => {
        switch (view) {
            case 'login':
                return <LoginForm setView={setView} />;
            case 'signup':
                return <SignUpForm setView={setView} />;
            case 'reset_password':
                return <ResetPasswordForm setView={setView} />;
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                {renderView()}
            </div>
          </div>
          <div className="hidden bg-muted lg:block relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">FitGuide Pro</p>
                <p className="text-xs opacity-75">AI-Powered Fitness</p>
              </div>
            </div>
            <Image
              data-ai-hint="gym fitness"
              src={placeholderImages.auth}
              alt="Fitness enthusiast working out in modern gym with weights and equipment"
              fill
              className="h-full w-full object-cover dark:brightness-[0.3]"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              sizes="(max-width: 768px) 0vw, 50vw"
              onError={(e) => {
                console.error('Auth image failed to load, trying fallback:', e);
                // Try fallback image
                e.currentTarget.src = placeholderImages.authFallback;
              }}
              onLoad={() => {
                console.log('Auth image loaded successfully');
              }}
            />
          </div>
        </div>
    );
}
