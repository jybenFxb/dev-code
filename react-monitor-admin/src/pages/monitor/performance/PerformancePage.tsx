import { useState } from 'react'
import { Card, Row, Col, Select, Tag, Typography, Table, Space } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { ColumnType } from 'antd/es/table'
import type { PerformanceItem } from '@/store/monitorStore'
import { useMonitorStore } from '@/store/monitorStore'

const { Title, Text } = Typography

const METRIC_CONFIG: Record<string, { label: string; unit: string; good: number; poor: number; color: string }> = {
  LCP: { label: 'Largest Contentful Paint', unit: 'ms', good: 2500, poor: 4000, color: '#1677ff' },
  FCP: { label: 'First Contentful Paint', unit: 'ms', good: 1800, poor: 3000, color: '#52c41a' },
  CLS: { label: 'Cumulative Layout Shift', unit: '×0.001', good: 100, poor: 250, color: '#faad14' },
  TTFB: { label: 'Time to First Byte', unit: 'ms', good: 800, poor: 1800, color: '#722ed1' },
  INP: { label: 'Interaction to Next Paint', unit: 'ms', good: 200, poor: 500, color: '#eb2f96' },
}

function getRatingTag(rating: string) {
  const map = { good: { label: '良好', color: 'success' }, 'needs-improvement': { label: '需改进', color: 'warning' }, poor: { label: '差', color: 'error' } }
  const cfg = map[rating as keyof typeof map] ?? map.good
  return <Tag color={cfg.color}>{cfg.label}</Tag>
}

function usePerformance(metric?: string) {
  const setPerformances = useMonitorStore((s) => s.setPerformances)
  return useQuery({
    queryKey: ['monitor-performance', metric],
    queryFn: async () => {
      const res = await axios.get<{ code: number; data: PerformanceItem[] }>('/api/monitor/performance', {
        params: metric ? { metric } : {},
      })
      setPerformances(res.data.data)
      return res.data.data
    },
  })
}

function MetricLineChart({ data, metric }: { data: PerformanceItem[]; metric: string }) {
  const cfg = METRIC_CONFIG[metric]
  if (!cfg) return null

  // 按时间排序，聚合为每天均值
  const grouped: Record<string, number[]> = {}
  data.forEach((item) => {
    const day = new Date(item.timestamp).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
    if (!grouped[day]) grouped[day] = []
    grouped[day].push(item.value)
  })

  const days = Object.keys(grouped).sort()
  const values = days.map((d) => {
    const arr = grouped[d]
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
  })

  const option = {
    tooltip: { trigger: 'axis', formatter: (params: Array<{ value: number }>) => `${params[0].value} ${cfg.unit}` },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value', axisLabel: { formatter: (v: number) => `${v}${cfg.unit}` } },
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        itemStyle: { color: cfg.color },
        areaStyle: { color: cfg.color, opacity: 0.1 },
        markLine: {
          silent: true,
          data: [
            { yAxis: cfg.good, lineStyle: { color: '#52c41a', type: 'dashed' }, label: { formatter: 'Good' } },
            { yAxis: cfg.poor, lineStyle: { color: '#ff4d4f', type: 'dashed' }, label: { formatter: 'Poor' } },
          ],
        },
      },
    ],
    grid: { left: 60, right: 20, top: 30, bottom: 30 },
  }
  return <ReactECharts option={option} style={{ height: 240 }} />
}

export default function PerformancePage() {
  const [metricFilter, setMetricFilter] = useState<string>('')
  const { data: items = [], isLoading } = usePerformance(metricFilter || undefined)

  const columns: ColumnType<PerformanceItem>[] = [
    { title: '指标', dataIndex: 'metric', key: 'metric', width: 80, render: (m: string) => <Tag>{m}</Tag> },
    {
      title: '值', dataIndex: 'value', key: 'value', width: 100,
      render: (v: number, r) => <Text strong>{v} {METRIC_CONFIG[r.metric]?.unit}</Text>,
    },
    { title: '评级', dataIndex: 'rating', key: 'rating', width: 100, render: getRatingTag },
    { title: '页面', dataIndex: 'url', key: 'url', ellipsis: true },
    {
      title: '时间', dataIndex: 'timestamp', key: 'timestamp', width: 160,
      render: (ts: number) => new Date(ts).toLocaleString(),
    },
  ]

  return (
    <div>
      <Title level={4} style={{ marginBottom: 20 }}>性能分析</Title>

      {/* 指标卡片 */}
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        {Object.entries(METRIC_CONFIG).map(([key, cfg]) => {
          const metricData = items.filter((i) => i.metric === key)
          const avg = metricData.length
            ? Math.round(metricData.reduce((a, b) => a + b.value, 0) / metricData.length)
            : '-'
          const goodRate = metricData.length
            ? Math.round((metricData.filter((i) => i.rating === 'good').length / metricData.length) * 100)
            : 0

          return (
            <Col xs={12} sm={8} lg={24 / 5} key={key}>
              <Card bordered={false} size="small" style={{ borderTop: `3px solid ${cfg.color}` }}>
                <Text strong style={{ color: cfg.color }}>{key}</Text>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{avg}</div>
                <Text type="secondary" style={{ fontSize: 11 }}>{cfg.unit} 均值</Text>
                <div style={{ marginTop: 4 }}>
                  <Tag color="success" style={{ fontSize: 11 }}>{goodRate}% 良好</Tag>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>

      {/* 趋势图 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {['LCP', 'FCP', 'TTFB'].map((m) => (
          <Col xs={24} lg={8} key={m}>
            <Card title={`${m} 趋势`} bordered={false} size="small">
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                {METRIC_CONFIG[m].label}
              </Text>
              <MetricLineChart data={items.filter((i) => i.metric === m)} metric={m} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 明细表格 */}
      <Card bordered={false}>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="按指标筛选"
            allowClear
            style={{ width: 140 }}
            value={metricFilter || undefined}
            onChange={(v) => setMetricFilter(v ?? '')}
            options={Object.keys(METRIC_CONFIG).map((k) => ({ label: k, value: k }))}
          />
        </Space>
        <Table<PerformanceItem>
          columns={columns}
          dataSource={items}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10, showTotal: (t) => `共 ${t} 条` }}
          size="middle"
        />
      </Card>
    </div>
  )
}
