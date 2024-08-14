<template>
  <Button severity="danger" icon="pi pi-trash" outlined @click="handleDelete" />
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { deleteArtwork } from '../services/artworkService'
import type { IArtwork } from '../interfaces/IArtworks'

const props = defineProps<{ artwork: IArtwork }>()
const emit = defineEmits<{ (event: 'artworkDeleted', id: number): void }>()

const toast = useToast()
const confirm = useConfirm()

const handleDelete = async () => {
  confirm.require({
    message: `Are you sure you want to delete "${props.artwork.title}"?`,
    header: 'Danger zone',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      try {
        await deleteArtwork(props.artwork.id)
        emit('artworkDeleted', props.artwork.id)
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: `Artwork "${props.artwork.title}" deleted successfully.`,
          life: 3000
        })
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to delete the artwork "${props.artwork.title}".`,
          life: 3000
        })
      }
    },
    reject: () => {
      toast.add({
        severity: 'warn',
        summary: 'Cancelled',
        detail: 'Deletion cancelled.',
        life: 3000
      })
    }
  })
}
</script>
