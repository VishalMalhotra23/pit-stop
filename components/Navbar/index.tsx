import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full px-10 py-5 font-semibold flex justify-between items-center text-white text-lg">
      <div className="text-redOne font-bold text-2xl">
        <Link href="/">Pit Stop</Link>
      </div>
      <div className="flex w-1/2 justify-evenly items-center">
        <Link href="/">About</Link>
        <Link href="/">Race</Link>
        <Link href="/">Marketplace</Link>
        <Link href="/">Leaderboard</Link>
        <Link href="/">Garage</Link>
        <div className="bg-gradient-to-r from-redOne to-redTwo rounded-full text-white text-base px-6 py-2">
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Navbar;
