<script setup lang="ts">
import NomadAIIcon from '@/modules/shared/icons/NomadAI.icon.vue';
import NomadAITextIcon from '@/modules/shared/icons/NomadAIText.icon.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="logo">
    <NomadAIIcon width="100px" />
    <NomadAITextIcon />
    <h2>{{ t('auth.login.welcome') }}</h2>
  </div>
  <RouterView />
</template>

<style scoped>
.logo {
  margin: 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo svg {
  color: var(--color-logo);
}
</style>
