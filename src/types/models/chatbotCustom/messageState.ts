import { RoleState } from '@/types/models/role';

export type MessageState = {
  _id: string;
  content: string;
  role: RoleState;
};
