<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

type OptionObject = Record<string, unknown>;
type Option = string | number | OptionObject;

interface Props {
  modelValue: string | number | null;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  valueKey?: string;
  labelKey?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  valueKey: 'value',
  labelKey: 'label',
  id: () => `select-${Math.random().toString(36).slice(2, 9)}`,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
  change: [value: string | number | null];
}>();

const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const isOptionObject = (option: Option): option is OptionObject => {
  return typeof option === 'object' && option !== null;
};

const getValue = (option: Option): string | number => {
  if (isOptionObject(option)) {
    const value = option[props.valueKey];

    return typeof value === 'string' || typeof value === 'number' ? value : String(value ?? '');
  }

  return option;
};

const getLabel = (option: Option): string | number => {
  if (isOptionObject(option)) {
    const label = option[props.labelKey];

    return typeof label === 'string' || typeof label === 'number' ? label : String(label ?? '');
  }

  return option;
};

const getSelectedLabel = () => {
  const found = props.options.find((opt) => getValue(opt) === props.modelValue);

  return found ? getLabel(found) : props.placeholder || '';
};

const toggleDropdown = () => {
  if (!props.disabled) isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  const val = getValue(option);
  emit('update:modelValue', val);
  emit('change', val);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div ref="selectRef" class="custom-select-field">
    <label v-if="label" :for="id" class="select-label">{{ label }}</label>

    <div
      class="select-wrapper"
      :class="{ 'is-disabled': disabled, 'has-error': !!error, 'is-open': isOpen }"
    >
      <button
        :id="id"
        type="button"
        class="select-trigger"
        :disabled="disabled"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        @click="toggleDropdown"
      >
        <span :class="{ 'is-placeholder': modelValue === null || modelValue === '' }">
          {{ getSelectedLabel() }}
        </span>
        <span class="select-icon" :class="{ 'is-rotated': isOpen }">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>

      <ul v-if="isOpen" class="options-panel" role="listbox">
        <li
          v-for="option in options"
          :key="getValue(option)"
          class="option-item"
          :class="{ 'is-selected': getValue(option) === modelValue }"
          role="option"
          :aria-selected="getValue(option) === modelValue"
          @click="selectOption(option)"
        >
          {{ getLabel(option) }}
        </li>
      </ul>
    </div>

    <span v-if="error" class="select-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.custom-select-field {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.select-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.select-wrapper {
  position: relative;
}

.select-trigger {
  width: 100%;
  height: 40px;
  padding: 0 2rem 0 0.75rem;
  border-radius: var(--field-border-radius);
  border: 1px solid var(--divider);
  background: var(--glass-bg);
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.is-placeholder {
  color: var(--text-hint);
}

.select-icon {
  position: absolute;
  right: 0.6rem;
  display: flex;
  transition: transform 0.2s ease;
}

.select-icon.is-rotated {
  transform: rotate(180deg);
}

.options-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  background: var(--color-background);
  border: 1px solid var(--divider);
  border-radius: var(--field-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.option-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text, #333);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.option-item:hover {
  background: var(--bg-gradient-primary);
  color: var(--text-white);
}

.option-item.is-selected {
  color: var(--secondary);
  font-weight: 600;
}

.option-item.is-selected:hover {
  color: var(--text-white);
}

.select-error {
  font-size: 0.75rem;
  color: var(--error-color);
  margin-top: 0.25rem;
}
</style>
