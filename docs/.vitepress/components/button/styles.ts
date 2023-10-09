import { createStyles } from 'antdv-style'

export const useStyles = createStyles(({ token, css }) => {
  console.log(token)
  return {
    container: {
      color: 'green',
      fontSize: '20px',
    },
    card: css`
      background-color: red;
    `,
  }
})
