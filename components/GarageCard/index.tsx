import Image from 'next/image';

const GarageCard = () => {
  return (
    <div className="border-2 p-1 border-redOne bg-gradient-to-r from-gray-lighter to-gray-lightest rounded-lg">
      <Image
        src={require(`../../public/img/cars/ferrari.png`)}
        width={266}
        height={79}
      />
      <h1 className="text-white text-base font-semibold">Ferrari #333</h1>
    </div>
  );
};

export default GarageCard;
