import { GET_USER } from './types';

export function getUser(payload: any) {
  return {
    type: GET_USER,
    payload
  };
}
