import { GET_CREATED_ITEMS, GET_MARKET_ITEMS, GET_MY_ITEMS } from './types';

export function getMarketItems(payload: any) {
  return {
    type: GET_MARKET_ITEMS,
    payload
  };
}

export function getCreatedItems(payload: any) {
  return {
    type: GET_CREATED_ITEMS,
    payload
  };
}

export function getMyItems(payload: any) {
  return {
    type: GET_MY_ITEMS,
    payload
  };
}
