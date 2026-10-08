import { Backpack, GlassWater, Headphones, type LucideIcon } from 'lucide-react'

export type CartItem = {
  id: string
  name: string
  variant: string
  price: number
  quantity: number
  icon: LucideIcon
}

export const initialCart: CartItem[] = [
  { id: 'p-001', name: 'Everyday Backpack', variant: 'Charcoal · 22 L', price: 89, quantity: 1, icon: Backpack },
  { id: 'p-002', name: 'Insulated Bottle', variant: 'Sage · 750 ml', price: 32, quantity: 2, icon: GlassWater },
  { id: 'p-003', name: 'Wireless Earbuds', variant: 'White', price: 129, quantity: 1, icon: Headphones },
]

export const promoCodes: Record<string, number> = {
  WELCOME10: 0.1,
}

export const checkoutRules = {
  freeShippingFrom: 100,
  shippingCost: 9.95,
  taxRate: 0.08,
}

export const customerEmail = 'emily.carter@example.com'
