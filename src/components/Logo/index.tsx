import { Media } from '@/components/Media'
import type { Header } from '@/payload-types'
import Link from 'next/link'

type Props = {
  header: Header
  className?: string
}

export function Logo({ header, className }: Props) {
  const logo = header.logo
  const logoImage = typeof logo?.logoImage === 'object' ? logo.logoImage : null
  const logoText = logo?.logoText || 'ATELIER CINQUINI'
  const logoSubtext = logo?.logoSubtext || 'CRÉATIONS TEXTILES'

  return (
    <Link href="/" className={`flex items-center gap-3 ${className || ''}`}>
      {/* Logo text */}
      <div className="flex flex-col">
        {logoImage ? (
          <Media resource={logoImage} className="w-16" />
        ) : (
          <>
            <span className="font-sans uppercase text-lg leading-tight tracking-wide" style={{ color: 'var(--brand-teal)' }}>
              {logoText}
            </span>
            <span className="font-sans uppercase text-xs leading-tight tracking-wide" style={{ color: 'var(--brand-teal)' }}>
              {logoSubtext}
            </span>
          </>
        )}
      </div>
    </Link>
  )
}
