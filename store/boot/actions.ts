import { BOOT_LOADING_FINISHED, BOOT_LOADING_STARTED } from './types';

export function bootLoadingStarted() {
  return {
    type: BOOT_LOADING_STARTED
  };
}

export function bootLoadingFinished() {
  return {
    type: BOOT_LOADING_FINISHED
  };
}
