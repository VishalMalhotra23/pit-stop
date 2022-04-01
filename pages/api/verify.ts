import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import router from '../../util/router';

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let authenticated = false;
  const { address, signature } = req.query;
  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    console.log(user.nonce);

    const decodedAddress = ethers.utils.verifyMessage(
      user.nonce.toString(),
      signature as string
    );

    console.log(address, decodedAddress);

    if ((address as string).toLowerCase() === decodedAddress.toLowerCase())
      authenticated = true;

    res.status(200).json({
      username: user.username,
      points: user.points,
      authenticated: true,
      success: true
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  authenticated?: boolean;
  success: boolean;
  points?: number;
  username?: string;
};
