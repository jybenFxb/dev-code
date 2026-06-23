<template>
  <div class="dashboard-container">
    <div class="page-header">
      <h2 class="page-title">仪表盘</h2>
    </div>

    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="color: #67C23A; background: #f0f9eb;">
            <el-icon><TrendCharts /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">客户总数</div>
            <div class="stat-value">156</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="color: #409EFF; background: #ecf5ff;">
            <el-icon><Connection /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">线索数</div>
            <div class="stat-value">89</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="color: #E6A23C; background: #fdf6ec;">
            <el-icon><Money /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">商机数</div>
            <div class="stat-value">34</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="color: #909399; background: #f4f4f5;">
            <el-icon><Trophy /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-title">本月成交</div>
            <div class="stat-value">12</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-cards">
      <el-col :span="12">
        <el-card header="销售趋势">
          <div class="chart-placeholder" style="color: #409EFF;">销售趋势图表占位</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="客户分布">
          <div class="chart-placeholder" style="color: #67C23A;">客户分布图表占位</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card header="最近活动" class="activity-card">
      <el-table :data="recentActivities" style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.tagType">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="operator" label="操作人" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { TrendCharts, Connection, Money, Trophy } from '@element-plus/icons-vue'

definePageMeta({ middleware: 'auth' })

const recentActivities = ref([
  { time: '2025-02-25 10:30', type: '新增客户', desc: '添加了新客户"杭州电商网络有限公司"', operator: '王销售', tagType: 'success' },
  { time: '2025-02-25 09:15', type: '状态变更', desc: '将商机"A公司采购项目"阶段更新为"谈判"', operator: '李销售', tagType: 'warning' },
  { time: '2025-02-24 16:45', type: '新建线索', desc: '从官网渠道获取了一条新线索', operator: '系统自动', tagType: 'info' },
  { time: '2025-02-24 14:20', type: '签单成功', desc: '成功签署"C公司新签项目"合同', operator: '张销售', tagType: 'danger' },
  { time: '2025-02-24 11:00', type: '跟进记录', desc: '电话拜访了"上海贸易有限责任公司"的李四', operator: '王销售', tagType: 'primary' },
])
</script>

<style scoped>
.dashboard-container {
  padding-bottom: 20px;
}
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
}
.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
.chart-cards {
  margin-bottom: 20px;
}
.chart-placeholder {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
}
</style>