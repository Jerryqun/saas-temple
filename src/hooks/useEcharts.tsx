import * as echarts from 'echarts'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()

  const handleResize = useCallback(() => {
    chartInstance?.resize()
  }, [chartInstance])

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    setChartInstance(chart)

    return () => {
      chart.dispose()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return [chartRef, chartInstance]
}
