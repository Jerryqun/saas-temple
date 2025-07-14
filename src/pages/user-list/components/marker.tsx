import { useEffect } from 'react'

// https://lbsyun.baidu.com/index.php?title=opendoor

export default () => {
  useEffect(() => {
    renderMap()
  }, [])
  const renderMap = () => {
    // const map = new window.BMapGL.Map('markerMap')
    // map.centerAndZoom('杭州', 12)
  }
  return <div id='markerMap'>22323</div>
}
