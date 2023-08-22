import globalService from '@/shared/service/globalService';
import { RegisterValues } from '@/types/types';

export const registUser = async (values: RegisterValues) => {
  return await globalService.post('user/register', values);
};
