<script setup lang="ts">
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import CardComponent from '@/modules/shared/components/CardComponent.vue';
import FloatButtonComponent from '@/modules/shared/components/FloatButtonComponent.vue';
import NoResultIcon from '@/modules/shared/icons/NoResultIcon.vue';
import PlusIcon from '@/modules/shared/icons/PlusIcon.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
  <section class="my-trips">
    <section class="my-trips__header">
      <div>
        <h2 class="my-trips-header__title">{{ t('trips.myTrips') }}</h2>
        <h2 class="my-trips-header__subtitle">{{ t('trips.subtitle') }}</h2>
      </div>

      <FloatButtonComponent class="new-trip-float-button">
        <PlusIcon />
      </FloatButtonComponent>

      <div>
        <ButtonComponent type="button" class="new-trip-button">
          <PlusIcon />
          {{ t('trips.newTrip') }}
        </ButtonComponent>
      </div>
    </section>
    <section class="my-trips__content">
      <template v-if="false">
        <CardComponent />
      </template>
      <template v-else>
        <CardComponent>
          <section class="my-trips__no-content">
            <NoResultIcon class="no-content__icon" />
            <h3 class="no-content__title">{{ t('trips.noContentTitle') }}</h3>
            <p class="no-content__text">{{ t('trips.noContentText') }}</p>
            <ButtonComponent type="button">
              <PlusIcon />
              {{ t('trips.newTrip') }}
            </ButtonComponent>
          </section>
        </CardComponent>
      </template>
    </section>
  </section>
</template>

<style scoped>
.my-trips__header {
  padding: 2rem 0;
  line-height: 2rem;
}

.my-trips-header__title {
  font-size: 2rem;
  font-weight: 600;
}

.my-trips-header__subtitle {
  font-size: 1.4rem;
}

.new-trip-button {
  display: none;
}

.my-trips__content {
  display: flex;
  justify-content: center;
}

.my-trips__no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.no-content__icon {
  width: 100px;
  color: var(--secondary);
}

.no-content__title {
  text-align: center;
  font-size: 1.5rem;
}

.no-content__text {
  color: var(--text-secondary);
  text-align: center;
}

@media (min-width: 768px) {
  .my-trips__header {
    padding: 3rem 0;
    line-height: 3rem;
    display: grid;
    grid-template-columns: 1fr 200px;
    align-items: center;
  }

  .my-trips-header__title {
    font-size: 3rem;
    font-weight: 600;
  }

  .my-trips-header__subtitle {
    font-size: 1.5rem;
  }

  .new-trip-float-button {
    display: none;
  }

  .new-trip-button {
    display: flex;
  }

  .no-content__icon {
    width: 180px;
  }

  .no-content__title {
    text-align: center;
    font-size: 2rem;
  }
}
</style>
