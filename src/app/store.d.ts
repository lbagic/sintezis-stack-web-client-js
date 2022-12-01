import 'pinia'
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    reset: { [K in keyof S]: () => void }
    $router: Router
  }
}

export {}
