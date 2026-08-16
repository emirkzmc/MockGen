"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Button } from '@/components/ui/Button';
import { AuthBgComponents } from '@/components/authBgComponent';
import { AnimatedLabel } from '@/components/AnimatedLabel';
import { motion } from 'framer-motion';
import {useRegisterMutation} from '@/hooks/auth/register/useRegisterMutation';

const REGISTER_FIELDS = [
  { id: 'fullName', label: 'Full Name', type: 'text', name: 'fullName' },
  { id: 'email', label: 'E-mail', type: 'email', name: 'email' },
  { id: 'password', label: 'Password', type: 'password', name: 'password' },
];

export default function RegisterPage() {
  const router = useRouter();

  const registerMutation = useRegisterMutation(() => {
    router.push('/login');
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    registerMutation.mutate({
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <main className="min-h-screen flex flex-col-reverse md:flex-row bg-[#260F09] overflow-hidden relative">
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8 z-10">
        <div className="w-full max-w-sm md:w-86.25">
          <motion.form 
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              Register
            </h1>
            
            {REGISTER_FIELDS.map((field) => (
              <FloatingInput 
                key={field.id}
                label={field.label} 
                type={field.type} 
                name={field.name}
                required
              />
            ))}
            
            <Button type="submit" isLoading={registerMutation.isPending}>
              Sign Up
            </Button>
            
            <p className="text-center mt-2 text-sm text-gray-300">
              Already have an account ?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/login')}
                className="text-white font-semibold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </motion.form>
        </div>
      </section>
      <section className="w-full md:w-1/2 flex flex-col justify-end md:justify-center items-center md:items-end p-8 md:pr-16 z-10 pointer-events-none mt-12 md:mt-0">
        <div className="flex flex-col items-center md:items-end text-white text-center md:text-right uppercase">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">THE MOCK DATA GENERATOR</h2>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">HERE IT IS</h2>
          <div className="mt-2 md:mt-0 scale-75 md:scale-100 origin-center md:origin-right">
            <AnimatedLabel />
          </div>
        </div>
      </section>
      <AuthBgComponents />
    </main>
  );
}
