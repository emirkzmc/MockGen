"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '@/src/components/ui/FloatingInput';
import { Button } from '@/src/components/ui/Button';
import { TrackingEye } from '@/src/components/shared/TrackingEye';
import { motion } from 'framer-motion';
import { useLoginMutation } from '@/src/hooks/auth/login/useLoginMutation';

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
    <div className="min-h-screen flex bg-gradient-to-b from-white to-[#999999] overflow-hidden">
      <div className="w-1/2 flex flex-col items-center justify-center p-8 z-10">
        <div className="w-[345px]">
          <motion.form 
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-black">
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

            <p className="text-center mt-2 text-sm text-[#404040]">
              Hesabınız yok mu?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/register')}
                className="text-black font-semibold hover:underline cursor-pointer"
              >
                Kayıt Ol
              </button>
            </p>
          </motion.form>
        </div>
      </div>
      <TrackingEye />
    </div>
  );
}
