import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useNFT from '../../hooks/useNFT';
import useNFTMarket from '../../hooks/useNFTMarket';
import useWindowSize from '../../hooks/useWindowSize';
import { RootState } from '../../store/rootReducer';

const Navbar = () => {
  const { address, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  function toggleNavbar() {
    setIsNavbarExpanded(!isNavbarExpanded);
  }

  const size = useWindowSize();

  if (size.width <= 768) {
    return isNavbarExpanded ? (
      <div className="flex flex-col bg-background px-6 drop-shadow-md pb-2 sticky top-0 z-20">
        <div className="flex flex-row justify-between items-center bg-background text-white h-14">
          <div className="text-redOne font-bold text-2xl">
            <span className="hover:text-redOne">
              <Link href="/">Pit Stop</Link>
            </span>
          </div>
          <div
            onClick={toggleNavbar}
            className="cursor-pointer text-white block text-sm mx-3"
          >
            <Image
              src={require(`../../public/img/menu.svg`)}
              width={20}
              height={20}
            />
          </div>
        </div>
        {authenticated ? <AuthLinks address={address} /> : <NoAuthLinks />}
      </div>
    ) : (
      <div className="bg-background flex sticky top-0 z-20 items-center justify-between px-6 text-white h-14">
        <div className="text-redOne font-bold text-2xl">
          <span className="hover:text-redOne">
            <Link href="/">Pit Stop</Link>
          </span>
        </div>
        <div
          onClick={toggleNavbar}
          className="cursor-pointer text-white block text-sm mx-3"
        >
          <Image
            src={require(`../../public/img/menu.svg`)}
            width={20}
            height={20}
          />
        </div>
      </div>
    );
  }

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
  const size = useWindowSize();

  if (size.width <= 768) {
    return (
      <>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/about">About</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/mint">Mint</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/race">Race</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/marketplace">Marketplace</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/leaderboard">Leaderboard</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/garage">Garage</Link>
        </span>
        <div className="flex justify-center items-center my-1 cursor-pointer bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2">
          {`${address.substring(0, 5)}...${address.substring(
            address.length - 3
          )}`}
        </div>
      </>
    );
  }

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
  const { fetchMintedNFTs } = useNFT();
  const { fetchMarketItems, fetchMyItems } = useNFTMarket();

  async function connectButtonHandler() {
    await connect();
    await fetchMintedNFTs();
    await fetchMarketItems();
    await fetchMyItems();
  }

  const size = useWindowSize();

  if (size.width <= 768) {
    return (
      <>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne">
          <Link href="/leaderboard">Leaderboard</Link>
        </span>
        <span className="flex justify-center items-center text-white text-base my-1 hover:text-redOne border-r-2 border-white pr-5">
          <Link href="/about">About</Link>
        </span>

        <div
          className="flex justify-center items-center my-1 cursor-pointer bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2"
          onClick={connectButtonHandler}
        >
          Connect Wallet
        </div>
      </>
    );
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
