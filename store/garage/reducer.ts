import { IAction } from '../storeInterfaces';
import { GET_GARAGE_ITEMS, GET_PURCHASED_ITEMS } from './types';

const initialState: IGarageState = {
  garage: []
};

const garageReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_GARAGE_ITEMS:
      return { ...state, garage: [...action.payload] };
    case GET_PURCHASED_ITEMS:
      return {
        ...state,
        garage: [...state.garage, ...action.payload]
      };
    default:
      return state;
  }
};

export interface IGarageState {
  garage: any;
}

export { garageReducer };
