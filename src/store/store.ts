import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from '@/store/slices/authSlice';
import passwordReducer from '@/store/slices/passwordSlice';
import storage from 'redux-persist/lib/storage';
import { api } from '@/services/api';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  password: passwordReducer,
  [api.reducerPath]: api.reducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
