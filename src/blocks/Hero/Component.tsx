import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

export const HeroBlock: React.FC<
  HeroBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ links, richText, backgroundImage, className }) => {
  return (
    <div
      className={cn(
        'relative w-full min-h-[500px] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media
            resource={backgroundImage}
            fill
            imgClassName="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          {richText && (
            <div className="mb-8">
              <RichText
                className="text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_p]:text-white/90"
                data={richText}
                enableGutter={false}
              />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="flex flex-col gap-4 sm:flex-row">
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="lg" {...link} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
