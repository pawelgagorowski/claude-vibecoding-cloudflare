import type { ComponentType } from 'react'
import { CheckoutScreen } from './CheckoutScreen'
import { CustomersScreen } from './CustomersScreen'

export type Screen = {
  path: string
  title: string
  description: string
  component: ComponentType
}

// Every screen listed here gets its own URL and appears on the home page.
export const screens: Screen[] = [
  {
    path: '/checkout',
    title: 'Checkout',
    description: 'Cart with live totals, a promo code and an order confirmation.',
    component: CheckoutScreen,
  },
  {
    path: '/customers',
    title: 'Customers',
    description: 'Example screen — searchable table backed by mock data.',
    component: CustomersScreen,
  },
]
