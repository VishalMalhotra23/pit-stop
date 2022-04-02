import { GET_LEADERBOARD } from './types';

export function getLeaderboard(payload: any) {
  return {
    type: GET_LEADERBOARD,
    payload
  };
}
