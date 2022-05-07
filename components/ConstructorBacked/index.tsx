import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import RACE from '../../data/race.json';
import useLeaderboard from '../../hooks/useLeaderboard';
import useNFT from '../../hooks/useNFT';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';
import Countdown from '../Countdown';

const ConstructorBacked = () => {
  const { garage } = useSelector((state: RootState) => state.garage);
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  const { updateNFTPoints } = useNFT();
  const { fetchUser } = useUser();
  const { fetchLeaderboard } = useLeaderboard();

  async function claimPoints() {
    //fetch points to scored from F1 race standings and update garage points on firebase
    const response = await fetch(`/api/constructorpoints?token=${token}`);
    const data = await response.json();
    const pointsScored = data.points;

    //update token uri
    await updateNFTPoints(parseInt(data.itemId), pointsScored);

    //refetch user
    await fetchUser(token);
    await fetchLeaderboard();
  }

  return (
    <div className="mt-14 px-14 w-full flex items-center justify-center">
      <div>
        <Image
          src={require(`../../public/img/teams/${user.constructorwager.constructor}.png`)}
          width={180}
          height={180}
        />
        <p className="my-3 text-white font-semibold text-xl">
          Congratulations! You backed{' '}
          <span className="capitalize text-redOne">
            {user.constructorwager.constructor.replace('-', ' ')}
          </span>{' '}
          with your{' '}
          <span className="text-redOne">
            {
              garage.find(
                (item: any) => item.itemId == user.constructorwager.itemId
              ).name
            }
          </span>{' '}
          for the <span>{RACE.name}</span>.
        </p>
        {RACE.claim < Math.round(new Date().getTime() / 1000) ? (
          <button
            onClick={() => claimPoints()}
            className="border-2 border-black my-2 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-lg py-2 px-10 rounded-xl"
          >
            Claim
          </button>
        ) : (
          <div>
            <a
              href={`https://twitter.com/intent/tweet?text=I+am+backing+${user.constructorwager.constructor
                .replace('-', ' ')
                .replace(/(^\w|\s\w)/g, (m: any) => m.toUpperCase())}+for+the+${
                RACE.name
              }+${RACE.emoji}+with+my+${garage
                .find(
                  (item: any) => item.itemId == user.constructorwager.itemId
                )
                .name.replace(
                  '#',
                  '%23'
                )}+NFT+on+%40PitStop_HQ.+Let%27s+go+racing%21+%F0%9F%8F%81%0D%0A%0D%0ABack+your+constructor+now+on+-+playpitstop.racing%0D%0A%0D%0A+%23F1+%23${RACE.name
                .replace(/ /g, '')
                .replace('GrandPrix', 'GP')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-black my-3 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-lg py-2 px-10 rounded-xl flex items-center mx-auto">
                <Image
                  src={require(`../../public/img/twitter.svg`)}
                  width={18}
                  height={18}
                />
                <span className="ml-4">Tweet about it!</span>
              </button>
            </a>
            <h3 className="text-lg text-white font-semibold mt-2 mb-3">
              Claim in
            </h3>
            <Countdown inverted timestamp={RACE.claim} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstructorBacked;
