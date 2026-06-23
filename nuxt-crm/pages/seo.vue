<template>
  <div class="seo-container">
    <div class="page-header">
      <h2 class="page-title">SEO 分析</h2>
      <div class="page-actions">
        <el-select v-model="dateRange" placeholder="选择时间范围" style="width: 160px; margin-right: 12px;">
          <el-option label="最近 7 天" value="7d" />
          <el-option label="最近 30 天" value="30d" />
          <el-option label="最近 90 天" value="90d" />
        </el-select>
        <el-button type="primary" :icon="Refresh" @click="handleRefresh">刷新数据</el-button>
      </div>
    </div>

    <!-- 网址查询分析 -->
    <el-card class="analyze-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>网址 SEO 分析</span>
          <el-tag type="info" size="small">由 Google PageSpeed Insights 提供支持</el-tag>
        </div>
      </template>
      <div class="analyze-input-row">
        <el-input
          v-model="analyzeUrl"
          placeholder="输入网址，例如 https://example.com"
          size="large"
          clearable
          :prefix-icon="Link"
          @keyup.enter="handleAnalyze"
          style="flex: 1;"
        />
        <el-button
          type="primary"
          size="large"
          :loading="analyzing"
          :icon="Search"
          @click="handleAnalyze"
          style="margin-left: 12px; min-width: 110px;"
        >
          {{ analyzing ? '分析中...' : '开始分析' }}
        </el-button>
      </div>

      <!-- 分析结果 -->
      <div v-if="analyzeResult" class="analyze-result">

        <!-- 评分卡片行 -->
        <el-row :gutter="16" class="score-row">
          <el-col :span="6" v-for="item in scoreCards" :key="item.label">
            <div class="score-card" :style="{ borderColor: scoreColor(item.value) }">
              <div class="score-circle" :style="{ color: scoreColor(item.value) }">
                {{ item.value }}
              </div>
              <div class="score-label">{{ item.label }}</div>
              <div class="score-device">{{ item.device }}</div>
            </div>
          </el-col>
        </el-row>

        <!-- 标签切换：移动端 / 桌面端 -->
        <el-tabs v-model="psTab" class="ps-tabs">
          <el-tab-pane label="移动端" name="mobile" />
          <el-tab-pane label="桌面端" name="desktop" />
        </el-tabs>

        <!-- Core Web Vitals -->
        <el-row :gutter="16" class="vitals-row">
          <el-col :span="4" v-for="v in currentVitals" :key="v.label">
            <div class="vital-card">
              <div class="vital-value">{{ v.value }}</div>
              <div class="vital-label">{{ v.label }}</div>
            </div>
          </el-col>
        </el-row>

        <!-- Meta 信息 -->
        <el-divider content-position="left">Meta 标签检查</el-divider>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-descriptions :column="1" border size="small">
              <el-descriptions-item label="Title">
                <span>{{ analyzeResult.meta.title || '（未设置）' }}</span>
                <el-tag
                  :type="analyzeResult.meta.titleLen >= 30 && analyzeResult.meta.titleLen <= 60 ? 'success' : 'warning'"
                  size="small" style="margin-left: 8px;"
                >
                  {{ analyzeResult.meta.titleLen }} 字符
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="Description">
                <span>{{ analyzeResult.meta.description || '（未设置）' }}</span>
                <el-tag
                  v-if="analyzeResult.meta.descLen > 0"
                  :type="analyzeResult.meta.descLen >= 70 && analyzeResult.meta.descLen <= 160 ? 'success' : 'warning'"
                  size="small" style="margin-left: 8px;"
                >
                  {{ analyzeResult.meta.descLen }} 字符
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="H1 标签">
                {{ analyzeResult.meta.h1 || '（未检测到）' }}
              </el-descriptions-item>
              <el-descriptions-item label="Canonical">
                {{ analyzeResult.meta.canonical || '（未设置）' }}
              </el-descriptions-item>
              <el-descriptions-item label="Robots">
                {{ analyzeResult.meta.robots || '（默认 index,follow）' }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
          <el-col :span="12">
            <el-descriptions :column="1" border size="small">
              <el-descriptions-item label="OG Title">
                {{ analyzeResult.meta.ogTitle || '（未设置）' }}
              </el-descriptions-item>
              <el-descriptions-item label="OG Description">
                {{ analyzeResult.meta.ogDescription || '（未设置）' }}
              </el-descriptions-item>
              <el-descriptions-item label="OG Image">
                <a v-if="analyzeResult.meta.ogImage" :href="analyzeResult.meta.ogImage" target="_blank" style="word-break: break-all;">
                  {{ analyzeResult.meta.ogImage }}
                </a>
                <span v-else>（未设置）</span>
              </el-descriptions-item>
              <el-descriptions-item label="Charset">
                {{ analyzeResult.meta.charset || '（未检测到）' }}
              </el-descriptions-item>
              <el-descriptions-item label="Viewport">
                {{ analyzeResult.meta.viewport || '（未设置）' }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>

        <!-- 检查项清单 -->
        <el-divider content-position="left">SEO 检查清单</el-divider>
        <el-row :gutter="12">
          <el-col :span="6" v-for="check in checkList" :key="check.label">
            <div class="check-item" :class="check.pass ? 'pass' : 'fail'">
              <el-icon>
                <component :is="check.pass ? CircleCheck : CircleClose" />
              </el-icon>
              <span>{{ check.label }}</span>
            </div>
          </el-col>
        </el-row>

        <div class="analyze-footer">
          分析时间：{{ new Date(analyzeResult.analyzedAt).toLocaleString('zh-CN') }}
          &nbsp;·&nbsp;
          <el-link type="primary" :href="analyzeResult.url" target="_blank">访问原网页</el-link>
        </div>
      </div>

      <!-- 空状态 -->
      <el-empty v-else-if="!analyzing" description="输入网址后点击「开始分析」" :image-size="80" />
    </el-card>

    <!-- KPI 指标卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="kpi in kpiList" :key="kpi.title">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" :style="{ color: kpi.color, background: kpi.bg }">
            <el-icon><component :is="kpi.icon" /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">{{ kpi.title }}</div>
            <div class="stat-value">{{ kpi.value }}</div>
            <div class="stat-trend" :class="kpi.trend > 0 ? 'up' : 'down'">
              <el-icon><component :is="kpi.trend > 0 ? ArrowUp : ArrowDown" /></el-icon>
              <span>{{ Math.abs(kpi.trend) }}%</span>
              <span class="trend-label">较上期</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-cards">
      <el-col :span="16">
        <el-card header="自然流量趋势">
          <div class="chart-placeholder" style="color: #409EFF;">
            <el-icon style="font-size: 40px; margin-bottom: 8px;"><TrendCharts /></el-icon>
            <span>自然流量趋势图表</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="流量来源分布">
          <div class="chart-placeholder" style="color: #67C23A;">
            <el-icon style="font-size: 40px; margin-bottom: 8px;"><PieChart /></el-icon>
            <span>流量来源饼图</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-cards">
      <el-col :span="12">
        <el-card header="关键词排名分布">
          <div class="chart-placeholder" style="color: #E6A23C;">
            <el-icon style="font-size: 40px; margin-bottom: 8px;"><DataAnalysis /></el-icon>
            <span>关键词排名柱状图</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="页面速度评分">
          <div class="chart-placeholder" style="color: #F56C6C;">
            <el-icon style="font-size: 40px; margin-bottom: 8px;"><Odometer /></el-icon>
            <span>Core Web Vitals 仪表图</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 关键词排名表 -->
    <el-card header="关键词排名监控" class="table-card">
      <template #header>
        <div class="card-header">
          <span>关键词排名监控</span>
          <el-input
            v-model="keywordSearch"
            placeholder="搜索关键词..."
            :prefix-icon="Search"
            style="width: 220px;"
            clearable
          />
        </div>
      </template>
      <el-table :data="filteredKeywords" style="width: 100%" stripe>
        <el-table-column prop="keyword" label="关键词" min-width="160" />
        <el-table-column prop="rank" label="当前排名" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.rank <= 3 ? 'success' : row.rank <= 10 ? 'warning' : 'info'">
              #{{ row.rank }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prevRank" label="上期排名" width="100" align="center" />
        <el-table-column label="变化" width="90" align="center">
          <template #default="{ row }">
            <span
              class="rank-change"
              :class="row.prevRank - row.rank > 0 ? 'up' : row.prevRank - row.rank < 0 ? 'down' : 'flat'"
            >
              <el-icon v-if="row.prevRank - row.rank > 0"><CaretTop /></el-icon>
              <el-icon v-else-if="row.prevRank - row.rank < 0"><CaretBottom /></el-icon>
              <span v-else>—</span>
              {{ row.prevRank - row.rank !== 0 ? Math.abs(row.prevRank - row.rank) : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="searchVolume" label="月搜索量" width="110" align="right" />
        <el-table-column prop="clicks" label="点击量" width="100" align="right" />
        <el-table-column prop="ctr" label="CTR" width="90" align="center">
          <template #default="{ row }">{{ row.ctr }}%</template>
        </el-table-column>
        <el-table-column prop="url" label="对应页面" min-width="200" show-overflow-tooltip />
      </el-table>
      <el-pagination
        v-model:current-page="keywordPage"
        :page-size="10"
        :total="keywordData.length"
        layout="total, prev, pager, next"
        style="margin-top: 16px; justify-content: flex-end; display: flex;"
      />
    </el-card>

    <!-- 页面 SEO 分析表 -->
    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span>页面 SEO 健康检查</span>
          <el-radio-group v-model="pageFilter" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="error">问题页面</el-radio-button>
            <el-radio-button label="ok">正常页面</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <el-table :data="filteredPages" style="width: 100%" stripe>
        <el-table-column prop="url" label="页面 URL" min-width="220" show-overflow-tooltip />
        <el-table-column prop="title" label="Title 标签" min-width="180" show-overflow-tooltip />
        <el-table-column label="Title 长度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.titleLen >= 30 && row.titleLen <= 60 ? 'success' : 'danger'" size="small">
              {{ row.titleLen }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Meta 描述" width="110" align="center">
          <template #default="{ row }">
            <el-icon :color="row.hasDesc ? '#67C23A' : '#F56C6C'">
              <component :is="row.hasDesc ? CircleCheck : CircleClose" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="H1 标签" width="100" align="center">
          <template #default="{ row }">
            <el-icon :color="row.hasH1 ? '#67C23A' : '#F56C6C'">
              <component :is="row.hasH1 ? CircleCheck : CircleClose" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="Canonical" width="110" align="center">
          <template #default="{ row }">
            <el-icon :color="row.hasCanonical ? '#67C23A' : '#F56C6C'">
              <component :is="row.hasCanonical ? CircleCheck : CircleClose" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="SEO 评分" width="110" align="center">
          <template #default="{ row }">
            <el-progress
              :percentage="row.score"
              :color="row.score >= 80 ? '#67C23A' : row.score >= 60 ? '#E6A23C' : '#F56C6C'"
              :stroke-width="8"
              style="width: 80px;"
            />
          </template>
        </el-table-column>
        <el-table-column prop="indexable" label="可索引" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.indexable ? 'success' : 'danger'" size="small">
              {{ row.indexable ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 外链与反向链接 -->
    <el-card header="反向链接分析" class="table-card">
      <el-table :data="backlinkData" style="width: 100%" stripe>
        <el-table-column prop="domain" label="来源域名" min-width="200" />
        <el-table-column prop="authority" label="域名权重 (DA)" width="130" align="center">
          <template #default="{ row }">
            <el-progress
              :percentage="row.authority"
              :color="row.authority >= 60 ? '#67C23A' : row.authority >= 30 ? '#E6A23C' : '#F56C6C'"
              :stroke-width="8"
              style="width: 80px;"
            />
          </template>
        </el-table-column>
        <el-table-column prop="links" label="链接数" width="100" align="right" />
        <el-table-column prop="type" label="链接类型" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="row.type === 'dofollow' ? 'success' : 'info'" size="small">
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="anchor" label="锚文本" min-width="160" show-overflow-tooltip />
        <el-table-column prop="firstSeen" label="首次发现" width="130" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  TrendCharts, Refresh, Search, ArrowUp, ArrowDown,
  DataAnalysis, Odometer, PieChart, CaretTop, CaretBottom,
  CircleCheck, CircleClose, Link,
} from '@element-plus/icons-vue'

definePageMeta({ middleware: 'auth' })

// ── 网址查询分析 ─────────────────────────────────────────────

interface PageSpeedResult {
  performance: number
  seo: number
  accessibility: number
  bestPractices: number
  fcp: string
  lcp: string
  cls: string
  tbt: string
  ttfb: string
  si: string
}

interface AnalyzeResult {
  url: string
  meta: {
    title: string; description: string; h1: string; canonical: string
    ogTitle: string; ogDescription: string; ogImage: string
    robots: string; viewport: string; charset: string
    titleLen: number; descLen: number
    hasH1: boolean; hasCanonical: boolean; hasDescription: boolean; hasOgTags: boolean
  }
  pageSpeed: { mobile: PageSpeedResult; desktop: PageSpeedResult }
  analyzedAt: string
}

const analyzeUrl = ref('')
const analyzing = ref(false)
const analyzeResult = ref<AnalyzeResult | null>(null)
const psTab = ref<'mobile' | 'desktop'>('mobile')

const scoreColor = (val: number) => {
  if (val >= 90) return '#67C23A'
  if (val >= 50) return '#E6A23C'
  return '#F56C6C'
}

const scoreCards = computed(() => {
  if (!analyzeResult.value) return []
  const { mobile, desktop } = analyzeResult.value.pageSpeed
  return [
    { label: '性能', value: mobile.performance, device: '移动端' },
    { label: 'SEO', value: mobile.seo, device: '移动端' },
    { label: '性能', value: desktop.performance, device: '桌面端' },
    { label: 'SEO', value: desktop.seo, device: '桌面端' },
  ]
})

const currentVitals = computed(() => {
  if (!analyzeResult.value) return []
  const ps = analyzeResult.value.pageSpeed[psTab.value]
  return [
    { label: 'FCP', value: ps.fcp },
    { label: 'LCP', value: ps.lcp },
    { label: 'CLS', value: ps.cls },
    { label: 'TBT', value: ps.tbt },
    { label: 'TTFB', value: ps.ttfb },
    { label: 'SI', value: ps.si },
  ]
})

const checkList = computed(() => {
  if (!analyzeResult.value) return []
  const m = analyzeResult.value.meta
  return [
    { label: 'Title 已设置', pass: m.titleLen > 0 },
    { label: 'Title 长度合适 (30-60)', pass: m.titleLen >= 30 && m.titleLen <= 60 },
    { label: 'Meta Description', pass: m.hasDescription },
    { label: 'Description 长度 (70-160)', pass: m.descLen >= 70 && m.descLen <= 160 },
    { label: 'H1 标签', pass: m.hasH1 },
    { label: 'Canonical 标签', pass: m.hasCanonical },
    { label: 'OG 标签', pass: m.hasOgTags },
    { label: 'Viewport 设置', pass: m.viewport.length > 0 },
  ]
})

const handleAnalyze = async () => {
  const url = analyzeUrl.value.trim()
  if (!url) {
    ElMessage.warning('请输入网址')
    return
  }
  analyzing.value = true
  analyzeResult.value = null
  try {
    const data = await $fetch<AnalyzeResult>('/api/seo/analyze', {
      method: 'POST',
      body: { url },
    })
    analyzeResult.value = data
    ElMessage.success('分析完成')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : '分析失败，请检查网址后重试'
    ElMessage.error(msg)
  } finally {
    analyzing.value = false
  }
}

// 时间范围筛选
const dateRange = ref('30d')
const keywordSearch = ref('')
const keywordPage = ref(1)
const pageFilter = ref('all')

// KPI 数据
const kpiList = [
  { title: '自然流量', value: '24,580', trend: 12.5, color: '#409EFF', bg: '#ecf5ff', icon: TrendCharts },
  { title: '关键词数量', value: '1,234', trend: 8.3, color: '#67C23A', bg: '#f0f9eb', icon: DataAnalysis },
  { title: '平均排名', value: '18.6', trend: -3.2, color: '#E6A23C', bg: '#fdf6ec', icon: Odometer },
  { title: '反向链接', value: '5,891', trend: 6.7, color: '#909399', bg: '#f4f4f5', icon: PieChart },
]

// 关键词数据
const keywordData = ref([
  { keyword: 'CRM 客户管理系统', rank: 1, prevRank: 2, searchVolume: '12,100', clicks: 980, ctr: 8.1, url: '/crm-system' },
  { keyword: '销售管理软件', rank: 3, prevRank: 5, searchVolume: '9,900', clicks: 720, ctr: 7.3, url: '/sales-management' },
  { keyword: '企业 CRM 工具', rank: 5, prevRank: 4, searchVolume: '8,100', clicks: 560, ctr: 6.9, url: '/enterprise-crm' },
  { keyword: '客户跟进系统', rank: 7, prevRank: 7, searchVolume: '6,600', clicks: 410, ctr: 6.2, url: '/follow-up' },
  { keyword: '线索管理平台', rank: 10, prevRank: 15, searchVolume: '5,400', clicks: 320, ctr: 5.9, url: '/leads' },
  { keyword: '商机管理工具', rank: 12, prevRank: 9, searchVolume: '4,400', clicks: 280, ctr: 6.4, url: '/opportunities' },
  { keyword: 'SaaS CRM', rank: 14, prevRank: 18, searchVolume: '3,600', clicks: 210, ctr: 5.8, url: '/saas-crm' },
  { keyword: '客户数据管理', rank: 16, prevRank: 14, searchVolume: '2,900', clicks: 170, ctr: 5.9, url: '/customer-data' },
  { keyword: '销售漏斗分析', rank: 19, prevRank: 22, searchVolume: '2,400', clicks: 130, ctr: 5.4, url: '/funnel' },
  { keyword: '私有部署 CRM', rank: 23, prevRank: 20, searchVolume: '1,900', clicks: 90, ctr: 4.7, url: '/self-hosted' },
  { keyword: '免费 CRM 系统', rank: 28, prevRank: 31, searchVolume: '1,600', clicks: 68, ctr: 4.3, url: '/free-crm' },
  { keyword: '销售数据分析', rank: 35, prevRank: 35, searchVolume: '1,300', clicks: 45, ctr: 3.5, url: '/analytics' },
])

const filteredKeywords = computed(() => {
  const q = keywordSearch.value.trim().toLowerCase()
  return keywordData.value.filter(k => !q || k.keyword.toLowerCase().includes(q))
})

// 页面 SEO 数据
const pageData = ref([
  { url: '/dashboard', title: '仪表盘 - CRM系统', titleLen: 12, hasDesc: true, hasH1: true, hasCanonical: true, score: 95, indexable: true },
  { url: '/customers', title: '客户管理 | CRM系统', titleLen: 14, hasDesc: true, hasH1: true, hasCanonical: true, score: 88, indexable: true },
  { url: '/leads', title: '线索管理', titleLen: 4, hasDesc: false, hasH1: true, hasCanonical: false, score: 62, indexable: true },
  { url: '/opportunities', title: '商机管理 - 销售管理软件 | CRM系统', titleLen: 22, hasDesc: true, hasH1: false, hasCanonical: true, score: 74, indexable: true },
  { url: '/contacts', title: '联系人管理 | CRM系统', titleLen: 14, hasDesc: true, hasH1: true, hasCanonical: true, score: 91, indexable: true },
  { url: '/settings', title: '系统设置', titleLen: 4, hasDesc: false, hasH1: false, hasCanonical: false, score: 38, indexable: false },
  { url: '/login', title: '登录 - CRM系统', titleLen: 9, hasDesc: true, hasH1: true, hasCanonical: true, score: 85, indexable: false },
])

const filteredPages = computed(() => {
  if (pageFilter.value === 'error') return pageData.value.filter(p => p.score < 70)
  if (pageFilter.value === 'ok') return pageData.value.filter(p => p.score >= 70)
  return pageData.value
})

// 反向链接数据
const backlinkData = ref([
  { domain: 'techcrunch.com', authority: 92, links: 3, type: 'dofollow', anchor: 'CRM management tool', firstSeen: '2024-11-02' },
  { domain: 'g2.com', authority: 82, links: 12, type: 'dofollow', anchor: 'customer relationship management', firstSeen: '2024-09-15' },
  { domain: 'producthunt.com', authority: 76, links: 5, type: 'dofollow', anchor: 'CRM系统', firstSeen: '2025-01-08' },
  { domain: 'csdn.net', authority: 68, links: 28, type: 'nofollow', anchor: '客户管理软件', firstSeen: '2024-12-20' },
  { domain: 'zhihu.com', authority: 65, links: 19, type: 'nofollow', anchor: '最好用的CRM', firstSeen: '2025-02-14' },
  { domain: 'juejin.cn', authority: 55, links: 7, type: 'nofollow', anchor: 'Nuxt CRM', firstSeen: '2025-03-01' },
  { domain: 'segmentfault.com', authority: 48, links: 4, type: 'nofollow', anchor: '企业CRM工具', firstSeen: '2025-02-28' },
  { domain: 'infoq.cn', authority: 44, links: 2, type: 'dofollow', anchor: '销售管理平台', firstSeen: '2025-01-25' },
])

const handleRefresh = () => {
  ElMessage.success('数据已刷新')
}
</script>

<style scoped>
.seo-container {
  padding-bottom: 20px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}
.page-actions {
  display: flex;
  align-items: center;
}

/* 查询卡片 */
.analyze-card {
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
}
.analyze-input-row {
  display: flex;
  align-items: center;
}
.analyze-result {
  margin-top: 24px;
}

/* 评分卡 */
.score-row {
  margin-bottom: 16px;
}
.score-card {
  text-align: center;
  padding: 16px 8px;
  border: 2px solid #eee;
  border-radius: 8px;
  transition: border-color 0.3s;
}
.score-circle {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 6px;
}
.score-label {
  font-size: 13px;
  color: #303133;
  font-weight: 500;
}
.score-device {
  font-size: 11px;
  color: #909399;
  margin-top: 2px;
}

/* Core Web Vitals */
.ps-tabs {
  margin-bottom: 12px;
}
.vitals-row {
  margin-bottom: 16px;
}
.vital-card {
  background: #f5f7fa;
  border-radius: 6px;
  padding: 12px 8px;
  text-align: center;
}
.vital-value {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}
.vital-label {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
}

/* 检查清单 */
.check-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 8px;
}
.check-item.pass {
  background: #f0f9eb;
  color: #67C23A;
}
.check-item.fail {
  background: #fef0f0;
  color: #F56C6C;
}

.analyze-footer {
  margin-top: 16px;
  font-size: 12px;
  color: #909399;
  text-align: right;
}

/* KPI 卡片 */
.stat-cards {
  margin-bottom: 20px;
}
.stat-card {
  display: flex;
  align-items: center;
}
.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-right: 15px;
  flex-shrink: 0;
}
.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-title {
  font-size: 13px;
  color: #909399;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 22px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}
.stat-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 2px;
}
.stat-trend.up {
  color: #67C23A;
}
.stat-trend.down {
  color: #F56C6C;
}
.trend-label {
  color: #909399;
  margin-left: 2px;
}

/* 图表 */
.chart-cards {
  margin-bottom: 20px;
}
.chart-placeholder {
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  gap: 8px;
}

/* 表格卡片 */
.table-card {
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

/* 排名变化 */
.rank-change {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-weight: 600;
}
.rank-change.up {
  color: #67C23A;
}
.rank-change.down {
  color: #F56C6C;
}
.rank-change.flat {
  color: #909399;
}
</style>
