import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import usersReducer from './reducer/usersReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  users: usersReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// import { configureStore } from '@reduxjs/toolkit'
// import usersReducer from './reducer/usersReducer'
// import { combineReducers } from 'redux'
// const rootPersistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// })

// const rootReducer = combineReducers({
//   auth: persistReducer(authPersistConfig, authReducer),
//   other: otherReducer,
// })
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch