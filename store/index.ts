import { useMemo } from 'react';
import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';

let store: Store | undefined;

const initialStateApp = {};

function initStore(preloadedState = initialStateApp) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export function initializeStore(preloadedState?: any) {
  let storeLocal = store ?? initStore(preloadedState?.totalState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    const storeToConsider = preloadedState?.psState;
    storeLocal = initStore({
      ...store.getState(),
      ...storeToConsider
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return storeLocal;
  // Create the store once in the client
  if (!store) store = storeLocal as Store<any, AnyAction>;

  return storeLocal;
}

export function useStore(initialState: RootState) {
  const storeLocal = useMemo(
    () => initializeStore(initialState),
    [initialState]
  );
  return storeLocal;
}
