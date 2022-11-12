import 'pinia'
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    reset: { [Key in keyof S]: () => void }
    $router: Router
  }
}

export {}
