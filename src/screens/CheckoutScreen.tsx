import { CircleCheck, LoaderCircle, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  type CartItem,
  checkoutRules,
  customerEmail,
  initialCart,
  promoCodes,
} from '@/mocks/cart'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

type OrderState = 'cart' | 'placing' | 'confirmed'

export function CheckoutScreen() {
  const [items, setItems] = useState<CartItem[]>(initialCart)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState(false)
  const [orderState, setOrderState] = useState<OrderState>('cart')

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * promoCodes[appliedPromo] : 0
  const discountedSubtotal = subtotal - discount
  const qualifiesForFreeShipping = discountedSubtotal >= checkoutRules.freeShippingFrom
  const shipping = items.length === 0 || qualifiesForFreeShipping ? 0 : checkoutRules.shippingCost
  const tax = discountedSubtotal * checkoutRules.taxRate
  const total = discountedSubtotal + shipping + tax
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const changeQuantity = (id: string, delta: number) =>
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    )

  const removeItem = (id: string) =>
    setItems((current) => current.filter((item) => item.id !== id))

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (code in promoCodes) {
      setAppliedPromo(code)
      setPromoError(false)
      setPromoInput('')
    } else {
      setPromoError(true)
    }
  }

  const placeOrder = () => {
    setOrderState('placing')
    setTimeout(() => setOrderState('confirmed'), 1200)
  }

  const startOver = () => {
    setItems(initialCart)
    setAppliedPromo(null)
    setPromoInput('')
    setPromoError(false)
    setOrderState('cart')
  }

  if (orderState === 'confirmed') {
    return (
      <main className="mx-auto max-w-md p-6 pt-16">
        <Card className="text-center">
          <CardHeader className="justify-items-center gap-3">
            <CircleCheck className="size-12 text-emerald-600" />
            <CardTitle className="text-2xl">Order confirmed</CardTitle>
            <CardDescription>
              Order #A-10482 · {usd.format(total)} paid
              <br />
              A confirmation was sent to {customerEmail}.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={startOver}>Start over</Button>
          </CardFooter>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Your cart</CardTitle>
            <CardDescription>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Button variant="outline" onClick={() => setItems(initialCart)}>
                  Restore sample cart
                </Button>
              </div>
            ) : (
              <ul className="divide-y">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="hidden size-16 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
                      <item.icon className="size-7 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">{item.variant}</p>
                      <p className="mt-1">{usd.format(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity === 1}
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        <Minus />
                      </Button>
                      <span className="w-8 text-center tabular-nums">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="promo">Promo code</Label>
              <div className="flex gap-2">
                <Input
                  id="promo"
                  placeholder="Try WELCOME10"
                  value={promoInput}
                  aria-invalid={promoError}
                  onChange={(event) => {
                    setPromoInput(event.target.value)
                    setPromoError(false)
                  }}
                  onKeyDown={(event) => event.key === 'Enter' && applyPromo()}
                />
                <Button variant="outline" onClick={applyPromo} disabled={!promoInput.trim()}>
                  Apply
                </Button>
              </div>
              {promoError && (
                <p className="text-sm text-destructive">This code isn't valid.</p>
              )}
              {appliedPromo && (
                <div>
                  <Badge variant="secondary">
                    {appliedPromo} · {promoCodes[appliedPromo] * 100}% off
                    <button
                      type="button"
                      className="ml-1 cursor-pointer text-muted-foreground hover:text-foreground"
                      aria-label="Remove promo code"
                      onClick={() => setAppliedPromo(null)}
                    >
                      ×
                    </button>
                  </Badge>
                </div>
              )}
            </div>

            <Separator />

            <dl className="flex flex-col gap-2 text-sm">
              <SummaryRow label="Subtotal" value={usd.format(subtotal)} />
              {discount > 0 && (
                <SummaryRow label="Discount" value={`−${usd.format(discount)}`} highlight />
              )}
              <SummaryRow label="Shipping" value={shipping === 0 ? 'Free' : usd.format(shipping)} />
              <SummaryRow label="Estimated tax" value={usd.format(tax)} />
            </dl>

            {items.length > 0 && !qualifiesForFreeShipping && (
              <p className="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                <Truck className="size-4 shrink-0" />
                Add {usd.format(checkoutRules.freeShippingFrom - discountedSubtotal)} more for free
                shipping.
              </p>
            )}

            <Separator />

            <div className="flex items-baseline justify-between">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-semibold tabular-nums">{usd.format(total)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              className="w-full"
              disabled={items.length === 0 || orderState === 'placing'}
              onClick={placeOrder}
            >
              {orderState === 'placing' ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Placing order…
                </>
              ) : (
                'Place order'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

function SummaryRow({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={highlight ? 'text-emerald-600' : undefined}>{value}</dd>
    </div>
  )
}
