import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import router from '../../util/router';
import jwt from 'jsonwebtoken';

export default async function driverpoints(
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

    const userData = await router.get(`/users/${id}.json`);
    let user = userData.data;

    const driver = user.driverwager.driver;
    const itemId = user.driverwager.itemId;

    const raceData = await axios.get(
      'https://ergast.com/api/f1/current/last/results.json'
    );

    const year = raceData.data.MRData.RaceTable.season;
    const round = raceData.data.MRData.RaceTable.round;

    const results = raceData.data.MRData.RaceTable.Races[0].Results;

    const qualiData = await axios.get(
      `https://ergast.com/api/f1/${year}/${round}/qualifying.json`
    );

    const qualis = qualiData.data.MRData.RaceTable.Races[0].QualifyingResults;

    const raceStandings = results.map((result: any) => {
      let raceStanding = {
        position: result.position,
        points: parseInt(result.points),
        grid: parseInt(result.grid),
        name: `${result.Driver.givenName.toLowerCase()}-${result.Driver.familyName.toLowerCase()}`,
        fl: formatLapTimes(result.FastestLap.Time.time)
      };

      if (raceStanding.name === 'nico-hülkenberg')
        raceStanding.name = 'nico-hulkenberg';
      if (raceStanding.name === 'sergio-pérez')
        raceStanding.name = 'sergio-perez';

      return raceStanding;
    });

    const qualiStandings = qualis.map((quali: any) => {
      let qualiStanding = {
        name: `${quali.Driver.givenName.toLowerCase()}-${quali.Driver.familyName.toLowerCase()}`,
        q1: formatLapTimes(quali.Q1),
        q2: formatLapTimes(quali.Q2),
        q3: formatLapTimes(quali.Q3)
      };

      if (qualiStanding.name === 'nico-hülkenberg')
        qualiStanding.name = 'nico-hulkenberg';
      if (qualiStanding.name === 'sergio-pérez')
        qualiStanding.name = 'sergio-perez';

      return qualiStanding;
    });

    const driversData = raceStandings
      .filter((i: any) => i.position <= 10)
      .map((raceStanding: any) => {
        const qualiStanding = qualiStandings.find(
          (i: any) => i.name === raceStanding.name
        );

        return {
          ...raceStanding,
          ...qualiStanding
        };
      });

    const Q1Rs = getRelativeQ1(driversData.filter((i: any) => i.q1));
    const Q2Rs = getRelativeQ2(driversData.filter((i: any) => i.q2));
    const Q3Rs = getRelativeQ3(driversData.filter((i: any) => i.q3));
    const FLRs = getRelativeFL(driversData);

    const dataWithRelativeScores = driversData.map((i: any) => {
      const q1 = Q1Rs.find((item) => item.name === i.name);
      const q1r = q1 ? q1.Q1R : 0;
      const q2 = Q2Rs.find((item) => item.name === i.name);
      const q2r = q2 ? q2.Q2R : 0;
      const q3 = Q3Rs.find((item) => item.name === i.name);
      const q3r = q3 ? q3.Q3R : 0;
      const fl = FLRs.find((item) => item.name === i.name);
      const flr = fl ? fl.FLR : 0;

      return {
        ...i,
        q1r,
        q2r,
        q3r,
        flr
      };
    });

    let grandTotal = 0;

    dataWithRelativeScores.forEach((i: any) => {
      const { name, points, position, grid, q1r, q2r, q3r, flr } = i;

      if (name === driver) {
        const gd = grid - position;

        console.log('driver: ', driver);
        console.log('points: ', points);
        console.log('position: ', position);
        console.log('grid: ', grid);
        console.log('gd: ', gd);
        console.log('q1r: ', q1r);
        console.log('q2r: ', q2r);
        console.log('q3r: ', q3r);
        console.log('flr: ', flr);

        const f1Points = points;
        const pitStopBonus =
          0.33 * (gd + 0.5 * q1r + 1 * q2r + 2 * q3r + 3 * flr);

        console.log('f1Points: ', f1Points);
        console.log('pitStopBonus: ', pitStopBonus);

        const totalPoints = f1Points + pitStopBonus;

        grandTotal = Math.round(totalPoints * 100) / 100;
      }
    });

    user.points += grandTotal;
    user.driverwager = null;
    if (user.history)
      user.history.push({
        driver,
        race: raceData.data.MRData.RaceTable.Races[0].raceName,
        points: grandTotal
      });
    else
      user.history = [
        {
          driver,
          race: raceData.data.MRData.RaceTable.Races[0].raceName,
          points: grandTotal
        }
      ];
    await router.put(`/users/${id}.json`, user);

    res.status(200).json({ success: true, points: grandTotal, itemId });
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

function formatLapTimes(lapTime: string) {
  if (!lapTime || lapTime === '') return undefined;

  const min = parseInt(lapTime.split(':')[0]);
  const secs = parseFloat(lapTime.split(':')[1]);

  return min * 60 + secs;
}

function getRelativeQ1(x: any) {
  const arr = [...x];
  arr.sort((a, b) => a.q1 - b.q1);
  return arr.map((item, i) => ({
    ...item,
    Q1R: 9 - i
  }));
}

function getRelativeQ2(x: any) {
  const arr = [...x];
  arr.sort((a, b) => a.q2 - b.q2);
  return arr.map((item, i) => ({
    ...item,
    Q2R: 9 - i
  }));
}

function getRelativeQ3(x: any) {
  const arr = [...x];
  arr.sort((a, b) => a.q3 - b.q3);
  return arr.map((item, i) => ({
    ...item,
    Q3R: 9 - i
  }));
}

function getRelativeFL(x: any) {
  const arr = [...x];
  arr.sort((a, b) => a.fl - b.fl);
  return arr.map((item, i) => ({
    ...item,
    FLR: 9 - i
  }));
}
