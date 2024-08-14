import { visible, action, artworkId } from '../state/dialogState'

export function useArtworkDialog() {
  function openDialog(dialogAction: 'add' | 'edit', id: number | null = null) {
    if (dialogAction === 'add') {
      artworkId.value = null
    } else if (dialogAction === 'edit' && id !== null) {
      artworkId.value = id
    }

    action.value = dialogAction
    visible.value = true
  }

  function closeDialog() {
    visible.value = false
  }

  return {
    visible,
    action,
    artworkId,
    openDialog,
    closeDialog
  }
}
