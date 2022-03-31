import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useNFT from '../../hooks/useNFT';

const Boot = () => {
  const { connect } = useAuth();
  const { fetchMintedNFTs } = useNFT();

  useEffect(async () => {
    await connect();
    await fetchMintedNFTs();
  }, []);

  return null;
};

export default Boot;
