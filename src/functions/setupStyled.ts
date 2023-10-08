import type { Theme } from '../types'
import { createContext } from '../utils/context.ts'

export const DEFAULT_THEME_CONTEXT = createContext<Theme>({} as Theme)
