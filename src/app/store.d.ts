import 'pinia'
export {}

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    reset: { [Key in keyof S]: () => void }
  }
}
