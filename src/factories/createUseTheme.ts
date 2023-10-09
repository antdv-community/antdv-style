import type { ComputedRef } from 'vue'
import { computed, reactive } from 'vue'
import type { StyleEngine, Theme } from '../types'
import type { Context } from '../utils/context'
import { useContext } from '../utils/context'
import { useAntdTheme, useThemeMode } from '../hooks'
import { DEFAULT_THEME_CONTEXT } from '../functions/setupStyled'

interface CreateUseThemeOptions {
  StyleEngineContext: Context<StyleEngine>
}
export function createUseTheme(options: CreateUseThemeOptions): (() => ComputedRef<Theme>) {
  return (): ComputedRef<Theme> => {
    const { StyleEngineContext } = options
    const { StyledThemeContext, CustomThemeContext, prefixCls } = useContext(StyleEngineContext)

    const antdTheme = useAntdTheme()
    const themeState = useThemeMode()

    const defaultCustomTheme = useContext<Theme>(CustomThemeContext)
    const styledTheme = useContext<Theme>(StyledThemeContext ?? DEFAULT_THEME_CONTEXT) || {}
    const initTheme = computed(() => {
      return {
        ...antdTheme.value,
        ...reactive(themeState),
        ...defaultCustomTheme,
        prefixCls: prefixCls || 'ant',
      }
    })

    //  如果是个空值，说明没有套 Provider，返回 antdTheme 的默认值
    if (!styledTheme || Object.keys(styledTheme).length === 0)
      return initTheme

    return computed(() => styledTheme as Theme)
  }
}
