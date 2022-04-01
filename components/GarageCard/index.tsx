import Image from 'next/image';
import Link from 'next/link';

const GarageCard = ({ NFT }: IGarageCardProps) => {
  console.log(NFT);

  return (
    <Link href={`/garage/nft/${NFT.itemId}`}>
      <div className="cursor-pointer border-2 p-1 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg">
        <Image src={NFT.image} width={266} height={79} />
        <h1 className="text-white text-base font-semibold">{NFT.name}</h1>
        <h1 className="text-white text-base font-semibold">
          Points: {NFT.points}
        </h1>
      </div>
    </Link>
  );
};

export default GarageCard;

interface IGarageCardProps {
  NFT: any;
}
