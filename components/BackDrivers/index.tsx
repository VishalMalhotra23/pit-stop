import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DRIVERS from '../../data/drivers.json';
import RACE from '../../data/race.json';
import TEAMS from '../../data/teams.json';
import { RootState } from '../../store/rootReducer';
import BackDriverModal from '../BackDriverModal';
import DriverBacked from '../DriverBacked';

const BackDrivers = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [team, setTeam] = useState('mclaren');

  const [showModal, setShowModal] = useState(false);

  const [selectedDriverKey, setSelectedDriverKey] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');

  if (user.driverwager) return <DriverBacked />;

  return (
    <>
      {showModal && (
        <BackDriverModal
          driverKey={selectedDriverKey}
          driverName={selectedDriverName}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="">
        <h1 className="text-2xl text-white font-bold my-2 text-left">Teams</h1>
        <div className="mt-5 flex w-full justify-between">
          {TEAMS.map((team) => {
            return (
              <div
                key={team.key}
                onClick={() => setTeam(team.key)}
                className="cursor-pointer text-white"
              >
                <Image
                  src={require(`../../public/img/teams/${team.key}.png`)}
                  width={56}
                  height={56}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-7">
        <h1 className="text-2xl text-white font-bold my-2 text-left">
          Drivers
        </h1>
        <div className="mt-5 flex">
          {/* @ts-ignore */}
          {DRIVERS[`${team}`].map((driver, i) => {
            return (
              <div
                key={driver.key}
                className={`w-full ${i === 0 && 'border-r-2 border-gray-mute'}`}
              >
                <Image
                  src={require(`../../public/img/drivers/${driver.key}.png`)}
                  width={249}
                  height={200}
                />
                <h3 className="my-3 text-lg font-semibold text-white">
                  {driver.name}
                </h3>
                {RACE.timestamp > Math.round(new Date().getTime() / 1000) && (
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setSelectedDriverKey(driver.key);
                      setSelectedDriverName(driver.name);
                    }}
                    className="border-2 border-black my-1 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-base py-2 px-10 rounded-xl"
                  >
                    Support
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BackDrivers;
