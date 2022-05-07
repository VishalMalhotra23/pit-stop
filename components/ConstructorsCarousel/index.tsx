import Image from 'next/image';
import React from 'react';
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps,
  ResponsiveContainerProps
} from 'react-stacked-center-carousel';
import TEAMS from '../../data/teams.json';
import RACE from '../../data/race.json';

const ConstructorsCarousel = ({
  setSelectedConstructorKey,
  setSelectedConstructorName,
  setShowModal
}: IConstructorsCarouselProps) => {
  const ConstructorData = TEAMS.map((team) => {
    return {
      ...team,
      setSelectedConstructorKey,
      setSelectedConstructorName,
      setShowModal
    };
  });

  const ref = React.useRef<ResponsiveContainerProps>();

  return (
    <div className="mx-auto w-2/3 flex items-start">
      <div
        className="mt-20 cursor-pointer"
        //  @ts-ignore
        onClick={() => ref.current.goBack()}
      >
        <Image
          src={require(`../../public/img/chevron-left.svg`)}
          width={38}
          height={38}
        />
      </div>
      <ResponsiveContainer
        // @ts-ignore
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // let currentVisibleSlide = 3;
          // let slideWidth = 500;
          // if (parentWidth <= 480) {
          //   currentVisibleSlide = 1;
          //   slideWidth = 300;
          // }
          return (
            <StackedCarousel
              ref={carouselRef}
              data={ConstructorData}
              carouselWidth={360}
              slideWidth={170}
              slideComponent={Slide}
              maxVisibleSlide={3}
              currentVisibleSlide={3}
              useGrabCursor={true}
              height={300}
              disableSwipe
            />
          );
        }}
      />
      <div
        className="mt-20 cursor-pointer"
        //@ts-ignore
        onClick={() => ref.current.goNext()}
      >
        <Image
          src={require(`../../public/img/chevron-right.svg`)}
          width={38}
          height={38}
        />
      </div>
    </div>
  );
};
export default ConstructorsCarousel;

const Slide = React.memo(function (props: StackedCarouselSlideProps) {
  const { data, dataIndex, slideIndex } = props;
  const {
    key,
    name,
    setShowModal,
    setSelectedConstructorKey,
    setSelectedConstructorName
  } = data[dataIndex];

  return (
    <div>
      <Image
        src={require(`../../public/img/teams/${key}.png`)}
        width={180}
        height={180}
      />
      {slideIndex === 0 && (
        <>
          <h1 className="text-white my-3 font-semibold text-lg">{name}</h1>
          {RACE.timestamp > Math.round(new Date().getTime() / 1000) && (
            <button
              onClick={() => {
                setShowModal(true);
                setSelectedConstructorKey(key);
                setSelectedConstructorName(name);
              }}
              className="border-2 border-black my-1 bg-gradient-to-r from-redOne to-redTwo text-white font-semibold text-base py-2 px-10 rounded-xl"
            >
              Support
            </button>
          )}
        </>
      )}
    </div>
  );
});

Slide.displayName = 'Slide';

interface IConstructorsCarouselProps {
  setShowModal: any;
  setSelectedConstructorKey: any;
  setSelectedConstructorName: any;
}
