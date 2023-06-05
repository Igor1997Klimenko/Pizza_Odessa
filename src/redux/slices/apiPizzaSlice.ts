import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type Pizza = {
  id: string
  imageUrl: string
  title: string
  price: number
  sizes: number[]
  types: number[]
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

export type SearchPizzaParams = {
  currentPage: string
  sortBy: string
  order: string
  category: string
  search: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, sortBy, order, category, search }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://62727f8825fed8fcb5f54bcd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
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
