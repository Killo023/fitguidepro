'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface SignUpFormProps {
    setView: (view: 'login' | 'signup' | 'reset_password') => void;
}

export default function SignUpForm({ setView }: SignUpFormProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            toast({
                title: 'Account created!',
                description: "You've been successfully signed up.",
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Sign-up Error',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline uppercase">Create Account</h1>
            <p className="text-balance text-muted-foreground">
                Enter your details to start your fitness journey.
            </p>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full font-headline uppercase tracking-wider" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
            </Button>
        </form>
        </Form>
        <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto font-bold text-primary" onClick={() => setView('login')}>
                Sign in
            </Button>
        </div>
    </>
  );
}
