import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { bootReducer } from './boot/reducer';
import { garageReducer } from './garage/reducer';
import { leaderboardReducer } from './leaderboard/reducer';
import { marketplaceReducer } from './marketplace/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  boot: bootReducer,
  garage: garageReducer,
  marketplace: marketplaceReducer,
  user: userReducer,
  leaderboard: leaderboardReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
