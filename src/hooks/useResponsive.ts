import { Grid } from 'ant-design-vue'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ResponsiveKey } from '../types'
import { convertBreakpointToResponsive } from '../utils/responsive'

export function useResponsive(): ComputedRef<
  Partial<Record<ResponsiveKey, boolean>>
> {
  const breakpoints = Grid.useBreakpoint()

  return computed(() => convertBreakpointToResponsive(breakpoints.value))
}
