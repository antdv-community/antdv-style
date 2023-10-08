import type {
  MappingAlgorithm,
  ThemeConfig,
} from 'ant-design-vue/es/config-provider/context'
import type { AliasToken } from 'ant-design-vue/es/theme/interface'

import type { Ref } from 'vue'
import type { BrowserPrefers, ThemeAppearance, ThemeMode } from './appearance'

/**
 * @title 主题上下文状态
 */
export interface ThemeContextState {
  /**
   * @title 外观
   */
  appearance: Ref<ThemeAppearance>
  setAppearance: (appearance: ThemeAppearance) => void
  /**
   * @title 主题模式
   * @enum ["light", "dark"]
   * @enumNames ["亮色模式", "暗色模式"]
   * @default "light"
   */
  themeMode: Ref<ThemeMode>
  setThemeMode: (themeMode: ThemeMode) => void
  /**
   * @title 是否为暗色模式
   */
  isDarkMode: Ref<boolean>
  /**
   * @title 浏览器偏好的外观
   */
  browserPrefers: Ref<BrowserPrefers>
}

export interface AppearanceState {
  isDarkMode: boolean
  appearance: ThemeAppearance
}

export type AntdToken = AliasToken

/**
 * 一组统一封装好的 antd 标准样式
 */
export interface AntdStylish {
  buttonDefaultHover: string
}

/**
 * @title 获取 Antd 主题的函数
 * @param appearance - 主题外观
 * @returns Antd 主题配置对象或 undefined
 */
export interface GetAntdTheme {
  (appearance: ThemeAppearance): ThemeConfig | undefined
}

export type { MappingAlgorithm }

export interface CustomToken {}

export interface CustomStylish {}

export interface CustomTheme extends CustomStylish, CustomToken {}

export interface FullStylish extends AntdStylish, CustomStylish {}

export interface AntdTheme extends AntdToken {
  stylish: AntdStylish
}

export interface FullToken extends AntdToken, CustomToken {}

export interface Theme extends FullToken, ThemeContextState {
  stylish: FullStylish
  /**
   * antd 组件的 prefixCls
   */
  prefixCls: string
}
