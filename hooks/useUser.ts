import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUserSuccess } from '../store/user/actions';

export default function useUser() {
  const dispatch = useDispatch();

  const getUser = useCallback(async (address: string) => {
    const authData = await fetch(`/api/user?address=${address}`);
    const user = await authData.json();
    console.log(user);
    // @ts-ignore
    dispatch(getUserSuccess(user.user));
  }, []);

  return {
    getUser
  };
}
