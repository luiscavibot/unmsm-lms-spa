import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui/uiSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;