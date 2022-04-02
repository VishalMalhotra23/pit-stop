import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function leaderboard(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const usersData = await router.get(`/users.json`);
    let users = usersData.data;

    console.log(users);

    let leaderboard = [];

    for (const [key, value] of Object.entries(users)) {
      leaderboard.push({
        address: key,
        // @ts-ignore
        points: value.points,
        // @ts-ignore
        username: value.username
      });
    }

    const sortedLeaderboard = leaderboard.sort((a, b) =>
      a.points > b.points ? -1 : b.points > a.points ? 1 : 0
    );

    res.status(200).json({ leaderboard: sortedLeaderboard, success: true });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  leaderboard?: any;
  success: boolean;
};
