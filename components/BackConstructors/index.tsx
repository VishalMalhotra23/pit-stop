import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import BackConstructorModal from '../BackConstructorModal';
import ConstructorBacked from '../ConstructorBacked';
import ConstructorsCarousel from '../ConstructorsCarousel';

const BackConstructors = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [showModal, setShowModal] = useState(false);

  const [selectedConstructorKey, setSelectedConstructorKey] = useState('');
  const [selectedConstructorName, setSelectedConstructorName] = useState('');

  if (user.constructorwager) return <ConstructorBacked />;

  return (
    <>
      {showModal && (
        <BackConstructorModal
          constructorKey={selectedConstructorKey}
          constructorName={selectedConstructorName}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="mt-7">
        <h1 className="text-2xl text-white font-bold my-2 text-left">
          Constructors
        </h1>
        <div className="mt-5 flex">
          <ConstructorsCarousel
            setSelectedConstructorKey={setSelectedConstructorKey}
            setSelectedConstructorName={setSelectedConstructorName}
            setShowModal={setShowModal}
          />
        </div>
      </div>
    </>
  );
};

export default BackConstructors;
