import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../../api/authApi';
import toast from 'react-hot-toast';

export function useRegisterMutation(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Kayıt başarılı! Lütfen giriş yapın.');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: () => {
      toast.error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
    },
  });
}
