import Image from 'next/image';
import Link from 'next/link';

const MarketplaceCard = ({ NFT }: IMarketplaceCardProps) => {
  console.log(NFT);

  return (
    <Link href={`/marketplace/nft/${NFT.itemId}`}>
      <div className="cursor-pointer border-2 p-3 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg flex">
        <div className="h-full flex flex-col justify-evenly">
          <Image src={NFT.image} width={266} height={79} />
          <button
            className="my-4 bg-gradient-to-r from-redTwo to-redTwo rounded-lg w-36 mx-auto py-2 text-white text-xs font-bold"
            onClick={() => null}
          >
            Buy Now
          </button>
        </div>
        <div className="h-full flex flex-col justify-evenly text-left border-l-2 border-gray-mute pl-8">
          <h3 className="text-gray-mute text-sm font-semibold">Livery</h3>
          <h1 className="text-white text-base font-bold">{NFT.name}</h1>
          <h3 className="text-gray-mute text-sm font-semibold">Points</h3>
          <h1 className="text-white text-base font-bold">{NFT.points}</h1>
          <h3 className="text-gray-mute text-sm font-semibold">Price</h3>
          <h1 className="text-white text-base font-bold">{NFT.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default MarketplaceCard;

interface IMarketplaceCardProps {
  NFT: any;
}
