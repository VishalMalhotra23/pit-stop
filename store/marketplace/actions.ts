import {
  GET_MARKETPLACE,
  GET_MARKETPLACE_SUCCESS,
  GET_MARKETPLACE_ERROR
} from './types';

export function getMarketplaceRequest() {
  return {
    type: GET_MARKETPLACE
  };
}

export function getMarketplaceError(message: string) {
  return {
    type: GET_MARKETPLACE_ERROR,
    payload: message
  };
}

export function getMarketplaceSuccess(payload: any) {
  return {
    type: GET_MARKETPLACE_SUCCESS,
    payload
  };
}
