import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthStatusEnum, RoleEnum } from '../enums';
import type { User } from '../interfaces';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatusEnum.CHECKING);
  const user = ref<User | undefined>();

  const setSession = (userData: User) => {
    user.value = userData;
    authStatus.value = AuthStatusEnum.AUTHENTICATED;
  };

  const clearSession = () => {
    user.value = undefined;
    authStatus.value = AuthStatusEnum.UNAUTHENTICATED;
  };

  return {
    user,
    authStatus,

    isChecking: computed(() => authStatus.value === AuthStatusEnum.CHECKING),
    isAuthenticated: computed(() => authStatus.value === AuthStatusEnum.AUTHENTICATED),
    isAdmin: computed(() => user.value?.role === RoleEnum.ADMIN),

    setSession,
    clearSession,
  };
});
