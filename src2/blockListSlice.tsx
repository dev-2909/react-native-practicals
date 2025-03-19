import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface listProps {
    id: number,
    albumId: number,
    title: string
}

export interface BlockListState {
    result : listProps[]

}

const initialState: BlockListState = {
    result: []
}

export const blockListSlice = createSlice({
    name: 'blocklist',
    initialState,
    reducers: {
     setBlockList: (state, action) => {
         state.result = action.payload
     }
    },
})

export const { setBlockList } = blockListSlice.actions

export default blockListSlice.reducer
