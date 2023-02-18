import styles from 'ansi-styles'

export const cyan = (str: string) =>
  `${styles.cyan.open}${str}${styles.cyan.close}`

export const magenta = (str: string) =>
  `${styles.magenta.open}${str}${styles.magenta.close}`

export const yellow = (str: string) =>
  `${styles.yellow.open}${str}${styles.yellow.close}`

export const green = (str: string) =>
  `${styles.green.open}${str}${styles.green.close}`

export const red = (str: string) =>
  `${styles.red.open}${str}${styles.red.close}`
