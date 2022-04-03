import Image from 'next/image';
import Link from 'next/link';

const GarageCard = ({ NFT, link }: IGarageCardProps) => {
  console.log(NFT);

  return (
    <Link href={`/${link}/nft/${link === 'garage' ? NFT.itemId : NFT.tokenId}`}>
      <div className="cursor-pointer border-2 px-1 py-2 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg">
        <Image src={NFT.image} width={266} height={79} />
        <h1 className="text-white text-lg font-bold">{NFT.name}</h1>
      </div>
    </Link>
  );
};

export default GarageCard;

interface IGarageCardProps {
  NFT: any;
  link: string;
}
