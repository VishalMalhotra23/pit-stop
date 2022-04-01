import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  console.log(address);

  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    console.log(user);

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  user?: any;
  success: boolean;
};
