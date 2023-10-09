import { defineComponent } from 'vue'
import { useStyles } from './styles'

export default defineComponent(() => {
  const { styles } = useStyles()
  return () => {
    return (
      <div class={styles.value.card}>
        <div class={styles.value.container}>测试</div>
      </div>
    )
  }
})
