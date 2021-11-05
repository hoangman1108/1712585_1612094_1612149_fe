import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import rootReducer from "./reducers";
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth']
};
const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk, logger);

// const store = createStore(pReducer, middleware);
const store = createStore(pReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export { persistor, store };
