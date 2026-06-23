<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-blue"><el-icon><UserFilled /></el-icon></div>
            <div class="stat-info">
              <div class="stat-title">客户总数</div>
              <div class="stat-value">1,284</div>
              <div class="stat-trend trend-up">↑ 12% 较上月</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-orange"><el-icon><Connection /></el-icon></div>
            <div class="stat-info">
              <div class="stat-title">线索数</div>
              <div class="stat-value">3,562</div>
              <div class="stat-trend trend-up">↑ 8% 较上月</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-green"><el-icon><TrendCharts /></el-icon></div>
            <div class="stat-info">
              <div class="stat-title">商机数</div>
              <div class="stat-value">456</div>
              <div class="stat-trend trend-up">↑ 5% 较上月</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-red"><el-icon><Money /></el-icon></div>
            <div class="stat-info">
              <div class="stat-title">本月成交(元)</div>
              <div class="stat-value">¥ 285,000</div>
              <div class="stat-trend trend-down">↓ 2% 较上月</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售漏斗</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <div class="funnel">
              <div class="funnel-layer l1">线索 (3562)</div>
              <div class="funnel-layer l2">商机 (456)</div>
              <div class="funnel-layer l3">谈判 (128)</div>
              <div class="funnel-layer l4">成交 (45)</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>本月新增趋势</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div class="bar-item"><div class="bar" style="height: 40%"></div><span>W1</span></div>
              <div class="bar-item"><div class="bar" style="height: 60%"></div><span>W2</span></div>
              <div class="bar-item"><div class="bar" style="height: 80%"></div><span>W3</span></div>
              <div class="bar-item"><div class="bar" style="height: 50%"></div><span>W4</span></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="list-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <el-table :data="activities" style="width: 100%">
            <el-table-column prop="time" label="时间" width="180" />
            <el-table-column prop="user" label="操作人" width="120" />
            <el-table-column prop="type" label="类型" width="120">
              <template #default="{ row }">
                <el-tag :type="row.type === '客户' ? 'success' : 'warning'" size="small">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="活动内容" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserFilled, Connection, TrendCharts, Money } from '@element-plus/icons-vue'

const activities = ref([
  { time: '2023-10-25 10:30', user: '张三', type: '客户', content: '新增客户"北京星火科技有限公司"' },
  { time: '2023-10-25 09:15', user: '李四', type: '线索', content: '更新线索"钱先生"状态为"已联系"' },
  { time: '2023-10-24 16:45', user: '王五', type: '商机', content: '商机"云创科技年度维保"阶段推进至"商务谈判"' },
  { time: '2023-10-24 14:20', user: '张三', type: '客户', content: '更新"杭州聚力数据"联系方式' },
  { time: '2023-10-23 11:10', user: '赵六', type: '线索', content: '将线索"吴经理"标记为"无意向"' }
])
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-row, .chart-row {
  margin-bottom: 0;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
}

.bg-blue { background-color: #409EFF; }
.bg-orange { background-color: #E6A23C; }
.bg-green { background-color: #67C23A; }
.bg-red { background-color: #F56C6C; }

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stat-trend {
  font-size: 12px;
}

.trend-up { color: #67C23A; }
.trend-down { color: #F56C6C; }

.card-header {
  font-weight: bold;
  color: #303133;
}

.chart-placeholder {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 4px;
}

.funnel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.funnel-layer {
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  height: 40px;
  transition: all 0.3s;
}

.l1 { width: 100%; background-color: #79bbff; }
.l2 { width: 80%; background-color: #409eff; }
.l3 { width: 60%; background-color: #337ecc; }
.l4 { width: 40%; background-color: #2a598a; }

.bar-chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  gap: 8px;
}

.bar {
  width: 40px;
  background-color: #409EFF;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s;
}
</style>
