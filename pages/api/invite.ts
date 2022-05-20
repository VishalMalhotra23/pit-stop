import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function invite(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token, invitecode } = req.query;

  try {
    const codesData = await router.get(`/invitecodes/${invitecode}.json`);
    let code = codesData.data;

    if (!code) {
      res.status(200).json({
        success: false,
        message: 'Invalid code'
      });
    } else {
      if (code.used) {
        res.status(200).json({
          success: false,
          message: 'Code already used'
        });
      } else {
        code.used = true;
        await router.put(`/invitecodes/${invitecode}.json`, code);

        const decoded = jwt.verify(
          token as string,
          process.env.JWT_SECRET as string
        );
        //@ts-ignore
        const { id } = decoded.user;

        const userData = await router.get(`/users/${id}.json`);
        let user = userData.data;

        user.access = true;

        await router.put(`/users/${id}.json`, user);

        res.status(200).json({
          success: true,
          user,
          message: 'Verified'
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
  message?: string;
  user?: any;
};
