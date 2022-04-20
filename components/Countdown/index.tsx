import { useEffect, useState } from 'react';

const Countdown = ({ timestamp, inverted }: ICountdownProps) => {
  const [loop, setLoop] = useState<any>();
  const [days, setDays] = useState('0');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');

  const countDownDate = timestamp * 1000;

  useEffect(() => {
    setLoop(
      setInterval(function () {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysString = days < 10 ? `0${days}` : `${days}`;
        const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
        const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

        setDays(daysString);
        setHours(hoursString);
        setMinutes(minutesString);
        setSeconds(secondsString);

        if (distance < 0) {
          clearInterval(loop);
          setDays('0');
          setHours('0');
          setMinutes('0');
          setSeconds('0');
        }
      }, 1000)
    );

    return () => {
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="w-3/4 mx-auto text-center flex justify-center">
      {inverted ? (
        <>
          <TimeUnitInvertedColors unit="Days" value={days} />
          <TimeUnitInvertedColors unit="Hours" value={hours} />
          <TimeUnitInvertedColors unit="Minutes" value={minutes} />
          <TimeUnitInvertedColors unit="Seconds" value={seconds} />
        </>
      ) : (
        <>
          <TimeUnit unit="Days" value={days} />
          <TimeUnit unit="Hours" value={hours} />
          <TimeUnit unit="Minutes" value={minutes} />
          <TimeUnit unit="Seconds" value={seconds} />
        </>
      )}
    </div>
  );
};

const TimeUnit = ({ unit, value }: ITimeUnitProps) => {
  return (
    <div className="text-center mx-2">
      <div className="mx-auto w-12 h-12 rounded-lg bg-gray text-white flex justify-center items-center font-semibold text-xl">
        {value}
      </div>
      <span className="text-sm">{unit}</span>
    </div>
  );
};

const TimeUnitInvertedColors = ({ unit, value }: ITimeUnitProps) => {
  return (
    <div className="text-center mx-2">
      <div className="mx-auto w-12 h-12 rounded-lg bg-redOne text-white flex justify-center items-center font-semibold text-xl">
        {value}
      </div>
      <span className="text-sm text-white">{unit}</span>
    </div>
  );
};

export default Countdown;

interface ITimeUnitProps {
  unit: string;
  value: string;
}

interface ICountdownProps {
  timestamp: number;
  inverted?: boolean;
}
