<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { TabOption } from '../types/tabs.types';

const props = defineProps<{
  options: TabOption[];
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const tabRefs = ref<HTMLButtonElement[]>([]);
const indicatorStyle = ref({ left: '0px', width: '0px' });

const activeIndex = computed(() =>
  Math.max(
    0,
    props.options.findIndex((opt) => opt.value === props.modelValue),
  ),
);

const updateIndicator = () => {
  const activeEl = tabRefs.value[activeIndex.value];
  if (!activeEl) return;
  indicatorStyle.value = {
    left: `${activeEl.offsetLeft}px`,
    width: `${activeEl.offsetWidth}px`,
  };
};

onMounted(() => nextTick(updateIndicator));
watch(activeIndex, () => nextTick(updateIndicator));
</script>

<template>
  <div class="tabs" role="tablist">
    <div class="tabs__indicator" :style="indicatorStyle" />
    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="
        (el) => {
          if (el) tabRefs[index] = el as HTMLButtonElement;
        }
      "
      type="button"
      role="tab"
      class="tab"
      :class="{ 'tab--active': modelValue === option.value }"
      :aria-selected="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  position: relative;
  display: flex;
  gap: 4px;
  background: var(--color-background-soft);
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 1.75rem;
}

.tabs__indicator {
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  background: var(--glass-bg);
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition:
    left 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 0.7rem 0;
  border: none;
  background: transparent;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-hint);
  cursor: pointer;
  transition: color 0.15s ease;
}

.tab--active {
  color: var(--primary);
}
</style>
