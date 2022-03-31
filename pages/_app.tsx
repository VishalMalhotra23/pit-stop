import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import Boot from '../components/Boot';
import { useStore } from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store as Store<any, AnyAction>}>
      <Boot />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
