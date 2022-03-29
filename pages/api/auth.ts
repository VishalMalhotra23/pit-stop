import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    if (!user) {
      user = {
        address,
        nonce: Math.floor(Math.random() * 10000000)
      };

      await router.put(`/users/${address}.json`, user);
    } else {
      const nonce = Math.floor(Math.random() * 10000000);
      user.nonce = nonce;
      await router.put(`/users/${address}.json`, user);
    }

    res
      .status(200)
      .json({ address: user.address, nonce: user.nonce, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  address?: string;
  nonce?: string;
  success: boolean;
};
