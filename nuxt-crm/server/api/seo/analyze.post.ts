import { defineEventHandler, readBody, createError } from 'h3'

interface MetaResult {
  url: string
  title: string
  description: string
  h1: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  robots: string
  viewport: string
  charset: string
  titleLen: number
  descLen: number
  hasH1: boolean
  hasCanonical: boolean
  hasDescription: boolean
  hasOgTags: boolean
}

interface PageSpeedCategory {
  score: number | null
}

interface PageSpeedAudit {
  score: number | null
  displayValue?: string
  numericValue?: number
}

interface PageSpeedResult {
  performance: number
  seo: number
  accessibility: number
  bestPractices: number
  fcp: string
  lcp: string
  cls: string
  tbt: string
  ttfb: string
  si: string
}

interface AnalyzeResult {
  url: string
  meta: MetaResult
  pageSpeed: {
    mobile: PageSpeedResult
    desktop: PageSpeedResult
  }
  analyzedAt: string
}

// 从 HTML 中提取 meta 标签内容
function extractMeta(html: string, url: string): MetaResult {
  const getTag = (pattern: RegExp): string => {
    const m = html.match(pattern)
    return m ? (m[1] || '').trim() : ''
  }

  const title = getTag(/<title[^>]*>([^<]*)<\/title>/i)
  const description =
    getTag(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)
  const h1 = getTag(/<h1[^>]*>([^<]*)<\/h1>/i)
  const canonical = getTag(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
  const ogTitle =
    getTag(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+property=["']og:title["']/i)
  const ogDescription =
    getTag(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+property=["']og:description["']/i)
  const ogImage =
    getTag(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+property=["']og:image["']/i)
  const robots =
    getTag(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+name=["']robots["']/i)
  const viewport =
    getTag(/<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']/i) ||
    getTag(/<meta\s+content=["']([^"']*)["']\s+name=["']viewport["']/i)
  const charsetMatch = html.match(/<meta\s+charset=["']([^"']*)["']/i)
  const charset = charsetMatch ? charsetMatch[1] : ''

  return {
    url,
    title,
    description,
    h1,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    robots,
    viewport,
    charset,
    titleLen: title.length,
    descLen: description.length,
    hasH1: h1.length > 0,
    hasCanonical: canonical.length > 0,
    hasDescription: description.length > 0,
    hasOgTags: ogTitle.length > 0 || ogDescription.length > 0,
  }
}

// 解析 PageSpeed 响应为简洁结构
function parsePageSpeed(data: Record<string, unknown>): PageSpeedResult {
  const cats = (data.categories || {}) as Record<string, PageSpeedCategory>
  const audits = (data.audits || {}) as Record<string, PageSpeedAudit>

  const score = (key: string): number =>
    Math.round((cats[key]?.score ?? 0) * 100)

  const display = (key: string): string =>
    audits[key]?.displayValue ?? '—'

  return {
    performance: score('performance'),
    seo: score('seo'),
    accessibility: score('accessibility'),
    bestPractices: score('best-practices'),
    fcp: display('first-contentful-paint'),
    lcp: display('largest-contentful-paint'),
    cls: display('cumulative-layout-shift'),
    tbt: display('total-blocking-time'),
    ttfb: display('server-response-time'),
    si: display('speed-index'),
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ url: string }>(event)
  const rawUrl = (body?.url || '').trim()

  if (!rawUrl) {
    throw createError({ statusCode: 400, message: '请提供需要分析的网址' })
  }

  // 补全协议
  const targetUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

  try {
    new URL(targetUrl)
  } catch {
    throw createError({ statusCode: 400, message: '网址格式不正确' })
  }

  // 并发：Meta 抓取 + PageSpeed Mobile + PageSpeed Desktop
  const psBase = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
  const psCategories = 'category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES'
  const encodedUrl = encodeURIComponent(targetUrl)

  const [metaRes, psMobileRes, psDesktopRes] = await Promise.allSettled([
    fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Analyzer/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(10000),
    }),
    fetch(`${psBase}?url=${encodedUrl}&strategy=mobile&${psCategories}`, {
      signal: AbortSignal.timeout(30000),
    }),
    fetch(`${psBase}?url=${encodedUrl}&strategy=desktop&${psCategories}`, {
      signal: AbortSignal.timeout(30000),
    }),
  ])

  // 解析 Meta
  let meta: MetaResult
  if (metaRes.status === 'fulfilled' && metaRes.value.ok) {
    const html = await metaRes.value.text()
    meta = extractMeta(html, targetUrl)
  } else {
    meta = {
      url: targetUrl,
      title: '', description: '', h1: '', canonical: '',
      ogTitle: '', ogDescription: '', ogImage: '',
      robots: '', viewport: '', charset: '',
      titleLen: 0, descLen: 0,
      hasH1: false, hasCanonical: false, hasDescription: false, hasOgTags: false,
    }
  }

  // 解析 PageSpeed
  const defaultPs: PageSpeedResult = {
    performance: 0, seo: 0, accessibility: 0, bestPractices: 0,
    fcp: '—', lcp: '—', cls: '—', tbt: '—', ttfb: '—', si: '—',
  }

  let mobile = defaultPs
  let desktop = defaultPs

  if (psMobileRes.status === 'fulfilled' && psMobileRes.value.ok) {
    const data = await psMobileRes.value.json() as Record<string, unknown>
    const lr = (data.lighthouseResult || {}) as Record<string, unknown>
    mobile = parsePageSpeed(lr)
  }

  if (psDesktopRes.status === 'fulfilled' && psDesktopRes.value.ok) {
    const data = await psDesktopRes.value.json() as Record<string, unknown>
    const lr = (data.lighthouseResult || {}) as Record<string, unknown>
    desktop = parsePageSpeed(lr)
  }

  const result: AnalyzeResult = {
    url: targetUrl,
    meta,
    pageSpeed: { mobile, desktop },
    analyzedAt: new Date().toISOString(),
  }

  return result
})
