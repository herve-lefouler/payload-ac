'use client'
import { CMSLink } from '@/components/Link'
import { CartButton } from '@/components/Cart/CartButton'
import { SearchButton } from '@/components/Search/SearchButton'
import { Logo } from '@/components/Logo'
import React, { Suspense } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <header className="relative z-20 border-b" style={{ borderColor: 'var(--brand-border)', backgroundColor: 'var(--brand-bg)' }}>
      <nav className="container flex items-center justify-between py-4">
        {/* Mobile menu button */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo - Left side */}
        <div className="flex-shrink-0">
          <Logo header={header} />
        </div>

        {/* Navigation - Center */}
        {menu.length ? (
          <ul className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {menu.map((item) => (
              <li key={item.id}>
                <CMSLink
                  {...item.link}
                  size={'clear'}
                  className={cn('relative navLink', {
                    active:
                      item.link.url && item.link.url !== '/'
                        ? pathname.includes(item.link.url)
                        : false,
                  })}
                  appearance="nav"
                />
              </li>
            ))}
          </ul>
        ) : null}

        {/* Icons - Right side */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <SearchButton />
          <Suspense fallback={<CartButton />}>
            <CartButton />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
