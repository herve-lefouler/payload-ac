import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Logo image (optional - if not provided, text logo will be used)',
          },
        },
        {
          name: 'logoText',
          type: 'text',
          defaultValue: 'ATELIER CINQUINI',
          admin: {
            description: 'Main logo text',
          },
        },
        {
          name: 'logoSubtext',
          type: 'text',
          defaultValue: 'CRÉATIONS TEXTILES',
          admin: {
            description: 'Subtext below main logo',
          },
        },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
}
