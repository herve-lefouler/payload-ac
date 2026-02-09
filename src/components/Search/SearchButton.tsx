'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  className?: string
}

export function SearchButton({ className }: Props) {
  const router = useRouter()

  function handleClick() {
    router.push('/shop?q=')
  }

  return (
    <Button
      variant="nav"
      size="clear"
      onClick={handleClick}
      className={`navLink ${className || ''}`}
      aria-label="Search"
    >
      <SearchIcon className="h-5 w-5" style={{ color: 'var(--brand-teal, #1A5A5A)' }} />
    </Button>
  )
}
