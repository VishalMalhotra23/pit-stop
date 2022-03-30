import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import { useStore } from '../store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store as Store<any, AnyAction>}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
