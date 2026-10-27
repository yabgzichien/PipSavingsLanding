import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { pageSeo, siteUrl, type PageSeo } from './src/seo.ts'

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function withHead(html: string, page: PageSeo, extraHead = '') {
  const url = `${siteUrl}${page.path}`
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace('</head>', `${extraHead}</head>`)
}

// The site is a client-rendered SPA, so without this every route would ship the home page's
// title and canonical. Vercel's cleanUrls serves /faq from faq.html, and so on.
function routeHtml(): Plugin {
  return {
    name: 'route-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return
      const html = String(index.source)
      for (const [name, page] of Object.entries(pageSeo)) {
        if (name === 'home') continue
        this.emitFile({ type: 'asset', fileName: `${name}.html`, source: withHead(html, page) })
      }
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: withHead(
          html.replace(/\s*<link rel="canonical"[^>]*>/, ''),
          { path: '/', title: 'Page not found — PipSavings', description: pageSeo.home.description },
          '    <meta name="robots" content="noindex" />\n  ',
        ),
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), routeHtml()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
