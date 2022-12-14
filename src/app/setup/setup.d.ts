import { globalProperties } from '../../globals'

type GlobalProperties = typeof globalProperties

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends GlobalProperties {
  }
}

export {}
