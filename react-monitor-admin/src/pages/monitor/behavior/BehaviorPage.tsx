import { Card, Row, Col, Table, Typography, Tag, Space } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { ColumnType } from 'antd/es/table'
import type { BehaviorItem } from '@/store/monitorStore'
import { useMonitorStore } from '@/store/monitorStore'

const { Title, Text } = Typography

function useBehaviors() {
  const setBehaviors = useMonitorStore((s) => s.setBehaviors)
  return useQuery({
    queryKey: ['monitor-behaviors'],
    queryFn: async () => {
      const res = await axios.get<{ code: number; data: BehaviorItem[] }>('/api/monitor/behaviors')
      setBehaviors(res.data.data)
      return res.data.data
    },
  })
}

// 漏斗图：模拟用户转化路径
function ConversionFunnelChart() {
  const option = {
    tooltip: { trigger: 'item', formatter: (p: { value: number; name: string }) => `${p.name}: ${p.value.toLocaleString()} 人` },
    series: [
      {
        name: '用户转化漏斗',
        type: 'funnel',
        left: '10%',
        width: '80%',
        label: { show: true, formatter: (p: { name: string; value: number }) => `${p.name}\n${p.value.toLocaleString()}` },
        itemStyle: { borderColor: '#fff', borderWidth: 1 },
        data: [
          { value: 12847, name: '页面访问 PV', itemStyle: { color: '#1677ff' } },
          { value: 8934, name: '有效交互', itemStyle: { color: '#52c41a' } },
          { value: 5210, name: '点击核心功能', itemStyle: { color: '#faad14' } },
          { value: 2340, name: '完成目标行为', itemStyle: { color: '#722ed1' } },
          { value: 847, name: '转化成功', itemStyle: { color: '#eb2f96' } },
        ],
      },
    ],
  }
  return <ReactECharts option={option} style={{ height: 360 }} />
}

// 事件热力分布
function EventHeatmap() {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  const data: Array<[number, number, number]> = []
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 24; j++) {
      const isWorkHour = j >= 9 && j <= 18
      const isWeekday = i < 5
      const base = isWorkHour && isWeekday ? 300 : 50
      data.push([j, i, Math.floor(Math.random() * base + 20)])
    }
  }

  const option = {
    tooltip: { position: 'top' },
    grid: { left: 60, right: 20, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: hours, axisLabel: { interval: 2, fontSize: 11 } },
    yAxis: { type: 'category', data: days },
    visualMap: {
      min: 0, max: 350,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#edf2ff', '#1677ff'] },
    },
    series: [
      {
        name: '事件数',
        type: 'heatmap',
        data,
        label: { show: false },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
      },
    ],
  }
  return <ReactECharts option={option} style={{ height: 220 }} />
}

export default function BehaviorPage() {
  const { data: behaviors = [], isLoading } = useBehaviors()

  // 统计各 eventId 出现次数
  const eventStats = behaviors.reduce<Record<string, number>>((acc, b) => {
    acc[b.eventId] = (acc[b.eventId] ?? 0) + 1
    return acc
  }, {})

  const columns: ColumnType<BehaviorItem>[] = [
    {
      title: '事件',
      key: 'event',
      render: (_, r) => (
        <Space direction="vertical" size={2}>
          <Tag color="blue">{r.eventId}</Tag>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.eventName}</Text>
        </Space>
      ),
    },
    { title: '页面', dataIndex: 'url', key: 'url', ellipsis: true },
    { title: '用户', dataIndex: 'userId', key: 'userId', width: 100, render: (v: string) => <Text code>{v ?? '-'}</Text> },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 160,
      render: (ts: number) => new Date(ts).toLocaleString(),
    },
    {
      title: '附加数据',
      dataIndex: 'extra',
      key: 'extra',
      render: (extra: Record<string, unknown>) =>
        extra ? <Text code style={{ fontSize: 11 }}>{JSON.stringify(extra)}</Text> : '-',
    },
  ]

  return (
    <div>
      <Title level={4} style={{ marginBottom: 20 }}>行为埋点</Title>

      <Row gutter={[16, 16]}>
        {/* 转化漏斗 */}
        <Col xs={24} lg={10}>
          <Card title="用户转化漏斗" bordered={false}>
            <ConversionFunnelChart />
          </Card>
        </Col>

        {/* 事件统计 */}
        <Col xs={24} lg={14}>
          <Card title="事件分布 TOP 5" bordered={false}>
            <ReactECharts
              option={{
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                xAxis: {
                  type: 'value',
                  axisLabel: { formatter: (v: number) => v.toLocaleString() },
                },
                yAxis: {
                  type: 'category',
                  data: Object.entries(eventStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([k]) => k),
                },
                series: [
                  {
                    type: 'bar',
                    data: Object.entries(eventStats)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([, v]) => v),
                    itemStyle: {
                      color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#1677ff' }, { offset: 1, color: '#69b1ff' }] },
                      borderRadius: [0, 4, 4, 0],
                    },
                    label: { show: true, position: 'right' },
                  },
                ],
                grid: { left: 100, right: 60, top: 10, bottom: 20 },
              }}
              style={{ height: 200 }}
            />
          </Card>
        </Col>

        {/* 事件热力图 */}
        <Col xs={24}>
          <Card title="事件时间分布热力图（近7天）" bordered={false}>
            <EventHeatmap />
          </Card>
        </Col>

        {/* 事件明细 */}
        <Col xs={24}>
          <Card title="事件明细" bordered={false}>
            <Table<BehaviorItem>
              columns={columns}
              dataSource={behaviors}
              loading={isLoading}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
