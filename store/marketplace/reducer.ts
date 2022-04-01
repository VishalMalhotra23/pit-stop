import { IAction } from '../storeInterfaces';
import { GET_CREATED_ITEMS, GET_MARKET_ITEMS, GET_MY_ITEMS } from './types';

const initialState: IMarketplaceState = {
  marketplaceLoading: false,
  marketItems: [],
  myItems: [],
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
    case GET_MY_ITEMS:
      return {
        ...state,
        marketplaceLoading: false,
        myItems: action.payload
      };
    case GET_CREATED_ITEMS:
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
  myItems: any;
  createdItems: any;
  marketplaceError: string | null;
}

export { marketplaceReducer };
