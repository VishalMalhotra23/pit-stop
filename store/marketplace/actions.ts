import {
  GET_LISTED_ITEMS,
  GET_MARKET_ITEMS,
  GET_PURCHASED_ITEMS
} from './types';

export function getMarketItems(payload: any) {
  return {
    type: GET_MARKET_ITEMS,
    payload
  };
}

export function getListedItems(payload: any) {
  return {
    type: GET_LISTED_ITEMS,
    payload
  };
}

export function getPurchasedItems(payload: any) {
  return {
    type: GET_PURCHASED_ITEMS,
    payload
  };
}
