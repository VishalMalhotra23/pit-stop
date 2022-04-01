import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../store/auth/actions';
import { getUserSuccess } from '../store/user/actions';
import useUser from './useUser';

export default function useAuth() {
  const dispatch = useDispatch();

  const { getUser } = useUser();

  const getWeb3Modal = useCallback(async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID
          }
        }
      }
    });
    return web3Modal;
  }, []);

  const connect = useCallback(async () => {
    const web3Modal = await getWeb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    signIn(connection, accounts[0]);
  }, []);

  const signIn = useCallback(async (connection: any, account: string) => {
    const authData = await fetch(`/api/auth?address=${account}`);
    const user = await authData.json();
    console.log(user.nonce);
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(user.nonce.toString());
    const response = await fetch(
      `/api/verify?address=${account}&signature=${signature}`
    );
    const data = await response.json();

    dispatch(authSuccess(account));
    getUser(account);
  }, []);

  return {
    connect
  };
}
