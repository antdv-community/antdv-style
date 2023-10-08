import type { InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'
import type { ThemeContextState, ThemeMode } from '../types'
import { matchBrowserPrefers } from '../utils/matchBrowserPrefers'

export const ThemeModeKey: InjectionKey<ThemeContextState>
  = Symbol('ThemeModeKey')

export function useThemeModeProvide(props: ThemeContextState) {
  provide(ThemeModeKey, props)
}

export function useThemeModeContext() {
  return inject(ThemeModeKey, {
    appearance: computed(() => 'light'),
    setAppearance: () => {},
    isDarkMode: computed(() => false),
    themeMode: computed<ThemeMode>(() => 'light'),
    setThemeMode: () => {},
    browserPrefers: computed(() =>
      matchBrowserPrefers('dark')?.matches ? 'dark' : 'light',
    ),
  })
}
