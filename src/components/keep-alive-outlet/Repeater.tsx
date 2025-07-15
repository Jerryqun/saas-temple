import { useMemoizedFn } from 'ahooks'
import { useEffect, useRef } from 'react'

const Repeater = (props: any) => {
  // // props
  const { mode, children } = props
  // // refs
  // const resolveRef = useRef<() => void>()

  // // methods
  // const resolvePromise = useMemoizedFn((ignoreMode?: boolean) => {
  //   if ((ignoreMode || mode === 'visible') && typeof resolveRef.current === 'function') {
  //     resolveRef.current()
  //     resolveRef.current = void 0
  //   }
  // })
  // // effect
  // useEffect(() => () => resolvePromise(true), [])

  // // if (mode === 'hidden' && typeof resolveRef.current === 'undefined') {
  // if (mode === 'hidden') {
  //   throw new Promise<void>(resolve => (resolveRef.current = resolve))
  // }

  // resolvePromise()

  return <>{children}</>
}

export default Repeater
