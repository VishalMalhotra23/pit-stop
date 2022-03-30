import { IAction } from '../storeInterfaces';

import { GET_GARAGE, GET_GARAGE_SUCCESS, GET_GARAGE_ERROR } from './types';

const initialState: IGarageState = {
  garageLoading: false,
  garage: [],
  garageError: null
};

const garageReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_GARAGE:
      return { ...state, garageLoading: true };
    case GET_GARAGE_SUCCESS:
      return { ...state, garageLoading: false, garage: action.payload };
    case GET_GARAGE_ERROR:
      return { ...state, garageLoading: false, garageError: action.payload };
    default:
      return state;
  }
};

export interface IGarageState {
  garageLoading: boolean;
  garage: any;
  garageError: string | null;
}

export { garageReducer };
