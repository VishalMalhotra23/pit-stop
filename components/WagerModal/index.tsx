import Image from 'next/image';
import { useSelector } from 'react-redux';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';
import GarageCard from '../GarageCard';

const WagerModal = ({
  driverKey,
  driverName,
  closeModal
}: IWagerModalProps) => {
  const { garage } = useSelector((state: RootState) => state.garage);
  const { address } = useSelector((state: RootState) => state.auth);
  const { fetchUser } = useUser();

  async function backDriver(driver: string, itemId: number) {
    const response = await fetch(
      `/api/wager?address=${address}&driver=${driver}&itemId=${itemId}`
    );
    const data = await response.json();
    console.log(data);
    await fetchUser(address);
    closeModal();
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-20"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={() => closeModal()}
    >
      <div
        className="w-1/2 h-3/4 bg-gray z-30 rounded-lg p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-white text-xl font-semibold">
          Select a car from your garage to support{' '}
          <span className="text-redOne">{driverName}</span>
        </h1>
        {garage.length > 0 ? (
          <div className="grid grid-cols-2 gap-10 mt-10">
            {garage.map((ownedItem: any) => (
              <span onClick={() => backDriver(driverKey, ownedItem.itemId)}>
                <GarageCard
                  key={ownedItem.tokenId ? ownedItem.tokenId : ownedItem.itemId}
                  NFT={ownedItem}
                />
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-white text-center font-semibold text-lg">
              No cars in your garage yet!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default WagerModal;

interface IWagerModalProps {
  driverKey: string;
  driverName: string;
  closeModal: Function;
}
