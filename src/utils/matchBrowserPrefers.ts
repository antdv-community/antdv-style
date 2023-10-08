import type { ThemeAppearance } from '../types'

export function matchBrowserPrefers(mode: ThemeAppearance): MediaQueryList {
  if (typeof window !== 'undefined')
    return matchMedia && matchMedia(`(prefers-color-scheme: ${mode})`)

  // 针对 ssr 做特处
  return { matches: false } as MediaQueryList
}
