import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useLeaderboard from '../../hooks/useLeaderboard';
import useNFT from '../../hooks/useNFT';
import useNFTMarket from '../../hooks/useNFTMarket';

const Boot = () => {
  const { connect } = useAuth();
  const { fetchMintedNFTs } = useNFT();
  const { fetchMarketItems, fetchMyItems } = useNFTMarket();
  const { fetchLeaderboard } = useLeaderboard();

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
