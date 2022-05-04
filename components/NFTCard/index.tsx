import Image from 'next/image';

const NFTCard = ({ team, img, compact }: INFTCardProps) => {
  return (
    <div
      style={{
        width: compact ? '580px' : '580px',
        height: compact ? '321px' : '386px'
      }}
      className="border-2 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg flex items-center justify-center"
    >
      <Image
        src={img ? img : require(`../../public/img/cars/${team}.png`)}
        width={526}
        height={156}
      />
    </div>
  );
};

export default NFTCard;

interface INFTCardProps {
  team?: string;
  img?: string;
  compact?: boolean;
}
