import type { FormFieldProps } from 'antd-ext-cq'

const fields: FormFieldProps[] = [
  {
    type: 'Input',
    name: 'username',
    label: '名称',
    required: true
  },
  {
    type: 'Select',
    name: 'sex',
    label: '性别',
    required: true,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    }
  },
  {
    type: 'Input',
    name: 'city',
    label: '城市',
    required: true
  },
  {
    type: 'RangePicker',
    name: 'date',
    label: '就读时间',
    required: true,
    nameAlise: ['startTime', 'endTime']
  }
]
export default fields
