<script setup lang="ts">
interface Props {
  modelValue: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  activeText?: string;
  inactiveText?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showLabel: true,
  activeText: '',
  inactiveText: '',
  ariaLabel: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const toggle = () => {
  if (props.disabled) return;
  const newValue = !props.modelValue;
  emit('update:modelValue', newValue);
  emit('change', newValue);
};
</script>

<template>
  <label class="status-switch" :class="{ 'is-disabled': disabled }">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="ariaLabel"
      :disabled="disabled"
      class="switch-track"
      :class="{ 'is-active': modelValue }"
      @click="toggle"
    >
      <span class="switch-thumb" />
    </button>

    <span class="switch-label" v-if="showLabel">
      {{ modelValue ? activeText : inactiveText }}
    </span>
  </label>
</template>

<style scoped>
.status-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.status-switch.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch-track {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background-color: var(--text-hint);
  transition: background-color 0.2s ease;
  padding: 0;
  cursor: inherit;
}

.switch-track.is-active {
  background: var(--bg-gradient-primary);
}

.switch-track:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.switch-track.is-active .switch-thumb {
  transform: translateX(20px);
}

.switch-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
</style>
