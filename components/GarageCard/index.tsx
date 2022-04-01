import Image from 'next/image';

const GarageCard = ({ NFT }: IGarageCardProps) => {
  console.log(NFT);

  return (
    <div className="border-2 p-1 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg">
      <Image src={NFT.image} width={266} height={79} />
      <h1 className="text-white text-base font-semibold">{NFT.name}</h1>
      <h1 className="text-white text-base font-semibold">
        Points: {NFT.points}
      </h1>
    </div>
  );
};

export default GarageCard;

interface IGarageCardProps {
  NFT: any;
}
