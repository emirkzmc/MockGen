import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../../api/authApi';
import toast from 'react-hot-toast';

export function useLoginMutation(
  onSuccessCallback?: () => void,
  onErrorCallback?: (error: unknown) => void
) {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.access_token);
      document.cookie = `authToken=${data.access_token}; path=/; max-age=86400; samesite=strict`;
      toast.success('Login successful!');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    },
  });
}
