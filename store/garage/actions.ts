import { GET_GARAGE, GET_GARAGE_SUCCESS, GET_GARAGE_ERROR } from './types';

export function getGarageRequest() {
  return {
    type: GET_GARAGE
  };
}

export function getGarageError(message: string) {
  return {
    type: GET_GARAGE_ERROR,
    payload: message
  };
}

export function getGarageSuccess(payload: any) {
  return {
    type: GET_GARAGE_SUCCESS,
    payload
  };
}
