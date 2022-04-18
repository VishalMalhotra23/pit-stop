import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token, url, username } = req.query;

  console.log(token);

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

    if (url) user.pfp = url;
    if (username) user.username = username;

    await router.put(`/users/${id}.json`, user);

    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  user?: any;
  success: boolean;
};
