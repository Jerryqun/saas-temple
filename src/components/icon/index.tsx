import { createFromIconfontCN } from '@ant-design/icons'
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4974693_44lvokm89ne.js'
})

export default (props: IconFontProps) => <IconFont {...props} />
