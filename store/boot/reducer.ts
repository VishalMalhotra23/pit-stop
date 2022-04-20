import { IAction } from '../storeInterfaces';

import { BOOT_LOADING_FINISHED, BOOT_LOADING_STARTED } from './types';

const initialState: IBootState = {
  bootLoading: false
};

const bootReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case BOOT_LOADING_STARTED:
      return {
        ...state,
        bootLoading: true
      };
    case BOOT_LOADING_FINISHED:
      return {
        bootLoading: false
      };
    default:
      return state;
  }
};

export interface IBootState {
  bootLoading: boolean;
}

export { bootReducer };
