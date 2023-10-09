import type { SerializedStyles } from '@emotion/serialize'

/**
 * 将 stylish 中的 styles 取出作为 可复用的 string
 * @param stylish
 */
export function convertStylishToString<
  T extends Record<string, SerializedStyles>,
>(stylish: T): { [Key in keyof T]: string } {
  return Object.fromEntries(
    Object.entries(stylish).map(([key, value]) => [key, value.styles]),
  ) as any
}
