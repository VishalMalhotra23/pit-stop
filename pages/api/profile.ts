import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, url, username } = req.query;

  console.log(address);

  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    if (pfp) user.pfp = url;
    if (username) user.username = username;

    await router.put(`/users/${address}.json`, user);

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  user?: any;
  success: boolean;
};
