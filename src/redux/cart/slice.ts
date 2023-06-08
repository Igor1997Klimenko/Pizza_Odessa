import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import calcTotalPrice from '../../utils/calcTotalPrice'
import getCartFromLS from '../../utils/getCartFromLS'
import { CartSliceState, CartItem } from './types'

const initialState: CartSliceState = getCartFromLS()

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
      state.totalPrice = calcTotalPrice(state.items)
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
