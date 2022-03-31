import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const Navbar = () => {
  const { address, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="w-full px-10 py-4 font-semibold flex justify-between items-center text-white text-lg sticky top-0 bg-background z-20">
      <div className="text-redOne font-bold text-2xl">
        <Link href="/">Pit Stop</Link>
      </div>
      <div className="flex w-1/2 justify-evenly items-center">
        <Link href="/about">About</Link>
        <Link href="/race">Race</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/garage">Garage</Link>
        <div className="bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2">
          {authenticated
            ? `${address.substring(0, 5)}...${address.substring(
                address.length - 3
              )}`
            : `Connect Wallet`}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
