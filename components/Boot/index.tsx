import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import useLeaderboard from '../../hooks/useLeaderboard';
import useNFT from '../../hooks/useNFT';
import useNFTMarket from '../../hooks/useNFTMarket';
import {
  bootLoadingFinished,
  bootLoadingStarted
} from '../../store/boot/actions';

const Boot = () => {
  const { connect } = useAuth();
  const { fetchMintedNFTs } = useNFT();
  const { fetchMarketItems, fetchMyItems } = useNFTMarket();
  const { fetchLeaderboard } = useLeaderboard();

  const dispatch = useDispatch();

  // @ts-ignore
  useEffect(async () => {
    dispatch(bootLoadingStarted());
    await fetchLeaderboard();

    const cachedToken = localStorage.getItem('token');

    if (cachedToken) {
      // @ts-ignore
      const expiry = jwt.decode(cachedToken)['exp'];

      if (expiry > Math.round(new Date().getTime() / 1000)) {
        await connect();
        await fetchMintedNFTs();
        await fetchMarketItems();
        await fetchMyItems();
      } else {
        localStorage.removeItem('token');
      }
    }

    dispatch(bootLoadingFinished());
  }, []);

  return null;
};

export default Boot;
