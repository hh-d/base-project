import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      
    }
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['tab', 'locale', 'theme', 'logo', 'level', 'inverted', 'breadcrumb', 'sideTheme', 'greyMode', 'accordion', 'keepAliveList', 'themeVariable', 'subfield', 'tagsTheme'],
  // }
})