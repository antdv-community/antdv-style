import type { RegisteredCache } from '@emotion/utils'
import { getRegisteredStyles } from '@emotion/utils'

/* c8 ignore start */
/**
 * 判断是否是 ReactCss 的编译产物
 * @param params
 */
export function isReactCssResult(params: any) {
  return typeof params === 'object'
  && 'styles' in params
  && 'name' in params
  && 'toString' in params
}

// copied from https://github.com/emotion-js/emotion/blob/main/packages/css/src/create-instance.js#L125
export function classnames(args: any) {
  let cls = ''
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === null)
      continue

    let toAdd
    switch (typeof arg) {
      case 'boolean':
        break
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg)
        }
        else {
          toAdd = ''
          for (const k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ')
              toAdd += k
            }
          }
        }
        break
      }
      default: {
        toAdd = arg
      }
    }
    if (toAdd) {
      cls && (cls += ' ')
      cls += toAdd
    }
  }
  return cls
}

// copied from https://github.com/emotion-js/emotion/blob/main/packages/css/src/create-instance.js#LL17C62-L17C62
export function mergeCSS(registered: RegisteredCache, css: any, className: string) {
  const registeredStyles: string[] = []
  const rawClassName = getRegisteredStyles(
    registered,
    registeredStyles,
    className,
  )

  if (registeredStyles.length < 2)
    return className

  return rawClassName + css(registeredStyles)
}
/* c8 ignore end */
