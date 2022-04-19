import type { AppProps } from 'next/app';
import Image from 'next/image';
import { Provider } from 'react-redux';
import { AnyAction, Store } from 'redux';
import Boot from '../components/Boot';
import useWindowSize from '../hooks/useWindowSize';
import { useStore } from '../store';
import '../styles/globals.css';
// import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  const size = useWindowSize();

  if (size.width <= 768) {
    return (
      <div className="h-screen flex flex-col">
        <span className="text-redOne font-bold text-4xl text-center mt-6">
          Pit Stop
        </span>
        <div className="flex-1 w-ful px-10 pt-24">
          <div
            className="p-12"
            style={{
              boxShadow: '0 0 50px #CB2D3E',
              borderRadius: '12px'
            }}
          >
            <div className="text-center p-4">
              <Image src={require(`../public/img/flag.png`)} objectFit="fill" />
            </div>
            <h1 className="text-white text-center text-lg font-semibold mt-4">
              Pit Stop is best experienced on a larger screen. Please try
              opening it on a computer.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Provider store={store as Store<any, AnyAction>}>
      <Boot />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
