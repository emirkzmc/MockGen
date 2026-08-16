import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../../api/authApi';
import toast from 'react-hot-toast';

export function useRegisterMutation(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registration successful! Please sign in.');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: Error) => {
      toast.error('Registration failed. Please check your details.');
      console.error('Registration error:', error);
    },
  });
}
