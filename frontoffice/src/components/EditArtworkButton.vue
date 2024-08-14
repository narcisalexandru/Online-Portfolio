<template>
  <Button severity="info" icon="pi pi-pencil" outlined @click="openDialogForEdit" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useArtworkDialog } from '../composables/useArtworkDialog'

const props = defineProps<{
  artworkId: number
}>()

const { openDialog } = useArtworkDialog()

function openDialogForEdit() {
  openDialog('edit', props.artworkId)
}
</script>
