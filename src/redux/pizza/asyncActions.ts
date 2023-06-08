import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async ({ currentPage, sortBy, order, category, search }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://62727f8825fed8fcb5f54bcd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)
