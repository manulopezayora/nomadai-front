<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import PhotoIcon from '../icons/PhotoIcon.vue';

export type DropdownOption = {
  label: string;
  action: string;
  danger?: boolean;
};

interface Props {
  size?: number;
  showDropdown?: boolean;
  options?: DropdownOption[];
  showNameHeader?: boolean;
  editable?: boolean;
  avatarUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 36,
  showDropdown: true,
  options: () => [],
  showNameHeader: false,
  editable: false,
  avatarUrl: '',
});

const emit = defineEmits<{
  (e: 'select', action: string): void;
  (e: 'change-photo', payload: { file: File }): void;
}>();

const authStore = useAuthStore();
const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const initials = computed(
  () =>
    authStore.user?.firstName
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') ?? '',
);

const toggleMenu = () => {
  if (props.showDropdown) {
    isOpen.value = !isOpen.value;
  }
};

const handleOptionClick = (action: string) => {
  isOpen.value = false;
  emit('select', action);
};

const handlePhotoClick = (event: Event) => {
  event.stopPropagation();
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;
  if (!file.type.startsWith('image/')) {
    input.value = '';
    return;
  }

  emit('change-photo', { file });
  input.value = '';
};

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div ref="containerRef" class="avatar-container" :style="{ '--avatar-size': `${size}px` }">
    <div class="avatar-wrapper" @click="toggleMenu">
      <img v-if="avatarUrl" :src="avatarUrl" :alt="authStore.user?.firstName" class="avatar-img" />
      <span v-else class="avatar-fallback">{{ initials }}</span>

      <button
        v-if="editable"
        type="button"
        class="avatar-edit-btn"
        aria-label="Cambiar foto"
        @click="handlePhotoClick"
      >
        <PhotoIcon />
      </button>

      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="avatar-file-input"
        @click.stop
        @change="handleFileChange"
      />
    </div>

    <!-- Dropdown -->
    <Transition name="fade">
      <div v-if="isOpen && showDropdown" class="avatar-dropdown">
        <p v-if="showNameHeader" class="avatar-dropdown-name">{{ authStore.fullName }}</p>

        <button
          v-for="item in options"
          :key="item.action"
          type="button"
          class="avatar-dropdown-item"
          :class="{ 'avatar-dropdown-item--danger': item.danger }"
          @click="handleOptionClick(item.action)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
  width: var(--avatar-size);
  height: var(--avatar-size);
}

.avatar-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient-primary, linear-gradient(135deg, #4f46e5, #06b6d4));
  color: #fff;
  font-size: calc(var(--avatar-size) * 0.38);
  font-weight: 600;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(var(--avatar-size) * 0.32);
  height: calc(var(--avatar-size) * 0.32);
  min-width: 24px;
  min-height: 24px;
  border-radius: 999px;
  background-color: #14b8a6;
  border: 2px solid #ffffff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 0;
  transform: translate(10%, 10%);
}

.avatar-edit-btn svg {
  width: 60%;
  height: 60%;
}

.avatar-edit-btn:hover {
  background-color: #0d9488;
}

.avatar-file-input {
  display: none;
}

/* Dropdown */
.avatar-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 200px;
  background: var(--glass-bg, #ffffff);
  backdrop-filter: var(--glass-backdrop-filter, blur(8px));
  border: var(--glass-border, 1px solid rgba(255, 255, 255, 0.3));
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.18);
  padding: 6px;
  z-index: 50;
}

.avatar-dropdown-name {
  margin: 0;
  padding: 8px 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar-dropdown-item {
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

.avatar-dropdown-item:hover {
  background: rgba(79, 70, 229, 0.1);
}

.avatar-dropdown-item--danger {
  color: #dc2626;
}

.avatar-dropdown-item--danger:hover {
  background: rgba(220, 38, 38, 0.1);
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
</style>
