import { CartItem } from '../redux/cart/types'
import calcTotalPrice from './calcTotalPrice'

const getCartFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return { items: items as CartItem[], totalPrice }
}

export default getCartFromLS
