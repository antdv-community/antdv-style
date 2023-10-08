// copied from https://github.com/emotion-js/emotion/blob/main/packages/utils/src/index.js
import type { EmotionCache } from '@emotion/css/create-instance'
import type { SerializedStyles } from '@emotion/serialize'
import { registerStyles } from '@emotion/utils'
import type { ClassNameGeneratorOption } from '../types'

const isBrowser = typeof document !== 'undefined'

export function createHashStyleName(cacheKey: string, hash: string) {
  return `${cacheKey}-${hash}`
}

/**
 * 向浏览器插入样式表
 * @param cache
 * @param serialized
 * @param isStringTag
 * @param options
 */
export function insertStyles(cache: EmotionCache, serialized: SerializedStyles, isStringTag: boolean, options: ClassNameGeneratorOption) {
  const hashPriority = options.hashPriority || 'high'
  registerStyles(cache, serialized, isStringTag)

  const hashClassName = `.${createHashStyleName(cache.key, serialized.name)}`

  const hashSelector
    = hashPriority === 'low' ? `:where(${hashClassName})` : hashClassName

  /* c8 ignore start */
  if (cache.inserted[serialized.name] === undefined) {
    let stylesForSSR = ''
    let current = serialized
    do {
      const maybeStyles = cache.insert(
        serialized === current ? hashSelector : '',
        current,
        cache.sheet,
        true,
      )
      if (!isBrowser && maybeStyles !== undefined)
        stylesForSSR += maybeStyles

      current = current.next!
    } while (current !== undefined)

    if (!isBrowser && stylesForSSR.length !== 0)
      return stylesForSSR
  }
}
/* c8 ignore end */
