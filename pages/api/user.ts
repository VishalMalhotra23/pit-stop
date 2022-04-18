import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token } = req.query;

  console.log(token);

  if (!token) {
    return res.status(400).json({ success: false });
  }

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    //@ts-ignore
    const { id } = decoded.user;
    console.log(id);

    const userData = await router.get(`/users/${id}.json`);
    let user = userData.data;

    console.log(user);

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  user?: any;
  success: boolean;
};
