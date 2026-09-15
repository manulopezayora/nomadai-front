<script setup lang="ts">
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import CardComponent from '@/modules/shared/components/CardComponent.vue';
import TextAreaComponent from '@/modules/shared/components/TextAreaComponent.vue';
import { useShowError } from '@/modules/shared/composable/useShowError';
import GenerateIcon from '@/modules/shared/icons/GenerateIcon.vue';
import NomadAIIcon from '@/modules/shared/icons/NomadAI.icon.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import { useGenerateItineraryMutation } from '../queries/use-generate-itinerary.mutation';
import {
  generateItinerarySchema,
  type GenerateItineraryValues,
} from '../schemas/generate-itinerary-schema';

const { t } = useI18n();
const { showError } = useShowError();
const { mutateAsync: generateItinerary, isPending } = useGenerateItineraryMutation();
const { handleSubmit, errors, isSubmitting, resetForm } = useForm<GenerateItineraryValues>({
  validationSchema: toTypedSchema(generateItinerarySchema),
  initialValues: {
    prompt: '',
  },
});

const { value: prompt } = useField<string>('prompt');

const onSubmit = handleSubmit(async (values) => {
  try {
    debugger;
    const { id } = await generateItinerary({ prompt: values.prompt });

    toast.success(t('auth.success.createAccount'));
    resetForm();
  } catch (error) {
    showError(error);
  }
});
</script>
<template>
  <section class="new-trip">
    <section class="new-trip__header">
      <NomadAIIcon class="icon" />
      <h2 class="new-trip-header__title">{{ t('trips.whereToNext') }}</h2>
      <h2 class="new-trip-header__subtitle">{{ t('trips.newTripDescription') }}</h2>
    </section>
    <section class="new-trip__content">
      <CardComponent maxWidth>
        <form class="form" @submit.prevent="onSubmit">
          <TextAreaComponent
            v-model="prompt"
            type="text"
            :placeholder="t('trips.NewTripPlaceholder')"
            :error="errors.prompt"
          />
          <ButtonComponent type="submit" :loading="isPending" :disabled="isSubmitting">
            <GenerateIcon width="30" />
            {{ t('trips.generateMyItinerary') }}
          </ButtonComponent>
        </form>
      </CardComponent>
    </section>
  </section>
</template>

<style scoped>
.new-trip {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-trip__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 4rem;
}

.icon {
  color: var(--secondary);
  width: 5rem;
}

.new-trip-header__title {
  font-size: 2rem;
  font-weight: 600;
}

.new-trip-header__subtitle {
  font-size: 1.2rem;
}

.new-trip__content {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

@media (min-width: 768px) {
  .new-trip-header__title {
    font-size: 3rem;
    font-weight: 600;
  }

  .new-trip-header__subtitle {
    font-size: 1.5rem;
  }
}
</style>
