import { IAction } from '../storeInterfaces';
import { GET_USER } from './types';

const initialState: IUserState = {
  user: {}
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export interface IUserState {
  user: any;
}

export { userReducer };
