import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';
import { RootState } from '../../store/rootReducer';

const Leaderboard: NextPage = () => {
  const { leaderboard } = useSelector((state: RootState) => state.leaderboard);

  return (
    <div className="h-screen text-center text-red-700">
      <Head>
        <title>Leaderboard | Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="flex flex-col">
        <h1 className="text-white text-3xl font-semibold">Leaderboard</h1>
        <div className="mx-auto h-0.5 w-64 bg-gradient-to-r from-redOne to-redTwo"></div>

        <div className="bg-gray grid grid-cols-4 gap-2 w-1/2 mx-auto p-10 rounded-lg text-center">
          <h3 className=" text-white text-base font-bold">Rank</h3>
          <h3 className=" text-white text-base font-bold">Username</h3>
          <h3 className=" text-white text-base font-bold">Wallet Address</h3>
          <h3 className="text-white text-base font-bold">Points</h3>
          <div className="mx-auto h-0.5 w-full bg-gradient-to-r from-redOne to-redTwo col-span-4"></div>
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((user: any, i: number) => (
              <>
                <h3 className="text-white text-sm">{i + 1}</h3>
                <h3 className="text-white text-sm">{user.username}</h3>
                <h3 className="text-white text-sm">
                  {`${user.address.substring(0, 5)}...${user.address.substring(
                    user.address.length - 4
                  )}`}
                </h3>
                <h3 className="text-white text-sm">{user.points}</h3>
              </>
            ))
          ) : (
            <h1 className="text-center my-10 text-white text-sm">
              No leaderboard data to show
            </h1>
          )}{' '}
        </div>
      </div>
    </div>
  );
};

// export default withAuth(Leaderboard); //TODO: UNCOMMENT
export default Leaderboard;
