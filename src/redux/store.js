import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import allReducers from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['staffAuth'], 
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
