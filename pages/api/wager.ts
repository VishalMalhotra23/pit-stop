import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';

export default async function wager(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address, itemId, driver } = req.query;

  try {
    const wager = {
      itemId,
      driver
    };

    await router.put(`/users/${address}/wager.json`, wager);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
};
