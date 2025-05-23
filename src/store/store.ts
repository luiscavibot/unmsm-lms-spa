import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui/uiSlice';
import authReducer from '@/store/slices/auth/authSlice';
import passwordReducer from '@/store/slices/password/passwordSlice';
import semestersReducer from '@/store/slices/semesters/semesterSlice';
import courseOfferingsReducer from '@/store/slices/coursesOfferings/courseOfferingsSlice';
import storage from 'redux-persist/lib/storage';

import { baseApi } from '@/services/baseApi';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  password: passwordReducer,
  semesters: semestersReducer,
  courseOfferings: courseOfferingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  //TODO: Evaluar no depender de esto ¿está afectando cuando se cambia de una cuena a otra?
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
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
