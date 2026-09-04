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
import {
  type CreateAccountFormValues,
  createAccountSchema,
} from '../schemas/create-account.schema';
import { useAuthStore } from '../stores/auth.store';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const { mutateAsync: signIn, isPending } = useSignInMutation();
const { handleSubmit, errors, isSubmitting } = useForm<CreateAccountFormValues>({
  validationSchema: toTypedSchema(createAccountSchema),
  initialValues: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  },
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');

const onSubmit = handleSubmit(async (values) => {
  console.log('Datos enviados:', values);
  debugger;
  try {
    const { user } = await signIn({ email: values.email, password: values.password });
    authStore.setSession(user);
    toast.success(t('auth.success.createAccount'));
    router.push({ name: 'signIn' });
  } catch (error) {
    // TODO: Estandarizar en un utils
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

    <InputTextComponent
      v-model="firstName"
      type="text"
      :placeholder="t('auth.form.firstName.label')"
      :error="errors.firstName"
    >
      <template #icon>
        <EmailIcon />
      </template>
    </InputTextComponent>

    <InputTextComponent
      v-model="lastName"
      type="text"
      :placeholder="t('auth.form.lastName.label')"
      :error="errors.lastName"
    >
      <template #icon>
        <EmailIcon />
      </template>
    </InputTextComponent>

    <ButtonComponent type="submit" :loading="isPending" :disabled="isSubmitting">
      {{ t('auth.form.createAccount') }}
    </ButtonComponent>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
