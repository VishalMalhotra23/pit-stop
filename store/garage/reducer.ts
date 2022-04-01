import { IAction } from '../storeInterfaces';
import { GET_GARAGE_ITEMS } from './types';

const initialState: IGarageState = {
  garageLoading: false,
  garage: [],
  garageError: null
};

const garageReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_GARAGE_ITEMS:
      return { ...state, garageLoading: false, garage: action.payload };

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
