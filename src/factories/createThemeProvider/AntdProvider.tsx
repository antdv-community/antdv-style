import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import {
  ConfigProvider,
  Modal,
  message,
  notification,
  theme,
} from 'ant-design-vue'

import { defineComponent } from 'vue'
import { useThemeMode } from '../../hooks'
import type { ThemeProviderProps } from './type'

type AntdProviderProps = Pick<
  ThemeProviderProps<any>,
  'theme' | 'prefixCls' | 'getStaticInstance' | 'staticInstanceConfig'
>

const AntdProvider = defineComponent((props: AntdProviderProps, { slots }) => {
  const [messageInstance, messageContextHolder] = message.useMessage(
    props?.staticInstanceConfig?.message,
  )
  const [notificationInstance, notificationContextHolder]
    = notification.useNotification(props?.staticInstanceConfig?.notification)
  const [modalInstance, modalContextHolder] = Modal.useModal()
  props?.getStaticInstance?.({
    message: messageInstance,
    modal: modalInstance as any,
    notification: notificationInstance,
  })
  return () => {
    const { theme: themeProp, prefixCls } = props
    const { appearance, isDarkMode } = useThemeMode()
    const antdThemeFunc = () => {
      const baseAlgorithm = isDarkMode.value
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm

      let antdTheme = themeProp as ThemeConfig | undefined

      if (typeof themeProp === 'function')
        antdTheme = themeProp(appearance.value)

      if (!antdTheme)
        return { algorithm: baseAlgorithm }

      // 如果有 themeProp 说明是外部传入的 theme，需要对算法做一个合并处理，因此先把 themeProp 的算法规整为一个数组
      const algoProp = !antdTheme.algorithm
        ? []
        : Array.isArray(antdTheme.algorithm)
          ? antdTheme.algorithm
          : [antdTheme.algorithm]

      return {
        ...antdTheme,
        algorithm: !antdTheme.algorithm
          ? baseAlgorithm
          : [baseAlgorithm, ...algoProp],
      }
    }

    const antdTheme = antdThemeFunc()
    return (
      <ConfigProvider prefixCls={prefixCls} theme={antdTheme}>
        {messageContextHolder}
        {notificationContextHolder}
        {modalContextHolder}
        {slots.default?.()}
      </ConfigProvider>
    )
  }
})
export default AntdProvider
