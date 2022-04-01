import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function wager(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { driver } = req.query;

  console.log(driver);

  try {
    const raceData = await axios.get(
      'https://ergast.com/api/f1/current/last/results.json'
    );

    const results = raceData.data.MRData.RaceTable.Races[0].Results;

    let standings: any = [];

    results.map((result: any) => {
      let standing = {
        position: result.position,
        points: result.points,
        name: `${result.Driver.givenName} ${result.Driver.familyName}`
      };

      standings.push(standing);
    });

    console.log(standings);

    res.status(200).json({ success: true, points: 100 });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

type Data = {
  success: boolean;
  points?: number;
};
