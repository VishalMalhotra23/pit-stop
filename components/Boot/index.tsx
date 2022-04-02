import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useLeaderboard from '../../hooks/useLeaderboard';
import useNFT from '../../hooks/useNFT';
import useNFTMarket from '../../hooks/useNFTMarket';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';

const Boot = () => {
  const { connect } = useAuth();
  const { fetchMintedNFTs } = useNFT();
  const { fetchMarketItems, fetchMyItems } = useNFTMarket();
  const { fetchLeaderboard } = useLeaderboard();

  const { address, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // @ts-ignore
  useEffect(async () => {
    await connect();
    await fetchMintedNFTs();
    await fetchMarketItems();
    await fetchMyItems();
    await fetchLeaderboard();
  }, []);

  return null;
};

export default Boot;
