import { IAction } from '../storeInterfaces';

import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './types';

const initialState: IUserState = {
  userLoading: false,
  user: [],
  userError: null
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userLoading: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload
      };
    case GET_USER_ERROR:
      return {
        ...state,
        userLoading: false,
        userError: action.payload
      };
    default:
      return state;
  }
};

export interface IUserState {
  userLoading: boolean;
  user: any;
  userError: string | null;
}

export { userReducer };
