import type { INavbarItem } from '@/interfaces/INavbarItems'
import { useRouter } from 'vue-router'

export function createNavbarItems() {
  const router = useRouter()

  return [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        router.push('/')
      }
    },
    {
      label: 'Explore',
      icon: 'pi pi-search',
      command: () => {
        router.push('/explore')
      }
    }
  ] as INavbarItem[]
}
