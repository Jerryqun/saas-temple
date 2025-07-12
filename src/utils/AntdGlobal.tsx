// https://ant-design.antgroup.com/components/app-cn
/**
 * 全局场景（redux 场景） antd  message  全局使用
 */

// Entry component
import { App, message as antdMessage } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

antdMessage.config({ maxCount: 1 })

let message: MessageInstance
let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification
  return null
}

antdMessage.config({ maxCount: 1 })

export { message, notification, modal }
