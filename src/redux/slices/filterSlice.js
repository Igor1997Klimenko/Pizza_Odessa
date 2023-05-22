import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, { payload }) => {
      state.categoryId = payload
    },
    setSort: (state, { payload }) => {
      state.sort = payload
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload
    },
    setFilters: (state, { payload }) => {
      state.sort = payload.sort
      state.currentPage = Number(payload.currentPage)
      state.categoryId = Number(payload.categoryId)
    },
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions

export default filterSlice.reducer
