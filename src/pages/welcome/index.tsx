import styles from './index.module.css'
import { useStore } from '@/store'
export default function Login() {
  const state = useStore()
  const test = useStore(d => d.test)
  console.log('test: ', test)

  console.log('state: ', state)
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div
          onClick={() => {
            state.updateToken('cq')
          }}
          className={styles.subTitle}
        >
          欢迎体验
        </div>
        <div className={styles.title}>React18通用后台管理系统</div>
        <div className={styles.desc}>React18+ReactRouter6.0+AntD5.4+TypeScript5.0+Vite实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
