import { configureStore } from '@reduxjs/toolkit'
import blockListSlice from "./blockListSlice";

export const store = configureStore({
    reducer: {
        blocklist: blockListSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
