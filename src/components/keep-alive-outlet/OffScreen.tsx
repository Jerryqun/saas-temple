import { Suspense, memo } from 'react'
import Repeater from './Repeater'

const Offscreen = (props: any) => {
  const { mode, children } = props
  return (
    <Suspense fallback={null}>
      {/* {children} */}
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  )
}

export default memo(Offscreen)
