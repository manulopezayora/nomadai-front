<script setup lang="ts">
import { ApiError } from '@/api/api-error';
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import InputTextComponent from '@/modules/shared/components/InputTextComponent.vue';
import EmailIcon from '@/modules/shared/icons/EmailIcon.vue';
import LockIcon from '@/modules/shared/icons/LockIcon.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';
import { useSignInMutation } from '../queries/use-sign-in.mutation';
import { type SignInFormValues, signInSchema } from '../schemas/sign-in.schema';
import { useAuthStore } from '../stores/auth.store';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const { mutateAsync: signIn, isPending } = useSignInMutation();
const { handleSubmit, errors, isSubmitting } = useForm<SignInFormValues>({
  validationSchema: toTypedSchema(signInSchema),
  initialValues: {
    email: '',
    password: '',
  },
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(async (values) => {
  try {
    const { user } = await signIn({ email: values.email, password: values.password });
    authStore.setSession(user);
    router.replace({ name: 'trips' });
  } catch (error) {
    const code = error instanceof ApiError ? error.code : 'UNEXPECTED_ERROR';
    toast.error(t(`api.${code}`));
  }
});
</script>
<template>
  <form class="form" @submit.prevent="onSubmit">
    <InputTextComponent
      v-model="email"
      type="email"
      :placeholder="t('auth.form.email.label')"
      :error="errors.email"
    >
      <template #icon>
        <EmailIcon />
      </template>
    </InputTextComponent>

    <InputTextComponent
      v-model="password"
      type="password"
      :placeholder="t('auth.form.password.label')"
      :error="errors.password"
    >
      <template #icon>
        <LockIcon />
      </template>
    </InputTextComponent>

    <a href="#" class="forgot-link">{{ t('auth.form.forgotPassword') }}</a>

    <ButtonComponent type="submit" :loading="isPending" :disabled="isSubmitting">
      {{ t('auth.form.signIn') }}
    </ButtonComponent>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forgot-link {
  align-self: flex-end;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  margin-top: -0.25rem;
}

.forgot-link:hover {
  text-decoration: underline;
}
</style>
