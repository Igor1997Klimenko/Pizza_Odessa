import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string
  sortProperty: SortPropertyEnum
}

interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.PRICE_DESC },
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
