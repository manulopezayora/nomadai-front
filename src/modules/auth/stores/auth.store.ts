import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { signInAction } from '../actions';
import { AuthStatusEnum, RoleEnum } from '../enums';
import type { User } from '../interfaces';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatusEnum.CHECKING);
  const user = ref<User | undefined>();
  const accessToken = ref<string | undefined>();

  const onSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { user: userData, accessToken: token } = await signInAction(email, password);

      user.value = userData;
      accessToken.value = token;
      localStorage.setItem('token', token);
      authStatus.value = AuthStatusEnum.AUTHENTICATED;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatusEnum.UNAUTHENTICATED;
    user.value = undefined;
    accessToken.value = undefined;

    return false;
  };

  return {
    user,
    accessToken,
    authStatus,

    isChecking: computed(() => authStatus.value === AuthStatusEnum.CHECKING),
    isAuthenticated: computed(() => authStatus.value === AuthStatusEnum.AUTHENTICATED),
    isAdmin: computed(() => user.value?.role === RoleEnum.ADMIN),

    onSignIn,
    logout,
  };
});
