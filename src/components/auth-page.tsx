
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
          <div className="hidden bg-muted lg:block relative">
            <Image
              data-ai-hint="gym fitness"
              src={placeholderImages.auth}
              alt="Image"
              fill
              className="h-full w-full object-cover dark:brightness-[0.3]"
            />
          </div>
        </div>
    );
}
