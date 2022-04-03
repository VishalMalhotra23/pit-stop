import { IAction } from '../storeInterfaces';
import { GET_LISTED_ITEMS, GET_MARKET_ITEMS } from './types';

const initialState: IMarketplaceState = {
  marketItems: [],
  listedItems: []
};

const marketplaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.payload
      };
    case GET_LISTED_ITEMS:
      return {
        ...state,
        listedItems: action.payload
      };
    default:
      return state;
  }
};

export interface IMarketplaceState {
  marketItems: any;
  listedItems: any;
}

export { marketplaceReducer };
