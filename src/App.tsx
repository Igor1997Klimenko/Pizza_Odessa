import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { FC } from 'react'
import { Loading } from './components/Loading'
import Loadable from 'react-loadable'

const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <Loading />,
})

const DescriptionPizza = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <Loading />,
})

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<DescriptionPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
