import { useEffect } from 'react'
import { Row, Col, Card, Statistic, Typography, Tag, Spin } from 'antd'
import {
  BugOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useMonitorStore, type DashboardStats } from '@/store/monitorStore'
import styles from './DashboardPage.module.css'

const { Title, Text } = Typography

function useStats() {
  const setStats = useMonitorStore((s) => s.setStats)
  return useQuery({
    queryKey: ['monitor-stats'],
    queryFn: async () => {
      const res = await axios.get<{ code: number; data: DashboardStats }>('/api/monitor/stats')
      setStats(res.data.data)
      return res.data.data
    },
    refetchInterval: 30_000, // 30s 自动刷新
  })
}

function getRatingColor(rating: string) {
  if (rating === 'good') return '#52c41a'
  if (rating === 'needs-improvement') return '#faad14'
  return '#ff4d4f'
}

function ErrorTrendChart() {
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['JS 错误', 'Promise 错误', '资源错误'] },
    xAxis: {
      type: 'category',
      data: ['6天前', '5天前', '4天前', '3天前', '2天前', '昨天', '今天'],
    },
    yAxis: { type: 'value' },
    series: [
      { name: 'JS 错误', type: 'line', smooth: true, data: [45, 52, 38, 67, 43, 89, 127], itemStyle: { color: '#ff4d4f' } },
      { name: 'Promise 错误', type: 'line', smooth: true, data: [20, 18, 25, 30, 15, 40, 89], itemStyle: { color: '#faad14' } },
      { name: '资源错误', type: 'line', smooth: true, data: [100, 120, 80, 150, 200, 180, 234], itemStyle: { color: '#1677ff' } },
    ],
    grid: { left: 40, right: 20, top: 40, bottom: 30 },
  }
  return <ReactECharts option={option} style={{ height: 280 }} />
}

function PerformanceRadarChart() {
  const option = {
    tooltip: {},
    radar: {
      indicator: [
        { name: 'LCP', max: 5000 },
        { name: 'FCP', max: 3000 },
        { name: 'CLS', max: 300 },
        { name: 'TTFB', max: 1800 },
        { name: 'INP', max: 600 },
      ],
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [2340, 1200, 80, 420, 180],
            name: '当前平均',
            areaStyle: { opacity: 0.2 },
            itemStyle: { color: '#1677ff' },
          },
          {
            value: [2500, 1800, 100, 800, 200],
            name: 'Good 阈值',
            lineStyle: { type: 'dashed' },
            itemStyle: { color: '#52c41a' },
          },
        ],
      },
    ],
    legend: { data: ['当前平均', 'Good 阈值'] },
  }
  return <ReactECharts option={option} style={{ height: 280 }} />
}

function PVTrendChart() {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['6天前', '5天前', '4天前', '3天前', '2天前', '昨天', '今天'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: [9800, 11200, 8700, 13400, 10200, 11850, 12847],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#1677ff' },
              { offset: 1, color: '#69b1ff' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
  }
  return <ReactECharts option={option} style={{ height: 280 }} />
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useStats()

  useEffect(() => {
    document.title = '总览 - Monitor Admin'
  }, [])

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 20 }}>总览</Title>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard} bordered={false}>
            <Statistic
              title="今日错误总数"
              value={stats?.totalErrors}
              prefix={<BugOutlined style={{ color: '#ff4d4f' }} />}
              suffix={
                <Tag color={stats?.errorChange && stats.errorChange < 0 ? 'success' : 'error'} style={{ fontSize: 11 }}>
                  {stats?.errorChange && stats.errorChange < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                  {Math.abs(stats?.errorChange ?? 0)}%
                </Tag>
              }
            />
            <Text type="secondary" style={{ fontSize: 12 }}>较昨日</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard} bordered={false}>
            <Statistic
              title="今日 PV"
              value={stats?.totalPV.toLocaleString()}
              prefix={<EyeOutlined style={{ color: '#1677ff' }} />}
              suffix={
                <Tag color="success" style={{ fontSize: 11 }}>
                  <ArrowUpOutlined />{stats?.pvChange}%
                </Tag>
              }
            />
            <Text type="secondary" style={{ fontSize: 12 }}>页面访问量</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard} bordered={false}>
            <Statistic
              title="平均 LCP"
              value={`${stats?.avgLCP}ms`}
              prefix={<ThunderboltOutlined style={{ color: getRatingColor(stats?.lcpRating ?? 'good') }} />}
            />
            <Tag color={stats?.lcpRating === 'good' ? 'success' : 'warning'} style={{ marginTop: 4 }}>
              {stats?.lcpRating === 'good' ? '良好' : '需改进'}
            </Tag>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statCard} bordered={false}>
            <Statistic
              title="活跃用户"
              value={stats?.activeUsers.toLocaleString()}
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>今日独立用户</Text>
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="错误趋势（近7天）" bordered={false}>
            <ErrorTrendChart />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="性能指标雷达图" bordered={false}>
            <PerformanceRadarChart />
          </Card>
        </Col>

        <Col xs={24}>
          <Card title="PV 趋势（近7天）" bordered={false}>
            <PVTrendChart />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
