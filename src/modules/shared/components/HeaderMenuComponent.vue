<script setup lang="ts">
import { ApiError } from '@/api/api-error.ts';
import { useLogoutMutation } from '@/modules/auth/queries/use-logout.mutation.ts';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import router from '@/router/index.ts';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import NomadAITextIcon from '../icons/NomadAIText.icon.vue';
import TranslationIcon from '../icons/TranslationIcon.vue';
import UserAvatar, { type DropdownOption } from './UserAvatar.vue';

type NavbarItems = {
  label: string;
  url: string;
};

const navbarItems: NavbarItems[] = [{ label: 'header.nav.myTrips', url: '/my-trips' }];

const { t, locale } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();
const { mutateAsync: logout } = useLogoutMutation();

const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const dropdownOptions = computed<DropdownOption[]>(() => [
  { label: t('header.nav.profile'), action: 'profile' },
  { label: t('header.nav.logout'), action: 'logout', danger: true },
]);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isUserMenuOpen.value = false;
};

const toggleLocale = () => {
  const newLocale = locale.value === 'es' ? 'en' : 'es';

  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};

const onProfileOptions = (name: string) => {
  isUserMenuOpen.value = false;
  router.push({ name });
};

const onLogoutClick = async () => {
  isUserMenuOpen.value = false;

  try {
    await logout();
    authStore.clearSession();
  } catch (error) {
    // TODO: Estandarizar en un utils
    const code = error instanceof ApiError ? error.code : 'UNEXPECTED_ERROR';
    toast.error(t(`api.${code}`));
  }
};

const handleAvatarSelect = (action: string) => {
  if (action === 'profile') onProfileOptions('profile');
  if (action === 'logout') onLogoutClick();
};
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="navbar-logo">
        <NomadAITextIcon />
      </RouterLink>

      <!-- Menu (center, desktop only) -->
      <nav class="navbar-menu navbar-menu--desktop">
        <RouterLink
          v-for="item in navbarItems"
          :key="item.url"
          :to="item.url"
          class="navbar-link"
          active-class="navbar-link--active"
        >
          {{ t(item.label) }}
        </RouterLink>
      </nav>

      <!-- Right section: language + avatar -->
      <div class="navbar-actions">
        <button
          type="button"
          class="navbar-lang-btn"
          :aria-label="t('header.nav.toggleLanguage')"
          @click="toggleLocale"
        >
          <TranslationIcon width="20px" />
          {{ locale === 'es' ? 'EN' : 'ES' }}
        </button>

        <div ref="userMenuRef" class="navbar-user">
          <UserAvatar
            :size="36"
            :options="dropdownOptions"
            show-name-header
            @select="handleAvatarSelect"
          />
        </div>

        <!-- Hamburger (mobile only) -->
        <button
          type="button"
          class="navbar-burger"
          :aria-label="t('header.nav.toggleMenu')"
          @click="toggleMobileMenu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <nav v-if="isMobileMenuOpen" class="navbar-menu navbar-menu--mobile">
        <RouterLink
          v-for="item in navbarItems"
          :key="item.url"
          :to="item.url"
          class="navbar-link navbar-link--mobile"
          active-class="navbar-link--active"
          @click="isMobileMenuOpen = false"
        >
          {{ t(item.label) }}
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop-filter);
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  border-bottom: var(--glass-border);
  box-shadow: 0 4px 24px rgba(31, 38, 135, 0.08);
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--secondary);
}

.navbar-menu--desktop {
  display: none;
  align-items: center;
  gap: 24px;
}

.navbar-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  padding: 6px 4px;
  position: relative;
  transition: color 0.15s ease;
}

.navbar-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--secondary);
  transform: scaleX(0);
  transition: transform 0.15s ease;
}

.navbar-link:hover {
  color: var(--secondary);
}

.navbar-link:hover::after {
  transform: scaleX(1);
}

.navbar-link--active {
  color: var(--secondary);
}

.navbar-link--active::after {
  transform: scaleX(1);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar-lang-btn {
  display: flex;
  align-items: center;
  column-gap: 5px;
  border: 1px solid var(--secondary);
  background: var(--color-background);
  color: var(--secondary);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.1s ease;
}

.navbar-lang-btn:hover {
  background: var(--secondary);
  border: none;
  color: var(--text-white);
}

.navbar-lang-btn:active {
  transform: scale(0.96);
}

.navbar-user {
  position: relative;
}

.navbar-avatar-btn {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 999px;
  display: flex;
  line-height: 0;
}

.navbar-avatar-btn:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}

.navbar-avatar-img {
  height: 36px;
  width: 36px;
  border-radius: 999px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.navbar-avatar-fallback {
  height: 36px;
  width: 36px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient-primary);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
}

.navbar-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 200px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop-filter);
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  border: var(--glass-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.18);
  padding: 6px;
  overflow: hidden;
  z-index: 2;
}

.navbar-dropdown-name {
  margin: 0;
  padding: 8px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
  border-bottom: var(--glass-border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar-dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 8px 10px;
  font-size: 0.85rem;
  color: #374151;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.navbar-dropdown-item:hover {
  background: rgba(79, 70, 229, 0.1);
}

.navbar-dropdown-item--danger {
  color: #dc2626;
}

.navbar-dropdown-item--danger:hover {
  background: rgba(220, 38, 38, 0.1);
}

.navbar-burger {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--secondary);
}

.navbar-burger:hover {
  background: rgba(79, 70, 229, 0.1);
}

.navbar-burger svg {
  height: 24px;
  width: 24px;
}

.navbar-menu--mobile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 16px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop-filter);
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  z-index: 1;
}

.navbar-link--mobile {
  padding: 10px 12px;
  border-radius: 8px;
}

.navbar-link--mobile:hover,
.navbar-link--mobile.navbar-link--active {
  background: rgba(79, 70, 229, 0.1);
}

.navbar-link--mobile::after {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.slide-enter-active,
.slide-leave-active {
  transition:
    max-height 0.2s ease,
    opacity 0.2s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 220px;
  opacity: 1;
}

@media (min-width: 768px) {
  .navbar-menu--desktop {
    display: flex;
  }

  .navbar-menu--mobile {
    display: none;
  }

  .navbar-burger {
    display: none;
  }
}
</style>
