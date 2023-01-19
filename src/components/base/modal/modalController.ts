type ModalInstance = {
  show: () => void;
  hide: () => void;
};

export const modalController: Record<string, ModalInstance> = {};

export const modalInternals = {
  register(name: string, modal: ModalInstance) {
    modalController[name] = modal;
  },
  destroy(name: string) {
    delete modalController[name];
  },
};
