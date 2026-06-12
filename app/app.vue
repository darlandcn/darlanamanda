<template>
  <div id="app-root">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '#app'

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0A0F1A' },
  ],
})
</script>
