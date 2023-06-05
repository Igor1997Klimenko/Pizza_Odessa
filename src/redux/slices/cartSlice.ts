import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string
  imageUrl: string
  title: string
  price: number
  size: number
  type: string
  count: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== payload)
    },
    clearItem: (state) => {
      state.items = []
      state.totalPrice = 0
    },
    minusItem: (state, { payload }: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === payload)

      if (findItem) {
        findItem.count--
      }
    },
  },
})

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions

export default cartSlice.reducer
