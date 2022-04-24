import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getLeaderboard } from '../store/leaderboard/actions';

export default function useLeaderboard() {
  const dispatch = useDispatch();

  const fetchLeaderboard = useCallback(async () => {
    const leaderboardData = await fetch(`/api/leaderboard`);
    const leaderboard = await leaderboardData.json();
    // @ts-ignore
    dispatch(getLeaderboard(leaderboard.leaderboard));
  }, []);

  return {
    fetchLeaderboard
  };
}
