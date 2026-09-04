<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { InputTextType } from '../types/input-text.types';

defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: InputTextType;
  error?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const { t } = useI18n();
</script>

<template>
  <div class="input">
    <div class="input__wrapper">
      <span v-if="$slots.icon" class="input__icon">
        <slot name="icon" />
      </span>
      <input
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        class="input__field"
        :class="{ 'input__field--with-icon': $slots.icon, 'input__field--error': error }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="input__error">{{ t(error) }}</p>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
}

.input__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input__icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: var(--text-hint);
  display: flex;
  pointer-events: none;
}

.input__field {
  width: 100%;
  padding: 0.85rem;
  border: 1px solid var(--divider);
  background: var(--glass-bg);
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--text-color);
  outline: none;
  transition: border-color 0.15s ease;
}

.input__field--with-icon {
  padding-left: 2.6rem;
}

.input__field::placeholder {
  color: var(--text-hint);
}

.input__field:focus {
  border-color: var(--primary);
  background: var(--glass-bg);
}

.input__field--error,
.input__field--error:focus {
  border-color: var(--error-color);
}

.input__error {
  margin: 0.35rem 0 0;
  font-size: 0.75rem;
  color: var(--error-color);
}
</style>
