<script setup lang="ts">
import UserAvatar from '@/modules/shared/components/UserAvatar.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const openPhotoUploader = () => {
  // Lógica para abrir selector de archivo o modal
};
</script>
<template>
  <div class="profile">
    <div class="profile-header">
      <UserAvatar :size="140" editable :show-dropdown="false" @change-photo="openPhotoUploader" />
    </div>
    <h2 class="profile-title">{{ t('user.editProfile') }}</h2>
    <h3 class="profile-subtitle">{{ t('user.editProfileDescription') }}</h3>
  </div>
</template>

<style scoped>
.profile {
  padding: 20px;
  text-align: center;
}

.profile-header {
  display: flex;
  justify-content: center;
}

.profile-title {
  margin-top: 25px;
  font-weight: 600;
  font-size: 1.5rem;
}

.profile-subtitle {
  font-size: 1.2rem;
}
</style>
