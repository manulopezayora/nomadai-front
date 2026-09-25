<script setup lang="ts">
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import TabsComponent from '@/modules/shared/components/TabsComponent.vue';
import type { TabOption } from '@/modules/shared/types/tabs.types';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const tabs = computed<TabOption[]>(() => [
  { label: t('Itinerary'), value: 'itinerary' },
  { label: t('Flights'), value: 'flights' },
  { label: t('Hotels'), value: 'hotels' },
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
  <div class="trip-layout">
    <TabsComponent
      class="trip-tabs"
      :options="tabs"
      :model-value="activeTab"
      @update:model-value="onTabChange"
    />
    <div class="trip-content">
      <RouterView />
    </div>
    <ButtonComponent type="button" class="save-trip-button">
      {{ t('trips.saveTrip') }}
    </ButtonComponent>
  </div>
</template>

<style scoped>
.trip-layout {
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - 150px);
}

.trip-tabs {
  margin: 1.2rem 0;
}

.trip-content {
  flex-grow: 1;
  margin-bottom: 1.2rem;
}

.save-trip-button {
  margin-top: auto;
}
</style>
