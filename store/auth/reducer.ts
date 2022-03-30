import { IAction } from '../storeInterfaces';

import { AUTH_SUCCESS } from './types';

const initialState: IAuthState = {
  address: '',
  authenticated: false
};

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, address: action.payload, authenticated: true };

    default:
      return state;
  }
};

export interface IAuthState {
  address: string;
  authenticated: boolean;
}

export { authReducer };
