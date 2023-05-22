/* eslint-disable react-hooks/exhaustive-deps */
import Categories from '../components/Categories'
import Sort, { listPopup } from '../components/Sort'
import Skeleton from '../components/PizzaCard/Skeleton'
import PizzaCard from '../components/PizzaCard/index'
import qs from 'qs'
import { useEffect, useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { fetchPizzas } from '../redux/slices/apiPizzaSlice'
import ErrorApiFetch from '../components/ErrorApiFetch'

const Home = () => {
  const { searchValue } = useContext(SearchContext)
  const { categoryId, currentPage, sort } = useSelector((state) => state.filter)
  const { items, status } = useSelector((state) => state.pizza)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePages = (page) => {
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
          currentPage,
          sortBy,
          order,
          category,
          search,
        })
      )
    } catch (error) {
      console.log('error', error)
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
      const params = qs.parse(window.location.search.substring(1))

      const sort = listPopup.find(
        (obj) => obj.sortProperty === params.sortProperty
      )

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 200)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
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
            <Sort />
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
