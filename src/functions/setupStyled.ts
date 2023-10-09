import type { StyledConfig, Theme } from '../types'
import { createContext } from '../utils/context.ts'

// eslint-disable-next-line import/no-mutable-exports
export let DEFAULT_THEME_CONTEXT = createContext<Theme>({} as Theme)
export function setupStyled(config: StyledConfig) {
  if (!config.ThemeContext)
  // eslint-disable-next-line no-throw-literal
    throw 'ThemeContext is required. Please check your config.'

  DEFAULT_THEME_CONTEXT = config.ThemeContext
  // DEFAULT_THEME_PROVIDER = createStyledThemeProvider(config)
}
