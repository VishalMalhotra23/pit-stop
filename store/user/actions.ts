import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './types';

export function getUserRequest() {
  return {
    type: GET_USER
  };
}

export function getUserError(message: string) {
  return {
    type: GET_USER_ERROR,
    payload: message
  };
}

export function getUserSuccess(payload: any) {
  return {
    type: GET_USER_SUCCESS,
    payload
  };
}
