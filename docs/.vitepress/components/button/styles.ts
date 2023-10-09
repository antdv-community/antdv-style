// @ts-expect-error this
import { createStyles } from 'antdv-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: {
      color: token.colorPrimary,
      fontSize: 20,
    },
    card: css`
      background-color: red;
    `,
  }
})
