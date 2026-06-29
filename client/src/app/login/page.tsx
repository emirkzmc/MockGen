"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '../../components/ui/FloatingInput';
import { Button } from '../../components/ui/Button';
import { AuthBgComponents } from '../../components/authBgComponent';
import { AnimatedLabel } from '../../components/AnimatedLabel';
import { motion } from 'framer-motion';
import { useLoginMutation } from '../../hooks/auth/login/useLoginMutation';

const LOGIN_FIELDS = [
  { id: 'email-login', label: 'E-posta', type: 'email', name: 'email' },
  { id: 'password-login', label: 'Şifre', type: 'password', name: 'password' },
];

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLoginMutation(() => {
    router.push('/dashboard');
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <div className="min-h-screen flex bg-[#260F09] overflow-hidden relative">
      <div className="w-1/2 flex flex-col items-center justify-center p-8 z-10">
        <div className="w-86.25">
          <motion.form 
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              Giriş Yap
            </h1>
            
            {LOGIN_FIELDS.map((field) => (
              <FloatingInput 
                key={field.id}
                label={field.label} 
                type={field.type} 
                name={field.name}
                required
              />
            ))}
            
            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>

            <p className="text-center mt-2 text-sm text-gray-300">
              Hesabınız yok mu?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/register')}
                className="text-white font-semibold hover:underline cursor-pointer"
              >
                Kayıt Ol
              </button>
            </p>
          </motion.form>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-end pr-16 z-10 pointer-events-none">
        <div className="flex flex-col items-end text-white text-right uppercase">
          <h2 className="text-[48px] font-bold leading-tight">THE MOCK DATA GENERATOR</h2>
          <h2 className="text-[48px] font-bold leading-tight">HERE IT IS</h2>
          <AnimatedLabel />
        </div>
      </div>
      <AuthBgComponents />
    </div>
  );
}
