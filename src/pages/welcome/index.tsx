// import { Button } from 'antd'
import styles from './index.module.css'
export default function Login() {
  return (
    <div className={styles.welcome}>
      {/* <Button type='link'>Link Button</Button> */}
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18通用后台管理系统</div>
        <div className={styles.desc}>React18+ReactRouter7.0+AntD5+TypeScript5.0+Vite实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
