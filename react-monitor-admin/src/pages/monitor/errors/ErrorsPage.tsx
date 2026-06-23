import { useState } from 'react'
import {
  Card, Table, Tag, Typography, Space, Button, Drawer,
  Select, Input, Row, Col, Statistic, message, Tooltip,
} from 'antd'
import {
  BugOutlined, ReloadOutlined, CheckCircleOutlined, EyeOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { ColumnType } from 'antd/es/table'
import type { ErrorItem } from '@/store/monitorStore'
import { useMonitorStore } from '@/store/monitorStore'
import { useTrack } from '@/monitor/hooks/useTrack'

const { Title, Text, Paragraph } = Typography

const ERROR_TYPE_MAP: Record<ErrorItem['errorType'], { label: string; color: string }> = {
  js: { label: 'JS 错误', color: 'red' },
  promise: { label: 'Promise', color: 'orange' },
  resource: { label: '资源错误', color: 'blue' },
  http: { label: 'HTTP 错误', color: 'purple' },
}

const STATUS_MAP: Record<ErrorItem['status'], { label: string; color: string }> = {
  open: { label: '待处理', color: 'error' },
  resolved: { label: '已解决', color: 'success' },
  ignored: { label: '已忽略', color: 'default' },
}

function useErrors(statusFilter?: string) {
  const setErrors = useMonitorStore((s) => s.setErrors)
  return useQuery({
    queryKey: ['monitor-errors', statusFilter],
    queryFn: async () => {
      const params = statusFilter ? { status: statusFilter } : {}
      const res = await axios.get<{ code: number; data: ErrorItem[] }>('/api/monitor/errors', { params })
      setErrors(res.data.data)
      return res.data.data
    },
  })
}

export default function ErrorsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedError, setSelectedError] = useState<ErrorItem | null>(null)
  const { resolveError } = useMonitorStore()
  const { track } = useTrack()
  const { data: errors = [], isLoading, refetch } = useErrors(statusFilter || undefined)

  const handleResolve = async (id: string) => {
    await axios.put(`/api/monitor/errors/${id}/resolve`)
    resolveError(id)
    message.success('已标记为已解决')
    track('error_resolve', '标记错误已解决', { errorId: id })
    void refetch()
  }

  const openCount = errors.filter((e) => e.status === 'open').length

  const columns: ColumnType<ErrorItem>[] = [
    {
      title: '错误信息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (msg: string, record) => (
        <Space direction="vertical" size={2} style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 13 }}>{msg}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.url}</Text>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'errorType',
      key: 'errorType',
      width: 100,
      render: (type: ErrorItem['errorType']) => (
        <Tag color={ERROR_TYPE_MAP[type].color}>{ERROR_TYPE_MAP[type].label}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: ErrorItem['status']) => (
        <Tag color={STATUS_MAP[status].color}>{STATUS_MAP[status].label}</Tag>
      ),
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      key: 'count',
      width: 90,
      sorter: (a, b) => a.count - b.count,
      render: (count: number) => <Text strong style={{ color: count > 100 ? '#ff4d4f' : undefined }}>{count}</Text>,
    },
    {
      title: '最近发生',
      dataIndex: 'lastSeen',
      key: 'lastSeen',
      width: 130,
      render: (ts: number) => (
        <Tooltip title={new Date(ts).toLocaleString()}>
          <Text type="secondary">{formatRelativeTime(ts)}</Text>
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedError(record)
              track('error_view_detail', '查看错误详情', { errorId: record.id })
            }}
          >
            详情
          </Button>
          {record.status === 'open' && (
            <Button
              size="small"
              icon={<CheckCircleOutlined />}
              type="primary"
              ghost
              onClick={() => handleResolve(record.id)}
            >
              解决
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={4} style={{ marginBottom: 20 }}>错误监控</Title>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card bordered={false} size="small">
            <Statistic title="待处理" value={openCount} valueStyle={{ color: '#ff4d4f' }} prefix={<BugOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} size="small">
            <Statistic title="总错误数" value={errors.length} />
          </Card>
        </Col>
      </Row>

      {/* 筛选 + 表格 */}
      <Card bordered={false}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="按状态筛选"
            allowClear
            style={{ width: 140 }}
            value={statusFilter || undefined}
            onChange={(val) => setStatusFilter(val ?? '')}
            options={[
              { label: '待处理', value: 'open' },
              { label: '已解决', value: 'resolved' },
              { label: '已忽略', value: 'ignored' },
            ]}
          />
          <Input.Search placeholder="搜索错误信息" style={{ width: 240 }} />
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>刷新</Button>
        </Space>

        <Table<ErrorItem>
          columns={columns}
          dataSource={errors}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10, showTotal: (total) => `共 ${total} 条` }}
          size="middle"
        />
      </Card>

      {/* 错误详情抽屉 */}
      <Drawer
        title="错误详情"
        open={!!selectedError}
        onClose={() => setSelectedError(null)}
        width={600}
      >
        {selectedError && (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <div>
              <Text type="secondary">错误信息</Text>
              <Paragraph strong style={{ marginTop: 4 }}>{selectedError.message}</Paragraph>
            </div>
            <div>
              <Text type="secondary">发生页面</Text>
              <Paragraph copyable style={{ marginTop: 4 }}>{selectedError.url}</Paragraph>
            </div>
            <div>
              <Text type="secondary">发生次数</Text>
              <Paragraph style={{ marginTop: 4 }}>{selectedError.count} 次</Paragraph>
            </div>
            {selectedError.stack && (
              <div>
                <Text type="secondary">调用栈</Text>
                <pre style={{
                  background: '#f6f8fa',
                  padding: 12,
                  borderRadius: 6,
                  fontSize: 12,
                  overflow: 'auto',
                  marginTop: 4,
                  maxHeight: 300,
                }}>
                  {selectedError.stack}
                </pre>
              </div>
            )}
          </Space>
        )}
      </Drawer>
    </div>
  )
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小时前`
  return `${Math.floor(hours / 24)} 天前`
}
