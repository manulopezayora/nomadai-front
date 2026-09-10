<script lang="ts" setup>
interface Props {
  width?: string | number;
}
withDefaults(defineProps<Props>(), {
  width: '24px',
});
</script>

<template>
  <svg
    fill="currentColor"
    :width="width"
    viewBox="-4.5 -4.5 24 24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin"
    class="jam jam-plus"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"
      ></path>
    </g>
  </svg>
</template>
