import Link from 'next/link';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { RootState } from '../../store/rootReducer';

const Navbar = () => {
  const { address, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className="w-full px-10 py-4 font-semibold flex justify-between items-center bg-background text-white text-lg sticky top-0 z-20">
      <div className="text-redOne font-bold text-2xl">
        <span className="hover:text-redOne">
          <Link href="/">Pit Stop</Link>
        </span>
      </div>
      {authenticated ? <AuthLinks address={address} /> : <NoAuthLinks />}
    </div>
  );
};

export default Navbar;

const AuthLinks = ({ address }: IAuthLinkProps) => {
  return (
    <div className="flex w-3/5 justify-evenly items-center">
      <span className="hover:text-redOne">
        <Link href="/about">About</Link>
      </span>
      <span className="hover:text-redOne">
        <Link href="/mint">Mint</Link>
      </span>
      <span className="hover:text-redOne">
        <Link href="/race">Race</Link>
      </span>
      <span className="hover:text-redOne">
        <Link href="/marketplace">Marketplace</Link>
      </span>
      <span className="hover:text-redOne">
        <Link href="/leaderboard">Leaderboard</Link>
      </span>
      <span className="hover:text-redOne border-r-2 border-white pr-5">
        <Link href="/garage">Garage</Link>
      </span>
      <div className="cursor-pointer bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2">
        {`${address.substring(0, 5)}...${address.substring(
          address.length - 3
        )}`}
      </div>
    </div>
  );
};

const NoAuthLinks = () => {
  const { connect } = useAuth();

  async function connectButtonHandler() {
    await connect();
  }
  return (
    <div className="flex w-1/3 justify-evenly items-center">
      <span className="hover:text-redOne">
        <Link href="/leaderboard">Leaderboard</Link>
      </span>
      <span className="hover:text-redOne border-r-2 border-white pr-5">
        <Link href="/about">About</Link>
      </span>

      <div
        className="cursor-pointer bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2"
        onClick={connectButtonHandler}
      >
        Connect Wallet
      </div>
    </div>
  );
};

interface IAuthLinkProps {
  address: string;
}
