import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, sortBy, order, category, search }) => {
    const { data } = await axios.get(
      `https://62727f8825fed8fcb5f54bcd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, _) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.items = payload
    })
    builder.addCase(fetchPizzas.rejected, (state, _) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export default pizzaSlice.reducer
