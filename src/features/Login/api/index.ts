import globalService from '@/shared/service/globalService';
import { LoginValues } from '@/types/types';

export const loginUser = async (values: LoginValues) => {
  return await globalService.post('auth/login', values);
};
