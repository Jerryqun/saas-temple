import Offscreen from './OffScreen'
import useOffScreen from './useOffScreen'
import { useLocation } from 'react-router-dom'
import { memo } from 'react'

function KeepAliveOutlet() {
  const { outlets } = useOffScreen()
  const { key } = useLocation()
  return (
    <>
      {outlets?.map((o: any) => (
        <Offscreen
          key={o.key}
          mode={key === o.key ? 'visible' : 'hidden'}
          scrollOffset={o.scrollOffset}
          outlet={o.outlet}
          pathname={o.pathname}
        >
          {o.outlet}
        </Offscreen>
      ))}
    </>
  )
}
export default memo(KeepAliveOutlet)
