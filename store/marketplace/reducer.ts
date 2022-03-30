import { IAction } from '../storeInterfaces';

import {
  GET_MARKETPLACE,
  GET_MARKETPLACE_SUCCESS,
  GET_MARKETPLACE_ERROR
} from './types';

const initialState: IMarketplaceState = {
  marketplaceLoading: false,
  marketplace: [],
  marketplaceError: null
};

const marketplaceReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_MARKETPLACE:
      return { ...state, marketplaceLoading: true };
    case GET_MARKETPLACE_SUCCESS:
      return {
        ...state,
        marketplaceLoading: false,
        marketplace: action.payload
      };
    case GET_MARKETPLACE_ERROR:
      return {
        ...state,
        marketplaceLoading: false,
        marketplaceError: action.payload
      };
    default:
      return state;
  }
};

export interface IMarketplaceState {
  marketplaceLoading: boolean;
  marketplace: any;
  marketplaceError: string | null;
}

export { marketplaceReducer };
