import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function sale(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, points } = req.query;

  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    user.points += points;

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
