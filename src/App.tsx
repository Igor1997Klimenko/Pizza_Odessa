import Home from './pages/Home'
import NotFound from './pages/NotFound'
import DescriptionPizza from './components/DescriptionPizza/DescriptionPizza'
import './scss/app.scss'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import MainLayout from './components/MainLayout'
import { FC } from 'react'

const App: FC = () => {
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

export default App
