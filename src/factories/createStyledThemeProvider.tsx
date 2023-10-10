import { defineComponent } from 'vue'
import type { StyledConfig } from '../types'

/**
 * 创建一个 styled api 的 ThemeProvider
 *  如果用户有设定 ThemeProvider，就使用用户的，否则使用 ThemeContext.Provider
 * @param styledConfig
 */
export function createStyledThemeProvider(styledConfig: StyledConfig) {
  if (styledConfig.ThemeProvider) return styledConfig.ThemeProvider

  const { ThemeContext } = styledConfig
  return defineComponent((props: { theme: any }, ctx) => {
    return () => {
      return (
        <ThemeContext.Provider value={props.theme}>
          {ctx.slots?.default?.()}
        </ThemeContext.Provider>
      )
    }
  })
}
