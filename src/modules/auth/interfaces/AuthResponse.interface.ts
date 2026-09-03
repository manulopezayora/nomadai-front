import type { User } from './User.interface';

export interface AuthResponse {
  accessToken: string;
  user: User;
}
