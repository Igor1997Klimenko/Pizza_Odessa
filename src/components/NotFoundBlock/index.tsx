import { FC } from 'react'
import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not Found
      </h1>
      <p className={styles.description}>Sorry, this page was not found.</p>
    </div>
  )
}
