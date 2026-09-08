<script setup lang="ts">
import { ApiError } from '@/api/api-error';
import { RoleEnum } from '@/modules/auth/enums';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import InputTextComponent from '@/modules/shared/components/InputTextComponent.vue';
import SelectComponent from '@/modules/shared/components/SelectComponent.vue';
import StatusSwitchComponent from '@/modules/shared/components/StatusSwitchComponent.vue';
import UserAvatar from '@/modules/shared/components/UserAvatar.vue';
import { getAvatarUrl } from '@/modules/shared/helpers/getAvatarUrl.helper';
import { useUploadAvatarMutation } from '@/modules/shared/queries/use-upload-avatar.mutation';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { computed, ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import type { UserToSave } from '../interfaces/UserToSave.interface';
import { useUpdateUserMutation } from '../queries/use-update-user.mutation';
import { updateUserSchema, type UpdateUserFormValues } from '../schemas/update-user.schema';

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const { t } = useI18n();
const authStore = useAuthStore();

const { mutateAsync: uploadAvatar } = useUploadAvatarMutation();
const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();

const { handleSubmit, errors, isSubmitting, setFieldValue } = useForm<UpdateUserFormValues>({
  validationSchema: toTypedSchema(updateUserSchema),
  initialValues: {
    firstName: authStore.user?.firstName,
    lastName: authStore.user?.lastName,
    email: authStore.user?.email,
    avatarPublicId: authStore.user?.avatarPublicId,
    role: authStore.user?.role,
    isActive: authStore.user?.isActive ?? false,
  },
});

const { value: firstName } = useField<string>('firstName');
const { value: lastName } = useField<string>('lastName');
const { value: email } = useField<string>('email');
const { value: role } = useField<string>('role');
const { value: isActive } = useField<boolean>('isActive');

const formDataRef = shallowRef<FormData | null>(null);

const avatarUrl = ref<string>('');
const getAvatar = computed(() =>
  authStore.user?.avatarPublicId ? getAvatarUrl(authStore.user?.avatarPublicId) : avatarUrl.value,
);
const roleOptions = computed(() =>
  Object.keys(RoleEnum).map((key) => ({
    label: t(`user.form.${key.toLowerCase()}`),
    value: key,
  })),
);

const mapperToUpdateUser = (user: UpdateUserFormValues, avatarId: string): UserToSave => ({
  firstName: user.firstName,
  lastName: user.lastName,
  avatarPublicId: avatarId ?? '',
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const avatarId = await (formDataRef.value ? uploadAvatarToCloudinary(formDataRef.value) : '');

    setFieldValue('avatarPublicId', avatarId);

    const userToUpdate = mapperToUpdateUser(values, avatarId);
    const user = await updateUser({
      userId: props.userId,
      user: userToUpdate,
    });

    authStore.setSession(user);
    avatarUrl.value = '';

    toast.success(t('common.saveSuccess'));
  } catch (error) {
    // TODO: Estandarizar en un utils
    const code = error instanceof ApiError ? error.code : 'UNEXPECTED_ERROR';
    toast.error(t(`api.${code}`));
  }
});

const onChangePhoto = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  formDataRef.value = formData;

  if (authStore.user) {
    const temporalUrl = URL.createObjectURL(file);
    avatarUrl.value = temporalUrl;
  }
};

const uploadAvatarToCloudinary = async (formData: FormData) => {
  const { public_id } = await uploadAvatar(formData);

  return public_id;
};

const onRoleChange = (value: string | number | null) => {
  setFieldValue('role', value as string);
};
</script>
<template>
  <div class="profile">
    <div class="profile-header">
      <UserAvatar
        :size="140"
        editable
        :show-dropdown="false"
        :avatar-url="getAvatar"
        @change-photo="onChangePhoto"
      />
    </div>
    <h2 class="profile-title">{{ t('user.editProfile') }}</h2>
    <h3 class="profile-subtitle">{{ t('user.editProfileDescription') }}</h3>
  </div>

  <form class="form" @submit.prevent="onSubmit">
    <section class="form-row">
      <InputTextComponent
        v-model="firstName"
        type="text"
        :placeholder="t('user.form.firstName')"
        :disabled="isPending"
        :error="errors.firstName"
      />

      <InputTextComponent
        v-model="lastName"
        type="text"
        :placeholder="t('user.form.lastName')"
        :disabled="isPending"
        :error="errors.lastName"
      />
    </section>
    <section class="form-row">
      <InputTextComponent
        v-model="email"
        type="email"
        disabled
        :placeholder="t('user.form.email')"
        :error="errors.email"
      />
    </section>
    <section class="form-row">
      <StatusSwitchComponent
        v-model="isActive"
        disabled
        :activeText="t('user.form.active')"
        :inactiveText="t('user.form.inactive')"
        :ariaLabel="t('user.form.isActive')"
      />

      <SelectComponent
        v-model="role"
        disabled
        :placeholder="t('user.form.role')"
        :options="roleOptions"
        @change="onRoleChange"
      />
    </section>

    <section class="form-row">
      <ButtonComponent type="submit" :loading="isPending" :disabled="isSubmitting">
        {{ t('common.buttons.save') }}
      </ButtonComponent>
    </section>
  </form>
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

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: inherit;
  width: 100%;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
    width: 80%;
  }

  .form-row .input {
    flex: 1;
  }
}
</style>
