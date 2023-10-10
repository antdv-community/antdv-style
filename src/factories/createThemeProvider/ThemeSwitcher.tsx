import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  unref,
  watchEffect
} from 'vue'
import { useThemeModeProvide } from '../../context'
import type {
  BrowserPrefers,
  ThemeAppearance,
  ThemeMode,
  UseTheme
} from '../../types'
import { matchBrowserPrefers } from '../../utils/matchBrowserPrefers'
import { safeStartTransition } from '../../utils/safeStartTransition'
import { useMergeValue } from '../../utils/useMergeValue'

let darkThemeMatch: MediaQueryList

const ThemeObserver = defineComponent(
  (props: {
    themeMode: ThemeMode
    setAppearance: (value: ThemeAppearance) => void
    setBrowserPrefers: (value: BrowserPrefers) => void
  }) => {
    const matchBrowserTheme = () => {
      if (matchBrowserPrefers('dark').matches) {
        props.setAppearance('dark')
      } else {
        props.setAppearance('light')
      }
    }

    const updateBrowserTheme = () => {
      if (matchBrowserPrefers('dark').matches) {
        props.setBrowserPrefers('dark')
      } else {
        props.setBrowserPrefers('light')
      }
    }

    watchEffect(() => {
      if (props.themeMode !== 'auto') {
        safeStartTransition(() => {
          props.setAppearance(props.themeMode)
        })
        return
      }
      // 如果是自动的话，则去做一次匹配，并开始监听
      setTimeout(matchBrowserTheme, 1)
      if (!darkThemeMatch) {
        darkThemeMatch = matchBrowserPrefers('dark')
      }
      if (matchBrowserTheme) {
        darkThemeMatch.removeEventListener('change', matchBrowserTheme)
      }
      darkThemeMatch.addEventListener('change', matchBrowserTheme)
    })

    watchEffect(() => {
      if (!darkThemeMatch) {
        darkThemeMatch = matchBrowserPrefers('dark')
      }
      if (updateBrowserTheme) {
        darkThemeMatch.removeEventListener('change', updateBrowserTheme)
      }

      darkThemeMatch.addEventListener('change', updateBrowserTheme)
    })
    onBeforeUnmount(() => {
      darkThemeMatch.removeEventListener('change', matchBrowserTheme)
    })
    return () => {
      return null
    }
  }
)

export interface ThemeSwitcherProps {
  /**
   * 应用的展示外观主题，只存在亮色和暗色两种
   * @default light
   */
  appearance?: ThemeAppearance
  defaultAppearance?: ThemeAppearance
  onAppearanceChange?: (appearance: ThemeAppearance) => void
  /**
   * 主题的展示模式，有三种配置：跟随系统、亮色、暗色
   * 默认不开启自动模式，需要手动进行配置
   * @default light
   */
  themeMode?: ThemeMode
  defaultThemeMode?: ThemeMode
  onThemeModeChange?: (themeMode: ThemeMode) => void

  useTheme: UseTheme
}

const ThemeSwitcher = defineComponent((props: ThemeSwitcherProps, ctx) => {
  const theme = props.useTheme()

  const browserPrefers = shallowRef(
    matchBrowserPrefers('dark')?.matches ? 'dark' : 'light'
  )
  const setBrowserPrefers = (v: BrowserPrefers) => {
    browserPrefers.value = v
  }
  const startObserver = shallowRef()
  onMounted(() => {
    startObserver.value = true
  })
  const [themeMode, setThemeMode] = useMergeValue<ThemeMode>('light', {
    value: computed(() => props.themeMode!),
    defaultValue: props?.defaultThemeMode ?? unref(theme.value.themeMode),
    onChange: (v) => props?.onThemeModeChange?.(v)
  })
  const [appearance, setAppearance] = useMergeValue<ThemeAppearance>('light', {
    value: computed(() => props.appearance!),
    defaultValue: props.defaultAppearance ?? unref(theme.value.appearance),
    onChange: (v) => props.onAppearanceChange?.(v)
  })
  useThemeModeProvide({
    appearance,
    setAppearance,
    themeMode,
    setThemeMode,
    isDarkMode: computed(() => appearance.value === 'dark'),
    browserPrefers
  } as any)
  return () => {
    const children = ctx?.slots?.default?.()
    return (
      <>
        {startObserver.value && (
          <ThemeObserver
            themeMode={themeMode.value}
            setAppearance={setAppearance}
            setBrowserPrefers={setBrowserPrefers}
          />
        )}
        {children}
      </>
    )
  }
})
export default ThemeSwitcher
