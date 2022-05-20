import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import BackConstructors from '../../components/BackConstructors';
import BackDrivers from '../../components/BackDrivers';
import NEXTRACE from '../../data/next-race.json';
import { RootState } from '../../store/rootReducer';
import InviteCodeInput from '../InviteCodeInput';

const CompeteDashboard = () => {
  const { bootLoading } = useSelector((state: RootState) => state.boot);
  const { user } = useSelector((state: RootState) => state.user);

  if (bootLoading)
    return (
      <div className="flex w-full flex-1 justify-center items-center">
        <TailSpin color="#EF473A" height={80} width={80} />
      </div>
    );

  if (user.access)
    return (
      <div className="h-full p-6 flex-1">
        <BackDrivers />
        {user.driverwager && user.constructorwager && (
          <div className="mx-auto h-0.5 w-96 bg-gray-mute my-8"></div>
        )}
        <BackConstructors />
      </div>
    );

  return (
    <div className="min-h-full py-6 px-20 flex flex-1 justify-center items-center">
      <div>
        <h1 className="text-white text-3xl font-semibold">
          Let&apos;s go racing in {NEXTRACE.country}!
        </h1>
        <InviteCodeInput />
      </div>
    </div>
  );
};

export default CompeteDashboard;
