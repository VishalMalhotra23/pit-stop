import { AUTH_SUCCESS, SIGN_OUT } from './types';

export function authSuccess(payload: IPayload) {
  return {
    type: AUTH_SUCCESS,
    payload
  };
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}

interface IPayload {
  address: string;
  token: string;
}
