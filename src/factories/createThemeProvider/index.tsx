import type { DefineComponent } from 'vue'
import { defineComponent } from 'vue'
import { createStyledThemeProvider } from '../createStyledThemeProvider.tsx'
import type { StyleEngine, StyledConfig, UseTheme } from '../../types'
import {
  DEFAULT_THEME_CONTEXT,
  DEFAULT_THEME_PROVIDER
} from '../../functions/setupStyled'
import type { Context } from '../../utils/context.ts'
import { useContext } from '../../utils/context.ts'
import AntdProvider from './AntdProvider'
import ThemeSwitcher from './ThemeSwitcher'
import TokenContainer from './TokenContainer'
import type { ThemeProviderProps } from './type'

export * from './type'
/**
 * @title CreateThemeProviderOptions
 * @category Interfaces
 * @description 用于创建主题提供者的选项接口
 */
interface CreateThemeProviderOptions {
  /**
   * @title styledConfig
   * @description 配置 styled-components 的选项
   * @default undefined
   */
  styledConfig?: StyledConfig
  /**
   * @title StyleEngineContext
   * @description StyleEngine 上下文
   */
  StyleEngineContext: Context<StyleEngine>
  /**
   * @title useTheme
   * @description 获取当前主题的钩子函数
   */
  useTheme: UseTheme
}
export function createThemeProvider(
  option: CreateThemeProviderOptions
): <T = any, S = any>(
  props: ThemeProviderProps<T, S>
) => DefineComponent<ThemeProviderProps<any, any>> {
  // 如果有全局配置 styledConfig，那么 ThemeProvider
  const DefaultStyledThemeProvider = option.styledConfig
    ? createStyledThemeProvider(option.styledConfig)
    : undefined

  const { StyleEngineContext } = option

  return defineComponent((props: ThemeProviderProps<any, any>, { slots }) => {
    const styleEngine = useContext(StyleEngineContext)
    const CustomThemeContext = styleEngine.CustomThemeContext
    const defaultCustomToken = useContext(CustomThemeContext)

    return () => {
      const {
        customToken,
        customStylish,

        theme,
        getStaticInstance,
        prefixCls: outPrefixCls,
        staticInstanceConfig,

        appearance,
        defaultAppearance,
        onAppearanceChange,
        themeMode,
        defaultThemeMode,
        onThemeModeChange,
        styled
      } = props
      const {
        prefixCls: defaultPrefixCls,
        StyledThemeContext,
        CustomThemeContext
      } = styleEngine
      const StyledThemeProvider = styled
        ? createStyledThemeProvider(styled)
        : DefaultStyledThemeProvider || DEFAULT_THEME_PROVIDER
      const prefixCls = outPrefixCls || defaultPrefixCls

      return (
        <StyleEngineContext.Provider
          value={{
            prefixCls,
            StyledThemeContext:
              styled?.ThemeContext ||
              StyledThemeContext ||
              DEFAULT_THEME_CONTEXT,
            CustomThemeContext
          }}
        >
          <ThemeSwitcher
            themeMode={themeMode}
            defaultThemeMode={defaultThemeMode}
            onThemeModeChange={onThemeModeChange}
            defaultAppearance={defaultAppearance}
            appearance={appearance}
            onAppearanceChange={onAppearanceChange}
            useTheme={option.useTheme}
          >
            <AntdProvider
              prefixCls={prefixCls}
              staticInstanceConfig={staticInstanceConfig}
              theme={theme}
              getStaticInstance={getStaticInstance}
            >
              <TokenContainer
                prefixCls={prefixCls}
                customToken={customToken}
                defaultCustomToken={defaultCustomToken}
                customStylish={customStylish}
                StyledThemeProvider={StyledThemeProvider}
              >
                {slots.default?.()}
              </TokenContainer>
            </AntdProvider>
          </ThemeSwitcher>
        </StyleEngineContext.Provider>
      )
    }
  })
}
