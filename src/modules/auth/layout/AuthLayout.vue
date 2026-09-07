<script setup lang="ts">
import CardComponent from '@/modules/shared/components/CardComponent.vue';
import TabsComponent from '@/modules/shared/components/TabsComponent.vue';
import NomadAIIcon from '@/modules/shared/icons/NomadAI.icon.vue';
import NomadAITextIcon from '@/modules/shared/icons/NomadAIText.icon.vue';
import type { TabOption } from '@/modules/shared/types/tabs.types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const tabs = computed<TabOption[]>(() => [
  { label: t('auth.tabs.signIn'), value: 'signIn' },
  { label: t('auth.tabs.createAccount'), value: 'createAccount' },
]);

const activeTab = computed(() => {
  const match = tabs.value.find((tab) => tab.value === route.name);
  return match?.value ?? tabs.value[0]!.value;
});

const onTabChange = (value: string) => {
  router.push({ name: value });
};
</script>

<template>
  <main class="container">
    <div class="logo">
      <NomadAIIcon class="logo__icon" />
      <NomadAITextIcon class="logo__text-icon" />
      <h2>{{ t('auth.login.welcome') }}</h2>
      <h3>{{ t('auth.login.title') }}</h3>
    </div>

    <div class="content">
      <CardComponent>
        <TabsComponent :options="tabs" :model-value="activeTab" @update:model-value="onTabChange" />
        <RouterView />
      </CardComponent>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 20px;
}

.logo {
  margin: 20% 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo svg {
  color: var(--color-logo);
}

.logo__icon {
  width: 30%;
}

.logo__text-icon {
  width: 60%;
}

.content {
  display: flex;
  justify-content: center;
}

h3 {
  display: none;
}

@media (min-width: 768px) {
  .container {
    display: flex;
    padding: 0;
    width: 100%;
    height: 100dvh;
  }

  .logo {
    background: var(--bg-gradient-primary);
    color: var(--text-white);
    flex: 1;
    justify-content: center;
    margin: 0;
    gap: 10px;
  }

  .logo svg {
    color: var(--text-white);
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    display: block;
    font-size: 1.25rem;
  }

  .content {
    flex: 1;
    align-items: center;
    padding: 15px;
  }
}
</style>
