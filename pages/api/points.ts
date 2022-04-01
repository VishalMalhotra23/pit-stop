import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import router from '../../util/router';

export default async function wager(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;

  try {
    const userData = await router.get(`/users/${address}.json`);
    let user = userData.data;

    const driver = user.wager.driver;

    const raceData = await axios.get(
      'https://ergast.com/api/f1/current/last/results.json'
    );

    const results = raceData.data.MRData.RaceTable.Races[0].Results;

    let points = 0;

    results.map((result: any) => {
      let standing = {
        position: result.position,
        points: parseInt(result.points),
        name: `${result.Driver.givenName.toLowerCase()}-${result.Driver.familyName.toLowerCase()}`
      };

      if (standing.name === 'nico-hülkenberg')
        standing.name = 'nico-hulkenberg';
      if (standing.name === 'sergio-pérez') standing.name = 'sergio-perez';

      if (standing.name === driver) points = standing.points;
    });

    user.points += points;
    await router.put(`/users/${address}.json`, user);

    res.status(200).json({ success: true, points, itemId: user.wager.itemId });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
  points?: number;
  itemId?: number;
};
