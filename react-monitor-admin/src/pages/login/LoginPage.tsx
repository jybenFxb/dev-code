import { useState } from 'react'
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, BugOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import { useTrack } from '@/monitor/hooks/useTrack'
import axios from 'axios'
import styles from './LoginPage.module.css'

const { Title, Text } = Typography

interface LoginForm {
  username: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useUserStore()
  const { track } = useTrack()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true)
    track('btn_login_submit', '提交登录表单', { username: values.username })

    try {
      const res = await axios.post<{
        code: number
        data: { id: string; name: string; avatar: string; role: 'admin' | 'viewer'; token: string }
      }>('/api/auth/login', {
        username: values.username,
        password: values.password,
      })

      login(res.data.data)
      message.success(`欢迎回来，${res.data.data.name}！`)
      track('login_success', '登录成功')
      navigate(from, { replace: true })
    } catch {
      message.error('账号或密码错误，请重试')
      track('login_failed', '登录失败', { username: values.username })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <Card className={styles.card} bordered={false}>
        {/* Logo */}
        <div className={styles.header}>
          <BugOutlined className={styles.logo} />
          <Title level={3} style={{ margin: 0 }}>Monitor Admin</Title>
          <Text type="secondary">前端监控与埋点分析平台</Text>
        </div>

        <Form<LoginForm>
          name="login"
          initialValues={{ username: 'admin', password: '123456', remember: true }}
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名（admin）"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码（123456）"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              data-track-id="btn_login"
              data-track-name="点击登录按钮"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: 12 }}>
          演示账号：admin / 123456
        </Text>
      </Card>
    </div>
  )
}
