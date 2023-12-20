import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import { useStyles } from './styles'

export default defineComponent(() => {
  const { styles } = useStyles()
  return () => {
    return (
      <Layout class={styles.value.card}>
        <div class={styles.value.container}>测试</div>
      </Layout>
    )
  }
})
