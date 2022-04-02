import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import RACE from '../data/race.json';
import ReactPlayer from 'react-player';

const Home: NextPage = () => {
  return (
    <div className="text-center text-red-700">
      <Head>
        <title>Pit Stop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="w-full mt-8 relative">
        <Image src={require(`../public/img/mesh.png`)} />
        <div className="absolute z-10 left-40 top-20 text-left">
          <h1 className="text-white text-5xl font-bold w-96">
            Built for the love of Racing.
          </h1>
          <p className="text-white text-xl mt-10">
            Build your garage. Back your favourite drivers.
            <br />
            Get to the top of leaderboard.
            <br />
            Let’s go racing.
          </p>
          <button className="mt-10 bg-gradient-to-r from-redOne to-redTwo rounded-lg px-10 py-2 font-semibold text-white text-xl">
            Get Started
          </button>
        </div>
        <div
          style={{
            position: 'absolute',
            right: '160px',
            top: '90px',
            boxShadow: '0 0 50px #CB2D3E',
            borderRadius: '12px'
          }}
        >
          <ReactPlayer
            url="https://ipfs.infura.io/ipfs/Qme5wyu9XTLvZbmrX8BeHTzq8bJZo4bAJdRKfZxxFAJMht"
            loop={true}
            muted={true}
            playing={true}
            style={{
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          />
        </div>
      </div>

      <div className="w-4/5 mx-auto my-10 grid grid-cols-3">
        <div className="px-10 py-3">
          <div className="h-64 flex items-center justify-center">
            <Image
              src={require(`../public/img/collect.svg`)}
              width={266}
              height={193}
            />
          </div>
          <h1 className="text-white font-bold text-3xl">Collect</h1>
          <p className="text-white text-base">
            Get started by minting the livery of your choice and create your own
            garage.
          </p>
        </div>
        <div className="px-10 py-3">
          <div className="h-64 flex items-center justify-center">
            <Image
              src={require(`../public/img/support.svg`)}
              width={233}
              height={190}
            />
          </div>
          <h1 className="text-white font-bold text-3xl">Support</h1>
          <p className="text-white text-base">
            Use your NFTs to back your favourite drivers in real world grand
            prix.
          </p>
        </div>
        <div className="px-10 py-3">
          <div className="h-64 flex items-center justify-center">
            <Image
              src={require(`../public/img/win.svg`)}
              width={372}
              height={193}
            />
          </div>
          <h1 className="text-white font-bold text-3xl">Win</h1>
          <p className="text-white text-base">
            Climb the leaderboards and earn rewards or sell your liveries on our
            marketplace.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-redOne to-redTwo w-full py-10">
        <h1 className="text-white text-center text-3xl font-bold">
          {RACE.name}
        </h1>
        <p className="text-white text-center text-lg mt-2">Starts In</p>
        <div className="w-1/4 mx-auto my-4">
          <Countdown timestamp={RACE.timestamp} />
        </div>
        <Link href="/race">
          <button className="border-2 border-black bg-gradient-to-r from-redOne to-redTwo rounded-lg px-10 py-2 font-semibold text-white text-xl">
            Let's Go!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
