import { AUTH_SUCCESS } from './types';

export function authSuccess(address: string) {
  return {
    type: AUTH_SUCCESS,
    payload: address
  };
}
