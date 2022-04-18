import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function sale(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token, points, seller } = req.query;

  try {
    let userData = await router.get(
      `/users.json?orderBy="address"&equalTo="${seller}"`
    );
    let user = userData.data;

    const thePoints = parseInt(points as string);

    user.points -= thePoints;

    await router.put(`/users/${seller}.json`, user);

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    //@ts-ignore
    const { id } = decoded.user;
    console.log(id);

    userData = await router.get(`/users/${id}.json`);
    user = userData.data;

    user.points += thePoints;

    await router.put(`/users/${id}.json`, user);

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
