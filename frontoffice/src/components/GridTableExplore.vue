<template>
  <div class="bg-white">
    <DataView :value="artworks" :layout="layout">
      <template #header>
        <div class="flex justify-between md:px-8 gap-8">
          <MultiSelect
            v-model="selectedArtistIds"
            :options="formattedArtists"
            optionLabel="fullName"
            optionValue="id"
            filter
            placeholder="Select Artist"
            :maxSelectedLabels="3"
            class="w-full md:w-80"
          />
          <AddArtworkButton class="w-96 md:w-auto" @artworkSaved="refreshArtworks" />
        </div>
      </template>
      <template #grid="{ items }">
        <div class="grid grid-cols-12 gap-4 p-8">
          <div
            v-for="(artwork, index) in items"
            :key="artwork.id"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
          >
            <div
              class="p-4 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
            >
              <div class="bg-surface-50 flex justify-center rounded">
                <div class="relative mx-auto">
                  <img
                    class="rounded w-full w-max-32"
                    :src="artwork.imageUrl"
                    :alt="artwork.title"
                  />
                </div>
              </div>
              <div class="pt-6">
                <div class="flex flex-row items-start gap-2">
                  <div>
                    <span
                      class="font-medium text-wrap text-surface-500 dark:text-surface-400 text-lg"
                    >
                      {{ artwork.title }}
                    </span>
                    <div
                      class="text-sm text-surface-500 dark:text-surface-400 font-medium mt-1 text-wrap"
                    >
                      {{ artwork.description }}
                    </div>
                    <span>
                      <a
                        :href="
                          artwork.websiteLink.startsWith('http')
                            ? artwork.websiteLink
                            : 'https://' + artwork.websiteLink
                        "
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm italic text-blue-600"
                      >
                        visit website
                      </a>
                    </span>
                  </div>
                </div>
                <div class="flex flex-col gap-6 mt-6">
                  <div class="justify-end flex gap-2">
                    <EditArtworkButton :artworkId="artwork.id" />
                    <DeleteArtworkButton :artwork="artwork" @artworkDeleted="refreshArtworks" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <ArtworkDialog @artworkSaved="refreshArtworks" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { getArtists } from '../services/artistService'
import { getAllArtworks, getAllArtworksByArtistIds } from '../services/artworkService'
import { formatArtists } from '../utils/artistUtils'
import type { IArtist } from '../interfaces/IArtists'
import type { IArtwork } from '../interfaces/IArtworks'

const layout = ref('grid')
const selectedArtistIds = ref<number[]>([])
const artists = ref<IArtist[]>([])
const artworks = ref<IArtwork[]>([])

const fetchArtists = async () => {
  try {
    artists.value = await getArtists()
  } catch (error) {
    console.error('Failed to fetch artists:', error)
  }
}

const fetchArtworks = async (artistIds: number[]) => {
  try {
    if (artistIds.length === 0) {
      artworks.value = await getAllArtworks()
    } else {
      artworks.value = await getAllArtworksByArtistIds(artistIds)
    }
  } catch (error) {
    console.error('Failed to fetch artworks:', error)
  }
}

const refreshArtworks = async () => {
  await fetchArtworks(selectedArtistIds.value)
}

const formattedArtists = computed(() => {
  return formatArtists(artists.value).map((artist) => ({
    id: artist.id,
    fullName: artist.fullName
  }))
})

watch(
  selectedArtistIds,
  (newSelectedArtistIds) => {
    fetchArtworks(newSelectedArtistIds)
  },
  { immediate: true }
)

onMounted(() => {
  fetchArtists()
})
</script>
