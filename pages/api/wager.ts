import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function wager(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token, itemId, driver } = req.query;

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    //@ts-ignore
    const { id } = decoded.user;
    console.log(id);

    const wager = {
      itemId,
      driver
    };

    await router.put(`/users/${id}/wager.json`, wager);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
};
