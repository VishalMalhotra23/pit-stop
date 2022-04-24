import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let authenticated = false;
  const { address, signature, id } = req.query;
  console.log(req.query);
  console.log(req.query.id);

  try {
    const userData = await router.get(`/users/${id}.json`);
    let user = userData.data;

    console.log(user.nonce);

    const decodedAddress = ethers.utils.verifyMessage(
      user.nonce.toString(),
      signature as string
    );

    console.log(address, decodedAddress);

    if ((address as string).toLowerCase() === decodedAddress.toLowerCase()) {
      authenticated = true;

      const payload = {
        user: {
          id: id as string
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(200).json({
            username: user.username,
            points: user.points,
            authenticated: true,
            success: true,
            token
          });
        }
      );
    } else {
      console.log('address not matched');

      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}

type Data = {
  authenticated?: boolean;
  success: boolean;
  points?: number;
  username?: string;
  token?: string;
};
