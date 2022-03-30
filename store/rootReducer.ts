import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { garageReducer } from './garage/reducer';
import { marketplaceReducer } from './marketplace/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  garage: garageReducer,
  marketplace: marketplaceReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
