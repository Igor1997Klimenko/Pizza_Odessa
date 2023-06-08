/* eslint-disable react-hooks/exhaustive-deps */
import Categories from '../components/Categories'
import Sort, { listPopup } from '../components/Sort'
import Skeleton from '../components/PizzaCard/Skeleton'
import PizzaCard from '../components/PizzaCard/index'
import qs from 'qs'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { SearchPizzaParams } from '../redux/pizza/types'
import ErrorApiFetch from '../components/ErrorApiFetch/ErrorApiFetch'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { selectApiPizzas } from '../redux/pizza/selectors'

const Home = () => {
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectApiPizzas)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  const onChangeCategoryId = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onChangePages = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    try {
      const sortBy = sort.sortProperty.replace('-', '')
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
      const category = categoryId > 0 ? `category=${categoryId}` : ''
      const search = searchValue ? `&search=${searchValue}` : ''

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage),
        })
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const pizza = items.map((obj) => <PizzaCard key={obj.id} {...obj} />)
  const skelletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ))

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams

      const sort = listPopup.find((obj) => obj.sortProperty === params.sortBy)

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || listPopup[0],
        })
      )
    }
    isMounted.current = true
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  return (
    <div className="container">
      {status === 'error' ? (
        <ErrorApiFetch />
      ) : (
        <>
          <div className="content__top">
            <Categories
              value={categoryId}
              onClickCategory={onChangeCategoryId}
            />
            <Sort value={sort} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'loading' ? skelletons : pizza}
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePages} />
        </>
      )}
    </div>
  )
}

export default Home
