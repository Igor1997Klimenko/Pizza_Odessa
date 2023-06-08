import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, SortPropertyEnum } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности(DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, { payload }: PayloadAction<number>) => {
      state.categoryId = payload
    },
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload
    },
    setSort: (state, { payload }: PayloadAction<Sort>) => {
      state.sort = payload
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload
    },
    setFilters: (state, { payload }: PayloadAction<FilterSliceState>) => {
      state.sort = payload.sort
      state.currentPage = Number(payload.currentPage)
      state.categoryId = Number(payload.categoryId)
    },
  },
})

export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions

export default filterSlice.reducer
