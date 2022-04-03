import { GET_GARAGE_ITEMS, GET_PURCHASED_ITEMS } from './types';

export function getGarageItems(payload: any) {
  return {
    type: GET_GARAGE_ITEMS,
    payload
  };
}

export function getPurchasedItems(payload: any) {
  return {
    type: GET_PURCHASED_ITEMS,
    payload
  };
}
