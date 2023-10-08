import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { serializeCSS } from '../../core'
import { useAntdToken } from '../../hooks'
import type {
  Breakpoint,
  BreakpointMapParams,
  CSSObject,
  ResponsiveMap,
  SerializedStyles,
} from '../../types'
import { isReactCssResult } from '../../utils'
import { convertBreakpointToResponsive } from '../../utils/responsive'

export function useMediaQueryMap(): ComputedRef<ResponsiveMap> {
  const token = useAntdToken()

  return computed(() => {
    const breakpoints: Record<Breakpoint, string> = {
      xs: `@media (max-width: ${token.value.screenXSMax}px)`,
      sm: `@media (max-width: ${token.value.screenSMMax}px)`,
      md: `@media (max-width: ${token.value.screenMDMax}px)`,
      lg: `@media (max-width: ${token.value.screenLGMax}px)`,
      xl: `@media (max-width: ${token.value.screenXLMax}px)`,
      xxl: `@media (min-width: ${token.value.screenXXLMin}px)`,
    }
    return convertBreakpointToResponsive(breakpoints)
  })
}

/**
 * 将响应式对象转换为字符串
 * @param obj
 * @param map
 */
export function convertResponsiveStyleToString(obj: BreakpointMapParams, map: ResponsiveMap): any {
  return Object.entries(obj)
    .map(([key, value]) => {
      let str = value as SerializedStyles | CSSObject

      if (!isReactCssResult(value))
        str = serializeCSS(value)

      // @ts-expect-error this is
      return map[key] ? `${map[key]} {${str.styles}}` : ''
    })
    .join('')
}
