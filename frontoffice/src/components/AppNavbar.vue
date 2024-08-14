<template>
  <Menubar class="!bg-slate-300 !rounded-none" :model="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createNavbarItems } from '../data/navbarItems'

const items = ref(createNavbarItems())
</script>
