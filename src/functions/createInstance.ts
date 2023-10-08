import { CacheManager, createEmotion } from '../core'
import type { HashPriority, StyleEngine, StyledConfig } from '../types'
import { createEmotionContext } from '../factories/createEmotionContext.ts'
import { createContext } from '../utils/context.ts'
import { createUseTheme } from '../factories/createUseTheme'

// 为 SSR 添加一个全局的 cacheManager，用于统一抽取 ssr 样式
declare global {
  // eslint-disable-next-line no-var
  var __ANTD_STYLE_CACHE_MANAGER_FOR_SSR__: CacheManager
}
const cacheManager = new CacheManager()

// eslint-disable-next-line no-restricted-globals
if (typeof global !== 'undefined')
// eslint-disable-next-line no-restricted-globals
  global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__ = cacheManager

export interface CreateOptions<T> {
  /**
   * 生成的 css 关键词
   * @default ant-css
   */
  key?: string

  /**
   * 默认的组件 prefixCls
   */
  prefixCls?: string
  /**
   * 是否开启急速模式
   *
   * @default false
   */
  speedy?: boolean

  container?: Node
  /**
   * 默认的自定义 Token
   */
  customToken?: T
  hashPriority?: HashPriority

  // ThemeProvider?: Omit<ThemeProviderProps<T>, 'children'>
  styled?: StyledConfig
}

/**
 * Creates a new instance of antd-style
 * 创建一个新的 antd-style 实例
 */
export function createInstance<T = any>(options: CreateOptions<T>) {
  const internalOptions = {
    ...options,
    key: options.key ?? 'zcss', // 新建的 instance key 如果不传，则设为 zcss- 使得该 key 和 acss 不一样
    speedy: options.speedy ?? false,
  }

  const emotion = createEmotion({
    key: internalOptions.key,
    speedy: internalOptions.speedy,
    container: internalOptions.container,
  })

  const EmotionContext = createEmotionContext(emotion)
  // 将 cache 存到全局管理器中
  emotion.cache = cacheManager.add(emotion.cache)

  // ******* 下面这些都和主题相关，如果做了任何改动，都需要排查一遍 ************* //

  const CustomThemeContext = createContext<T>(
    (internalOptions.customToken ? internalOptions.customToken : {}) as T,
  )

  const styledThemeContext = internalOptions.styled?.ThemeContext

  const StyleEngineContext = createContext<StyleEngine>({
    CustomThemeContext,
    StyledThemeContext: styledThemeContext,
    prefixCls: internalOptions?.prefixCls,
  })

  const useTheme = createUseTheme({ StyleEngineContext })
}
