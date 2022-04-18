import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function wager(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token } = req.query;

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

    const driver = user.wager.driver;
    const itemId = user.wager.itemId;

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
    user.wager = null;
    if (user.history)
      user.history.push({
        driver,
        race: raceData.data.MRData.RaceTable.Races[0].raceName,
        points
      });
    else
      user.history = [
        {
          driver,
          race: raceData.data.MRData.RaceTable.Races[0].raceName,
          points
        }
      ];
    await router.put(`/users/${id}.json`, user);

    res.status(200).json({ success: true, points, itemId });
  } catch (error) {
    console.log(error);

    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
  points?: number;
  itemId?: number;
};
