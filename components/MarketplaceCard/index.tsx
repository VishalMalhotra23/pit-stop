import Image from 'next/image';
import Link from 'next/link';

const MarketplaceCard = ({ NFT }: IMarketplaceCardProps) => {
  console.log(NFT);

  return (
    <div className="border-2 px-4 py-7 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg flex">
      <div className="h-full flex flex-col justify-between border-r-2 border-gray-mute pr-5">
        <Image src={NFT.image} width={266} height={79} />
        <Link href={`/marketplace/nft/${NFT.itemId}`}>
          <button
            className="border-2 border-black bg-gradient-to-r from-redOne to-redTwo rounded-lg w-36 mx-auto py-2 text-white text-base font-bold"
            onClick={() => null}
          >
            Buy Now
          </button>
        </Link>
      </div>
      <div className="h-full flex flex-col justify-evenly text-left pl-5">
        <h3 className="text-gray-mute text-base font-semibold">Livery</h3>
        <h1 className="text-white text-lg font-bold mt-1">{NFT.name}</h1>
        <h3 className="text-gray-mute text-base font-semibold mt-2">Points</h3>
        <h1 className="text-white text-lg font-bold mt-1">{NFT.points}</h1>
        <h3 className="text-gray-mute text-base font-semibold mt-2">Price</h3>
        <div className="flex items-center mt-1">
          <Image
            src={require(`../../public/img/matic.svg`)}
            width={21}
            height={20}
          />
          <h1 className="ml-3 text-white text-lg font-bold">
            {NFT.price} MATIC
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;

interface IMarketplaceCardProps {
  NFT: any;
}
