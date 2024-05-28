import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../configureStore'

// Define a type for the slice state
interface UserState {
  lists: any
}

// Define the initial state using that type
const initialState: UserState = {
  lists:[],
}

export const counterSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getDataList: (state, action: PayloadAction<any>) => {
      state.lists = action.payload
    },
    
  },
})

export const { getDataList } = counterSlice.actions

export default counterSlice.reducer