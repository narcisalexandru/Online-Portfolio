export interface INavbarItem {
  label: string
  icon: string
  command: any
  items?: INavbarItem[]
}
