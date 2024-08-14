import { ref } from 'vue'

export const visible = ref(false)
export const action = ref<'add' | 'edit'>('add')
export const artworkId = ref<number | null>(null)
