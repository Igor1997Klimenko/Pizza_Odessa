export type CartItem = {
  id: string
  imageUrl: string
  title: string
  price: number
  size: number
  type: string
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
