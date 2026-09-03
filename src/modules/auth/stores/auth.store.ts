import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { signInAction } from '../actions';
import { AuthStatusEnum, RoleEnum } from '../enums';
import type { User } from '../interfaces';

interface AuthStoreResponse {
  ok: boolean;
  message: string;
}

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
  }): Promise<AuthStoreResponse> => {
    try {
      const response = await signInAction(email, password);

      if (!response.ok) {
        logout();

        return {
          ok: false,
          message: response.message,
        };
      }

      user.value = response.user;
      accessToken.value = response.accessToken;
      authStatus.value = AuthStatusEnum.AUTHENTICATED;

      return {
        ok: true,
        message: 'Login con éxito',
      };
    } catch (error) {
      console.error(error);
      logout();

      return {
        ok: false,
        message: 'Usuario/Contraseña no son correctos',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatusEnum.UNAUTHENTICATED;
    user.value = undefined;
    accessToken.value = '';

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
