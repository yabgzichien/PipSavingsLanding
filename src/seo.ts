// Per-route head tags. Used at build time (vite.config.ts writes one HTML file per route so
// crawlers see the right title/canonical before any JS runs) and at runtime for document.title.

export const siteUrl = 'https://www.pipsavings.com'

export type PageSeo = {
  path: string
  title: string
  description: string
}

export const pageSeo = {
  home: {
    path: '/',
    title: 'PipSavings — Pip, the AI Personal Finance App',
    description:
      'PipSavings makes Pip, an AI personal finance app for Android. Scan receipts, track spending, split bills, follow your net worth and ask about your money in plain language.',
  },
  faq: {
    path: '/faq',
    title: 'PipSavings FAQ — Privacy, AI and Your Data | Pip',
    description:
      'Answers about PipSavings and the Pip app: where your financial data is stored, when it leaves your phone, Ask Pip, and using your own AI API key.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy — PipSavings',
    description: 'Privacy Policy for PipSavings and the Pip personal finance app for Android.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Use — PipSavings',
    description: 'Terms of Use for PipSavings and the Pip personal finance app for Android.',
  },
} satisfies Record<string, PageSeo>
