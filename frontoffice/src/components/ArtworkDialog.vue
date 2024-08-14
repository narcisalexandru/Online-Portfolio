<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    :draggable="false"
    :header="headerText"
    class="w-4/5"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-2">Artist information</span>

    <div v-if="action === 'add'">
      <Select
        v-model="selectedArtistId"
        :options="formattedArtists"
        optionLabel="fullName"
        optionValue="id"
        filter
        placeholder="Select Artist"
        class="w-full md:w-80"
      />
      <div class="flex items-center mb-4">
        <Checkbox v-model="addNewArtist" inputId="addNewArtist" />
        <label for="addNewArtist" class="ml-2">Can't find the artist? Add them to be popular</label>
      </div>
    </div>

    <div
      class="card flex justify-start flex-row gap-8 mb-4"
      v-if="addNewArtist || action === 'edit'"
    >
      <div class="flex flex-col">
        <label for="firstName">First Name</label>
        <InputText id="firstName" v-model="newArtist.firstName" />
      </div>
      <div class="flex flex-col">
        <label for="lastName">Last Name</label>
        <InputText id="lastName" v-model="newArtist.lastName" />
      </div>
    </div>

    <span class="text-surface-500 dark:text-surface-400 block mb-2">Artwork information</span>
    <div class="card flex justify-start items-center flex-row gap-8 mb-4">
      <div class="flex flex-col">
        <label for="title">Title</label>
        <InputText id="title" v-model="artwork.title" />
      </div>
      <div class="flex flex-col">
        <label for="description">Description</label>
        <InputText id="description" v-model="artwork.description" />
      </div>
      <div class="flex flex-col">
        <label for="websiteLink">Website</label>
        <InputText id="websiteLink" v-model="artwork.websiteLink" />
      </div>
      <div class="flex flex-col">
        <label for="imageUrl">Image URL</label>
        <InputText id="imageUrl" v-model="artwork.imageUrl" />
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="closeDialog" />
      <Button
        type="button"
        :label="saveButtonLabel"
        :severity="buttonSeverity"
        @click="handleSave"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { createArtwork, getArtworkById, updateArtwork } from '../services/artworkService'
import { createArtist, getArtists, getArtistById } from '../services/artistService'
import type { ICreateArtist, IArtist } from '../interfaces/IArtists'
import type { ICreateArtwork, IUpdateArtwork } from '../interfaces/IArtworks'
import { useArtworkDialog } from '../composables/useArtworkDialog'

const { visible, action, closeDialog, artworkId } = useArtworkDialog()
const emit = defineEmits<{ (event: 'artworkSaved'): void }>()

const headerText = computed(() => (action.value === 'add' ? 'Add your ART' : 'Edit your ART'))
const saveButtonLabel = computed(() => (action.value === 'add' ? 'Add' : 'Edit'))
const buttonSeverity = computed(() => (action.value === 'add' ? 'success' : 'info'))

const addNewArtist = ref(false)
const selectedArtistId = ref<number | null>(null)
const newArtist = ref<ICreateArtist>({
  firstName: '',
  lastName: ''
})

const artwork = ref<ICreateArtwork | IUpdateArtwork>({
  title: '',
  description: '',
  websiteLink: '',
  imageUrl: '',
  artistId: 0,
  ...(action.value === 'edit' && { id: artworkId.value })
})

const formattedArtists = ref<{ id: number; fullName: string }[]>([])

const resetForm = () => {
  newArtist.value.firstName = ''
  newArtist.value.lastName = ''
  artwork.value = {
    title: '',
    description: '',
    websiteLink: '',
    imageUrl: '',
    artistId: 0
  }
  selectedArtistId.value = null
  addNewArtist.value = false
}

const fetchArtworkAndArtistData = async () => {
  try {
    if (artworkId.value) {
      const artworkData = await getArtworkById(artworkId.value)

      const artist: { id: number; firstName: string; lastName: string } | undefined =
        artworkData.artist
      if (artist && artist.id) {
        newArtist.value.firstName = artist.firstName
        newArtist.value.lastName = artist.lastName
        selectedArtistId.value = artist.id
      }

      artwork.value = {
        id: artworkData.id,
        title: artworkData.title,
        description: artworkData.description,
        websiteLink: artworkData.websiteLink,
        imageUrl: artworkData.imageUrl,
        artistId: artist?.id ?? 0
      } as IUpdateArtwork
    }
  } catch (error) {
    console.error('Error fetching artwork or artist details:', error)
  }
}

onMounted(async () => {
  if (action.value === 'edit' && artworkId.value !== null) {
    await fetchArtworkAndArtistData()
  } else {
    resetForm()
  }

  try {
    const artists = await getArtists()
    formattedArtists.value = artists.map((artist: IArtist) => ({
      id: artist.id,
      fullName: `${artist.firstName} ${artist.lastName}`
    }))
  } catch (error) {
    console.error('Error fetching artists:', error)
  }
})

watch(artworkId, async (newArtworkId) => {
  if (newArtworkId && action.value === 'edit') {
    await fetchArtworkAndArtistData()
  }
})

watch(selectedArtistId, async (newId) => {
  if (newId !== null && action.value === 'add') {
    try {
      const artist = await getArtistById(newId)
      newArtist.value.firstName = artist.firstName
      newArtist.value.lastName = artist.lastName
    } catch (error) {
      console.error('Error fetching artist details:', error)
    }
  } else {
    newArtist.value.firstName = ''
    newArtist.value.lastName = ''
  }
})

watch(action, (newAction) => {
  if (newAction === 'add') {
    resetForm()
  }
})

const handleSave = async () => {
  try {
    let artistId: number | null = null

    if (addNewArtist.value) {
      const artistResponse = await createArtist(newArtist.value)
      artistId = artistResponse.id
      selectedArtistId.value = artistId
    } else {
      artistId = selectedArtistId.value ?? artwork.value.artistId
    }

    if (action.value === 'add') {
      const artworkData: ICreateArtwork = {
        title: artwork.value.title,
        description: artwork.value.description,
        imageUrl: artwork.value.imageUrl,
        websiteLink: artwork.value.websiteLink,
        artistId: artistId ?? 0
      }

      const artworkResponse = await createArtwork(artworkData)

      if (artworkResponse && artworkResponse.id) {
        resetForm()
        emit('artworkSaved')
      }
    } else if (action.value === 'edit') {
      if ('id' in artwork.value) {
        const artworkData: IUpdateArtwork = {
          id: artwork.value.id as number,
          title: artwork.value.title,
          description: artwork.value.description,
          imageUrl: artwork.value.imageUrl,
          websiteLink: artwork.value.websiteLink,
          artistId: artistId ?? 0
        }

        await updateArtwork(artworkData.id, artworkData)
        emit('artworkSaved')
      }
    }

    closeDialog()
  } catch (error) {
    console.error('Error saving data:', error)
  }
}
</script>
