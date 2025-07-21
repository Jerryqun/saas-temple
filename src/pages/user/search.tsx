import dayjs from 'dayjs'
import type { FormFieldProps } from 'antd-ext-cq'

const searchSchema: FormFieldProps[] = [
  {
    type: 'Select',
    name: 'type',
    label: '资产类型',
    autosearch: 1, // 修改直接查询
    props: {
      options: [
        {
          label: '我的资产',
          value: 0
        },
        {
          label: '全部资产',
          value: 1
        }
      ]
    }
  },
  {
    type: 'Input',
    name: 'name',
    label: '用户名称'
  },
  {
    type: 'Select',
    name: 'sex',
    label: '用户性别',
    props: {
      options: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ]
    }
  },
  {
    type: 'DatePicker',
    name: 'date',
    label: '入职日期',
    ismore: 1,
    transform: ({ date }) => {
      return date
        ? {
            date: dayjs(date).format('YYYY-MM-DD')
          }
        : {
            date: undefined
          }
    }
  },
  {
    type: 'Input',
    name: 'email',
    label: '电子邮箱',
    ismore: 1
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    ismore: 1
  }
]

export default {
  fields: searchSchema
}
