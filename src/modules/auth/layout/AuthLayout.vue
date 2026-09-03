<script setup lang="ts">
import NomadAIIcon from '@/modules/shared/icons/NomadAI.icon.vue';
import NomadAITextIcon from '@/modules/shared/icons/NomadAIText.icon.vue';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const activeTab = ref<'signin' | 'signup'>('signin');

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({
  email: '',
  password: '',
});

function validate(): boolean {
  errors.email = form.email ? '' : t('auth.errors.emailRequired');
  errors.password = form.password.length >= 6 ? '' : t('auth.errors.passwordMin');
  return !errors.email && !errors.password;
}

function handleSubmit() {
  if (!validate()) return;
  // aquí iría la llamada a auth (composable useAuth, TanStack Query mutation, etc.)
  console.log('submit', { ...form });
}
</script>

<template>
  <main class="container">
    <div class="logo">
      <NomadAIIcon width="100px" />
      <NomadAITextIcon />
      <h2>{{ t('auth.login.welcome') }}</h2>
    </div>
    <!-- <RouterView /> -->
    <div class="auth-card">
      <!-- AuthTabs.vue -->
      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ 'tab--active': activeTab === 'signin' }"
          @click="activeTab = 'signin'"
        >
          {{ t('auth.tabs.signIn') }}
        </button>
        <button
          type="button"
          class="tab"
          :class="{ 'tab--active': activeTab === 'signup' }"
          @click="activeTab = 'signup'"
        >
          {{ t('auth.tabs.createAccount') }}
        </button>
      </div>

      <!-- SignInForm.vue -->
      <form v-if="activeTab === 'signin'" class="form" @submit.prevent="handleSubmit">
        <!-- BaseInput.vue -->
        <div class="field">
          <div class="input-wrapper">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 4h16v16H4V4z" opacity="0" />
              <path d="M4 6h16v12H4V6z" />
              <path d="M4 6l8 7 8-7" />
            </svg>
            <input
              v-model="form.email"
              type="email"
              class="input"
              :class="{ 'input--error': errors.email }"
              :placeholder="t('auth.form.email.placeholder')"
            />
          </div>
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <div class="input-wrapper">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input
              v-model="form.password"
              type="password"
              class="input"
              :class="{ 'input--error': errors.password }"
              :placeholder="t('auth.form.password.label')"
            />
          </div>
          <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
        </div>

        <a href="#" class="forgot-link">{{ t('auth.form.forgotPassword') }}</a>

        <!-- BaseButton.vue -->
        <button type="submit" class="submit-btn">
          {{ t('auth.form.signIn') }}
        </button>
      </form>

      <!-- CreateAccountForm.vue -->
      <form v-else class="form" @submit.prevent="handleSubmit">
        <div class="field">
          <div class="input-wrapper">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 6h16v12H4V6z" />
              <path d="M4 6l8 7 8-7" />
            </svg>
            <input
              v-model="form.email"
              type="email"
              class="input"
              :placeholder="t('auth.form.email')"
            />
          </div>
        </div>
        <div class="field">
          <div class="input-wrapper">
            <svg
              class="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input
              v-model="form.password"
              type="password"
              class="input"
              :placeholder="t('auth.form.password')"
            />
          </div>
        </div>
        <button type="submit" class="submit-btn">
          {{ t('auth.form.createAccount') }}
        </button>
      </form>
    </div>
  </main>
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

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Tabs */
.tabs {
  display: flex;
  gap: 4px;
  background: #eef1f4;
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 1.75rem;
}

.tab {
  flex: 1;
  padding: 0.7rem 0;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.tab--active {
  background: #ffffff;
  color: #0f6e56;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #9ca3af;
  pointer-events: none;
}

.input {
  width: 100%;
  padding: 0.85rem 0.85rem 0.85rem 2.6rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #111827;
  outline: none;
  transition: border-color 0.15s ease;
}

.input::placeholder {
  color: #9ca3af;
}

.input:focus {
  border-color: #1d9e75;
  background: #ffffff;
}

.input--error {
  border-color: #e24b4a;
}

.field-error {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: #e24b4a;
}

/* Forgot password */
.forgot-link {
  align-self: flex-end;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f6e56;
  text-decoration: none;
  margin-top: -0.25rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Submit button */
.submit-btn {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(135deg, #5dcaa5, #0f6e56);
  transition: opacity 0.15s ease;
}

.submit-btn:hover {
  opacity: 0.92;
}

.submit-btn:active {
  transform: scale(0.99);
}
</style>
