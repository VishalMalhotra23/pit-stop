import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../store/auth/actions';
import useUser from './useUser';

export default function useAuth() {
  const dispatch = useDispatch();

  const { fetchUser } = useUser();

  const getWeb3Modal = useCallback(async () => {
    const web3Modal = new Web3Modal({
      // network: 'testnet',
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              80001: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
            }
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
    if (!localStorage.getItem('token')) signIn(connection, accounts[0]);
    else {
      const token = localStorage.getItem('token') as string;
      dispatch(
        authSuccess({
          address: accounts[0],
          token
        })
      );
      fetchUser(token);
    }
  }, []);

  const signIn = useCallback(async (connection: any, account: string) => {
    console.log(account);

    const authData = await fetch(`/api/auth?address=${account}`);
    const user = await authData.json();
    console.log(user.id);
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(user.nonce.toString());
    const response = await fetch(
      `/api/verify?address=${account}&signature=${signature}&id=${user.id}`
    );
    const data = await response.json();

    dispatch(authSuccess({ address: account, token: data.token }));
    fetchUser(data.token);
  }, []);

  return {
    connect
  };
}
