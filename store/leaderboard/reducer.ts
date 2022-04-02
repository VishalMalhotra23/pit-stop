import { IAction } from '../storeInterfaces';

import { GET_LEADERBOARD } from './types';

const initialState: IUserState = {
  leaderboard: []
};

const leaderboardReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload
      };
    default:
      return state;
  }
};

export interface IUserState {
  leaderboard: any;
}

export { leaderboardReducer };
