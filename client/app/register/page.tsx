"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FloatingInput } from '@/src/components/ui/FloatingInput';
import { Button } from '@/src/components/ui/Button';
import { TrackingEye } from '@/src/components/shared/TrackingEye';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '@/src/hooks/auth/register/useRegisterMutation';

const REGISTER_FIELDS = [
  { id: 'fullName', label: 'Ad Soyad', type: 'text', name: 'fullName' },
  { id: 'email', label: 'E-posta', type: 'email', name: 'email' },
  { id: 'password', label: 'Şifre', type: 'password', name: 'password' },
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
    <div className="min-h-screen flex bg-gradient-to-b from-white to-[#999999] overflow-hidden">
      <div className="w-1/2 flex flex-col items-center justify-center p-8 z-10">
        <div className="w-[345px]">
          <motion.form 
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-black">
              Kayıt Ol
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
            
            <Button type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </Button>
            
            <p className="text-center mt-2 text-sm text-[#404040]">
              Zaten üye misiniz?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/login')}
                className="text-black font-semibold hover:underline cursor-pointer"
              >
                Giriş Yap
              </button>
            </p>
          </motion.form>
        </div>
      </div>
      <TrackingEye />
    </div>
  );
}
