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
import { useRouter } from 'vue-router';
import type { Trip } from '../interfaces';
import { useGenerateMutation } from '../queries/use-generate.mutation';
import { generateSchema, type GenerateValues } from '../schemas/generate.schema';
import { useTripStore } from '../stores/trip.store';

const { t } = useI18n();
const router = useRouter();
const { showError } = useShowError();
const tripStore = useTripStore();
const { mutateAsync: generateTrip, isPending } = useGenerateMutation();
const { handleSubmit, errors, isSubmitting, resetForm } = useForm<GenerateValues>({
  validationSchema: toTypedSchema(generateSchema),
  initialValues: {
    prompt: '',
  },
});

const { value: prompt } = useField<string>('prompt');

const onSubmit = handleSubmit(async (values) => {
  try {
    debugger;
    const fakeTrip: Trip = {
      title: '10 Days in Japan',
      destination: 'Japan',
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-10-10'),
      budget: 5000,
      travelerCount: 2,
      interests: ['culture', 'food'],
      travelStyle: 'mid',
    };
    // const trip = await generateTrip({ prompt: values.prompt });
    // tripStore.setTrip(trip);
    tripStore.setTrip(fakeTrip);
    router.push({ name: 'tripDetail' });
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
            :disabled="isSubmitting"
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
