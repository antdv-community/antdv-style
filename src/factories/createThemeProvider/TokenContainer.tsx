import { computed, defineComponent, reactive } from 'vue'
import { serializeCSS } from '../../core'
import { useAntdTheme, useThemeMode } from '../../hooks'
import type { StyledThemeProvider, Theme } from '../../types'
import type { ThemeProviderProps } from './type'

interface TokenContainerProps<T, S = Record<string, string>>
  extends Pick<
    ThemeProviderProps<T, S>,
    'customToken' | 'customStylish' | 'prefixCls'
  > {
  StyledThemeProvider: StyledThemeProvider
  defaultCustomToken?: ThemeProviderProps<T, S>['customToken']
}

const TokenContainer = defineComponent(
  (props: TokenContainerProps<any>, { slots }) => {
    const themeState = useThemeMode()
    const { appearance, isDarkMode } = themeState
    const antdTheme = useAntdTheme()
    const antdThemeData = computed(() => {
      const { stylish, ...token } = antdTheme.value
      return {
        stylish,
        token,
      }
    })
    // 获取默认的自定义 token
    const defaultCustomToken = computed(() => {
      if (!props.defaultCustomToken)
        return {}

      if (props.defaultCustomToken instanceof Function) {
        return props.defaultCustomToken({
          token: antdThemeData.value.token,
          appearance: appearance.value,
          isDarkMode: isDarkMode.value,
        })
      }

      return props.defaultCustomToken
    })

    // 获取 自定义 token
    const customToken = computed(() => {
      if (props?.customToken instanceof Function) {
        return {
          ...defaultCustomToken.value,
          ...props.customToken({
            token: antdThemeData.value.token,
            appearance: appearance.value,
            isDarkMode: isDarkMode.value,
          }),
        }
      }

      return { ...defaultCustomToken.value, ...props?.customToken }
    })

    // 获取 stylish
    const customStylish = computed(() => {
      if (!props.customStylish)
        return {}

      return props.customStylish({
        token: { ...antdThemeData.value.token, ...customToken.value } as any,
        stylish: antdThemeData.value.stylish,
        appearance: appearance.value,
        isDarkMode: isDarkMode.value,
        css: serializeCSS,
      })
    })

    const stylish = computed(() => ({
      ...customStylish.value,
      ...antdThemeData.value.stylish,
    }))
    return () => {
      const theme: Theme = {
        ...antdThemeData.value.token,
        ...(customToken.value as any),
        stylish: stylish.value as any,
        ...reactive({
          ...themeState,
        }),
        prefixCls: props.prefixCls,
      }
      const StyledThemeProvider = props.StyledThemeProvider

      return (
        <StyledThemeProvider theme={theme}>
          {slots?.default?.()}
        </StyledThemeProvider>
      )
    }
  },
)

export default TokenContainer
