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
      <NomadAIIcon width="100px" />
      <NomadAITextIcon />
      <h2>{{ t('auth.login.welcome') }}</h2>
    </div>

    <CardComponent>
      <TabsComponent :options="tabs" :model-value="activeTab" @update:model-value="onTabChange" />

      <RouterView />
    </CardComponent>
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
</style>
