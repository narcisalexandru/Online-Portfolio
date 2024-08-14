<template>
  <Button label="Add Artwork" @click="openAddArtworkDialog" />
</template>

<script setup lang="ts">
import { useArtworkDialog } from '../composables/useArtworkDialog'

const { openDialog } = useArtworkDialog()

function openAddArtworkDialog() {
  openDialog('add')
}
</script>
