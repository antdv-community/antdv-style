import { theme } from 'ant-design-vue'

import type { ComputedRef } from 'vue'
import type { AntdToken } from '../types'

export function useAntdToken(): ComputedRef<AntdToken> {
  const { token } = theme.useToken()

  return token
}
