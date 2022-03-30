import Image from 'next/image';

const NFTCard = ({ team }: INFTCardProps) => {
  return (
    <div
      style={{ width: '580px', height: '386px' }}
      className="border-2 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg flex items-center justify-center"
    >
      <Image
        src={require(`../../public/img/cars/${team}.png`)}
        width={526}
        height={156}
      />
    </div>
  );
};

export default NFTCard;

interface INFTCardProps {
  team: string;
}
