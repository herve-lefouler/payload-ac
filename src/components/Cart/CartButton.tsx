'use client'

import { ShoppingBag } from 'lucide-react'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CartModalContent } from './CartModalContent'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

export function CartButton({ className }: Props) {
  return (
    <Suspense fallback={<CartIconButton className={className} />}>
      <CartButtonWithData className={className} />
    </Suspense>
  )
}

function CartButtonWithData({ className }: Props) {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const totalQuantity = React.useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return 0
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  React.useEffect(() => {
    // Close the cart modal when the pathname changes.
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="nav"
          size="clear"
          className={`navLink relative ${className || ''}`}
          aria-label="Shopping cart"
        >
          <ShoppingBag className="h-5 w-5" style={{ color: 'var(--brand-teal, #1A5A5A)' }} />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white" style={{ backgroundColor: 'var(--brand-teal, #1A5A5A)' }}>
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
          <SheetDescription>Manage your cart here, add items to view the total.</SheetDescription>
        </SheetHeader>
        <CartModalContent />
      </SheetContent>
    </Sheet>
  )
}

function CartIconButton({ className }: Props) {
  return (
    <Button
      variant="nav"
      size="clear"
      className={`navLink ${className || ''}`}
      aria-label="Shopping cart"
      disabled
    >
      <ShoppingBag className="h-5 w-5" style={{ color: 'var(--brand-teal, #1A5A5A)' }} />
    </Button>
  )
}
