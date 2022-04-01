import { GET_GARAGE_ITEMS } from './types';

export function getGarageItems(payload: any) {
  return {
    type: GET_GARAGE_ITEMS,
    payload
  };
}
