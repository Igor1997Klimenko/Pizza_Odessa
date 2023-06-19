import { FC } from 'react'
import './Error.module.scss'
import styles from './Error.module.scss'

export const ErrorApiFetch: FC = () => {
  return <span className={styles.errorFetch}>An error has occurred!!!</span>
}
