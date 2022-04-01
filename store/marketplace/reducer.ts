import { IAction } from '../storeInterfaces';
import {
  GET_LISTED_ITEMS,
  GET_MARKET_ITEMS,
  GET_PURCHASED_ITEMS
} from './types';

const initialState: IMarketplaceState = {
  marketplaceLoading: false,
  marketItems: [],
  purchasedItems: [],
  createdItems: [],
  marketplaceError: null
};

const marketplaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_MARKET_ITEMS:
      return {
        ...state,
        marketplaceLoading: false,
        marketItems: action.payload
      };
    case GET_PURCHASED_ITEMS:
      return {
        ...state,
        marketplaceLoading: false,
        purchasedItems: action.payload
      };
    case GET_LISTED_ITEMS:
      return {
        ...state,
        marketplaceLoading: false,
        createdItems: action.payload
      };

    default:
      return state;
  }
};

export interface IMarketplaceState {
  marketplaceLoading: boolean;
  marketItems: any;
  purchasedItems: any;
  createdItems: any;
  marketplaceError: string | null;
}

export { marketplaceReducer };
