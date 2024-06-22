import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import PostReducer from './features/pages/home/PostSlice';
import AuthReducer from './features/pages/auth/authSlice';


const persistConfig = {
  key: 'root',
  storage,
  blackList: ['auth', 'checkout']
}

const reducers = combineReducers({
 posts: PostReducer,
 auth: AuthReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
