import React, { useState, useEffect, useCallback, useRef } from 'react'
import { VariableSizeList as List } from 'react-window'
import { Spin, Card, Alert, Input, Button, Avatar } from 'antd'
import { UserOutlined, RobotOutlined } from '@ant-design/icons'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const PAGE_SIZE = 10
const TOTAL_ITEMS = 100

const AuthList = () => {
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [lastLoadTime, setLastLoadTime] = useState(0)
  const [streaming, setStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const listRef = useRef<any>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const streamingRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // 初始加载或新消息时滚动到底部
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, 'end')
    }
  }, [messages.length])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      if (isInitialLoad) {
        setIsInitialLoad(false)
      }

      const newMessages: Message[] = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = `${i + (currentPage - 1) * PAGE_SIZE}`
        const isUser = i % 2 === 0
        return {
          id,
          role: isUser ? 'user' : 'assistant',
          content: isUser ? `用户问题 ${id}` : `AI回答 ${id}`,
          timestamp: Date.now() + i * 1000 // 改为正序，最新消息时间戳更大
        } as Message
      }).reverse() // 反转数组使最新消息在前

      if (isLoadMore) {
        setMessages(prev => [...prev, ...newMessages])
      } else {
        setMessages(newMessages)
      }

      const isLastPage = currentPage * PAGE_SIZE >= TOTAL_ITEMS
      setHasMore(!isLastPage)
      if (!isLastPage) {
        setCurrentPage(prev => prev + 1)
      }
    } finally {
      if (isLoadMore) {
        setLoadingMore(false)
      } else {
        setLoading(false)
      }
    }
  }

  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchData(true)
    }
  }, [hasMore, loadingMore])

  const handleItemsRendered = useCallback(
    ({ visibleStartIndex }: { visibleStartIndex: number }) => {
      const now = Date.now()
      if (!isInitialLoad && visibleStartIndex <= 5 && hasMore && !loadingMore && now - lastLoadTime > 500) {
        setLastLoadTime(now)
        loadMore()
      }
    },
    [hasMore, loadingMore, loadMore, isInitialLoad, lastLoadTime]
  )

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')

    // 模拟AI回复
    setStreaming(true)
    const fullReply = `这是对"${inputValue}"的详细回复，模拟AI思考后生成的流式输出内容。`
    let currentIndex = 0

    streamingRef.current = setInterval(() => {
      if (currentIndex < fullReply.length) {
        setStreamingContent(fullReply.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(streamingRef.current)
        const aiReply: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fullReply,
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, aiReply])
        setStreaming(false)
        setStreamingContent('')
        setTimeout(() => {
          listRef.current?.scrollToItem(messages.length + 1, 'end')
        }, 0)
      }
    }, 50)
  }

  const Row = ({ index, style, data }: { index: number; style: React.CSSProperties; data: Message[] }) => {
    // 跳过正在流式输出的消息
    if (streaming && index === data.length) return null
    const message = data[index]
    const isUser = message.role === 'user'

    return (
      <div style={{ ...style, padding: '8px 16px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            gap: 8
          }}
        >
          <Avatar
            icon={isUser ? <UserOutlined /> : <RobotOutlined />}
            style={{ backgroundColor: isUser ? '#1890ff' : '#52c41a' }}
          />
          <Card
            size='small'
            style={{
              maxWidth: '80%',
              backgroundColor: isUser ? '#e6f7ff' : '#f6ffed',
              borderColor: isUser ? '#91d5ff' : '#b7eb8f'
            }}
          >
            <p>{message.content}</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        padding: 16
      }}
    >
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Spin spinning={loading || streaming}>
          {/** @ts-expect-error react-window类型定义问题 */}
          <List
            ref={listRef}
            height={500}
            itemCount={messages.length}
            itemSize={() => 60}
            width='100%'
            itemData={messages}
            onItemsRendered={handleItemsRendered}
            style={{ overflowX: 'hidden' }}
            // @ts-expect-error reverse属性类型定义问题
            reverse={true}
          >
            {Row}
          </List>
          {streaming && (
            <div style={{ padding: '8px 16px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#52c41a' }} />
                <Card size='small' style={{ maxWidth: '80%', backgroundColor: '#f6ffed', borderColor: '#b7eb8f' }}>
                  <p>{streamingContent}</p>
                </Card>
              </div>
            </div>
          )}
          {/* {loadingMore && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <Alert message='加载历史消息中...' type='info' showIcon />
            </div>
          )}
          {!hasMore && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <Alert message='没有更多历史消息了' type='info' showIcon />
            </div>
          )} */}
          <div ref={scrollRef} />
        </Spin>
      </div>

      <div
        style={{
          padding: '16px',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Input.TextArea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='输入消息...'
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={e => {
            if (!e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
        />
        <Button type='primary' onClick={handleSendMessage}>
          发送
        </Button>
      </div>
    </div>
  )
}

export default AuthList
