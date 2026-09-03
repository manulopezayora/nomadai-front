<script setup lang="ts">
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import InputTextComponent from '@/modules/shared/components/InputTextComponent.vue';
import EmailIcon from '@/modules/shared/icons/EmailIcon.vue';
import LockIcon from '@/modules/shared/icons/LockIcon.vue';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

const validate = (): boolean => {
  errors.email = form.email ? '' : t('auth.errors.emailRequired');
  errors.password = form.password.length >= 6 ? '' : t('auth.errors.passwordMin');
  return !errors.email && !errors.password;
};

const handleSubmit = () => {
  if (!validate()) return;
  // TODO:
  console.log('submit', { ...form });
};
</script>
<template>
  <form class="form" @submit.prevent="handleSubmit">
    <InputTextComponent
      v-model="form.email"
      type="email"
      :placeholder="t('auth.form.email.label')"
      :error="errors.email"
    >
      <template #icon>
        <EmailIcon />
      </template>
    </InputTextComponent>

    <InputTextComponent
      v-model="form.password"
      type="password"
      :placeholder="t('auth.form.password.label')"
      :error="errors.password"
    >
      <template #icon>
        <LockIcon />
      </template>
    </InputTextComponent>

    <a href="#" class="forgot-link">{{ t('auth.form.forgotPassword') }}</a>

    <ButtonComponent :loading="false" :disabled="false">
      {{ t('auth.form.signIn') }}
    </ButtonComponent>
  </form>
</template>

<style scoped>
.container {
  padding: 20px;
}

.logo {
  margin: 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo svg {
  color: var(--color-logo);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Forgot password */
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
