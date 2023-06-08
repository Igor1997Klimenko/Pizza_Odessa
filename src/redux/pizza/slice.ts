import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSliceState, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, { payload }: PayloadAction<Pizza[]>) => {
        state.status = Status.SUCCESS
        state.items = payload
      }
    )
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export default pizzaSlice.reducer
