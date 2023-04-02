import { createDomain } from "effector";
import { Modal } from "../types/index";
const error = createDomain();

export const setModal = error.createEvent<Modal>();

export const $modal = error.createStore<Modal>({ modalText: '', modalStatus: '' })
  .on(setModal, (_, value) => value);
