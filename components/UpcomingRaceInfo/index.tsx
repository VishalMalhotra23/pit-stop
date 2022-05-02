import Image from 'next/image';
import React from 'react';
import NEXTRACE from '../../data/next-race.json';
import Countdown from '../Countdown';

const UpcomingRaceInfo = () => {
  return (
    <div className="w-1/3 bg-gradient-to-b from-redOne to-redTwo rounded-lg flex flex-col items-start py-8 px-6 text-left">
      <div className="flex w-full justify-between items-center">
        <div>
          <h3 className="text-lg text-black font-semibold">Grand Prix</h3>
          <h4 className="text-lg text-white font-bold mt-1">{NEXTRACE.name}</h4>
        </div>
        <Image
          src={`https://ipfs.infura.io/ipfs/${NEXTRACE.flag}`}
          width={106}
          height={53}
        />
      </div>
      <h3 className="text-lg text-black font-semibold mt-2">Track</h3>
      <h4 className="text-lg text-white font-bold mt-1">{NEXTRACE.track}</h4>
      <h3 className="text-lg text-black font-semibold mt-2">Date</h3>
      <h4 className="text-lg text-white font-bold mt-1">{NEXTRACE.date}</h4>
      <h3 className="text-lg text-black font-semibold mt-2 mb-3">Begins in</h3>
      <Countdown timestamp={NEXTRACE.timestamp} />
      <div className="flex items-center justify-center w-full mt-3">
        <Image
          src={`https://ipfs.infura.io/ipfs/${NEXTRACE.circuit}`}
          width={377}
          height={270}
        />
      </div>
    </div>
  );
};

export default UpcomingRaceInfo;
