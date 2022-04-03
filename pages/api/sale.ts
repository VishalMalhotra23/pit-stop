import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function sale(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, points, seller } = req.query;

  try {
    let userData = await router.get(`/users/${seller}.json`);
    let user = userData.data;

    const thePoints = parseInt(points as string);

    user.points -= thePoints;

    await router.put(`/users/${seller}.json`, user);

    userData = await router.get(`/users/${address}.json`);
    user = userData.data;

    user.points += thePoints;

    await router.put(`/users/${address}.json`, user);

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
  user?: any;
};
