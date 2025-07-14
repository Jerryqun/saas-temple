import { sleep } from '@/utils'
import UserService from '@/utils/service-mock'
import { message } from 'antd'
import type { TableProps } from 'hnwx-antd-comps'
import React from 'react'
import formSchema from './form'

const service = new UserService()

// 模拟接口延迟
const delay = (ms: number) =>
  new Promise(res => {
    setTimeout(res, ms, true)
  })

const tableSchema: TableProps = {
  rowKey: 'id',
  title: '用户列表',
  infoContent: <div>客户签名总数：1244555；平均分数：58分</div>,
  request: async params => {
    await sleep(1500)
    const { code, data, total } = service.getUsers(params)
    return {
      total,
      isError: code !== 200,
      list: data
    }
  },
  scroll: { x: 1200 },
  tools: [
    {
      label: '新增',
      key: 'add1',
      modalFormProps: ({ onSearch }) => {
        return {
          title: '新增用户',
          fields: formSchema,
          drag: true,
          async onSubmit() {
            await delay(400)
            message.success('保存成功')
            onSearch()
          }
        }
      }
    },
    {
      label: '添加2',
      key: 'add2',
      drawerFormProps: ({ onSearch }) => {
        return {
          title: '新增用户2',
          fields: formSchema,
          // drag: true,
          column: 2,
          async onSubmit() {
            await delay(400)
            message.success('保存成功')
            onSearch()
          }
        }
      }
    },
    {
      type: 'Dropdown',
      label: '更多操作',
      menu: [
        {
          key: 'action_1',
          label: '更多操作1'
        },
        {
          type: 'Divider',
          key: 'split'
        },
        {
          key: 'action_2',
          label: '更多操作2'
        },
        {
          key: 'action_3',
          label: '更多操作3'
        }
      ]
    },
    {
      type: 'Refresh'
    },
    {
      type: 'FilterColumns'
    }
  ],
  columns: [
    // 列基本信息
    {
      title: () => <div>ID</div>,
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
      ellipsis: true
    },
    {
      title: '客户姓名',
      ellipsis: true,
      dataIndex: 'username',
      width: 150
    },
    {
      title: '性别',
      ellipsis: true,
      dataIndex: 'sex',
      width: 150,
      filters: [
        {
          text: '男',
          value: 1
        },
        {
          text: '女',
          value: 2
        }
      ]
    },
    {
      title: '城市',
      ellipsis: true,
      dataIndex: 'city',
      width: 150
    },
    {
      title: '签名',
      ellipsis: true,
      dataIndex: 'sign',
      width: 120
    },
    {
      title: '职业',
      ellipsis: true,
      dataIndex: 'classify',
      width: 120
    },
    {
      title: '分数',
      ellipsis: true,
      dataIndex: 'score',
      width: 100,
      sorter: true
    },
    {
      title: '登录次数',
      ellipsis: true,
      dataIndex: 'logins',
      width: 100,
      sorter: true
    }
  ],
  rowOperations: {
    title: '操作',
    ellipsis: true,
    width: 200,
    showMore: 4,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '编辑',
          key: 'edit1',
          modalFormProps: ({ onRefresh }) => {
            return {
              initialValues: record,
              title: '编辑用户',
              fields: formSchema,
              async onSubmit() {
                await delay(400)
                message.success('保存成功')
                onRefresh()
              }
            }
          }
        },
        {
          label: '用户打点',
          key: 'marker',
          drawerFormProps: ({ onRefresh }) => {
            return {
              title: '用户打点',
              initialValues: record,
              fields: formSchema,
              async onSubmit() {
                await delay(400)
                message.success('保存成功')
                onRefresh()
              }
            }
          }
        },
        {
          label: '删除',
          key: 'remove',
          confirm: {
            content: '是否确定删除'
          },
          onClick: async ({ onSearch }) => {
            await new Promise(res => {
              setTimeout(res, 1000)
            })
            message.success('已删除')
            onSearch() // 刷新
          }
        }
      ]
    }
  }
}

export default tableSchema
