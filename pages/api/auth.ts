import type { NextApiRequest, NextApiResponse } from 'next';
import router from '../../util/router';
import { v4 as uuidv4 } from 'uuid';

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  try {
    const userData = await router.get(
      `/users.json?orderBy="address"&equalTo="${address}"`
    );
    let userD = userData.data;

    let user = userD[Object.keys(userD)[0]];

    let id;

    if (!user) {
      id = uuidv4();

      user = {
        address,
        nonce: Math.floor(Math.random() * 10000000),
        points: 0,
        username: `Racer${Math.floor(Math.random() * 100000)}`,
        pfp: 'https://ipfs.infura.io/ipfs/QmNg4MhiUJ9pCJmt81dHhTpA1FbSj7pnXLoGiVwBr852Da'
      };

      await router.put(`/users/${id}.json`, user);
    } else {
      id = Object.keys(userD)[0];
      const nonce = Math.floor(Math.random() * 10000000);
      user.nonce = nonce;
      await router.put(`/users/${id}.json`, user);
    }

    res.status(200).json({
      address: user.address,
      id,
      nonce: user.nonce,
      success: true
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  address?: string;
  nonce?: string;
  id?: string;
  success: boolean;
};

// let obj = {
//   ['c700713e-477a-402f-ac72-e59c88cb62ec']: {
//     address: '0x73AE27967C2C98Dc168EC8f2b4cB1f2412239DEd',
//     history: [[Object], [Object], [Object], [Object]],
//     nonce: 5813866,
//     pfp: 'https://ipfs.infura.io/ipfs/QmdYWioi4HTRgCkaPW1BY27CEAaVpaFnBBcE8DUW3Y7Tj7',
//     points: 37,
//     username: 'Racer84620'
//   }
// };
