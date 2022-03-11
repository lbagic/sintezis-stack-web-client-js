const map = new Map<number, (event: KeyboardEvent) => void>();

const handler = (e: KeyboardEvent) => map.forEach((fn) => fn(e));
export const modalEscapeHandler = {
  subscribe(id: number, fn: (event: KeyboardEvent) => void) {
    map.set(id, fn);
    if (map.size) document.addEventListener("keydown", handler);
  },
  unsubscribe(id: number) {
    map.delete(id);
    if (!map.size) document.removeEventListener("keydown", handler);
  },
};
