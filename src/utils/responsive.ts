import type { Breakpoint } from '../types'

export function convertBreakpointToResponsive<
  T extends Partial<Record<Breakpoint, any>>,
>(breakpoints: T): any {
  return {
    ...breakpoints,
    mobile: breakpoints.xs,
    tablet: breakpoints.md,
    laptop: breakpoints.lg,
    desktop: breakpoints.xxl,
  }
}
