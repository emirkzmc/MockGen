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
  { id: 'email-login', label: 'E-mail', type: 'email', name: 'email' },
  { id: 'password-login', label: 'Password', type: 'password', name: 'password' },
];

export default function LoginPage() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});

  const loginMutation = useLoginMutation(
    () => {
      router.push('/dashboard');
    },
    (error: unknown) => {
      const err = error as { response?: { data?: { message?: string }, status?: number } };
      const message = err?.response?.data?.message?.toLowerCase() || "";
      
      if (message.includes("şifre") || message.includes("password") || err?.response?.status === 401) {
        setFieldErrors({ password: "Your password is incorrect; please try again." });
      } else if (message.includes("mail") || message.includes("kullanıcı") || message.includes("user") || err?.response?.status === 404) {
        setFieldErrors({ email: "No account found for this email address." });
      } else {
        setFieldErrors({ email: "Invalid login credentials.", password: "Invalid login credentials." });
      }
    }
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password field is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    loginMutation.mutate({ email, password });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row bg-[#260F09] overflow-hidden relative">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8 z-10">
        <div className="w-full max-w-sm md:w-86.25">
          <motion.form 
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              Sign In
            </h1>
            
            {LOGIN_FIELDS.map((field) => (
              <FloatingInput 
                key={field.id}
                label={field.label} 
                type={field.type} 
                name={field.name}
                error={fieldErrors[field.name as keyof typeof fieldErrors]}
                onChange={handleInputChange}
                required={false} 
              />
            ))}
            
            <div className="mt-2">
              <Button type="submit" isLoading={loginMutation.isPending}>
                Giriş Yap
              </Button>
            </div>

            <p className="text-center mt-2 text-sm text-gray-300">
              Don&apos;t have an account ?{' '}
              <button 
                type="button" 
                onClick={() => router.push('/register')}
                className="text-white font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </motion.form>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-end md:justify-center items-center md:items-end p-8 md:pr-16 z-10 pointer-events-none mt-12 md:mt-0">
        <div className="flex flex-col items-center md:items-end text-white text-center md:text-right uppercase">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">THE MOCK DATA GENERATOR</h2>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">HERE IT IS</h2>
          <div className="mt-2 md:mt-0 scale-75 md:scale-100 origin-center md:origin-right">
            <AnimatedLabel />
          </div>
        </div>
      </div>
      <AuthBgComponents />
    </div>
  );
}
