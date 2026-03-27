<template>
  <Auth />
</template>

<script setup lang="ts">
import Auth from './views/auth/Auth.vue';

const closeCef = () => {
  mp.trigger('cef:destroy');
};
</script>

<style scoped></style>
