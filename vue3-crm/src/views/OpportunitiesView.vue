<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header>
        <div class="page-header">
          <span class="page-title">商机管理</span>
          <div class="header-actions">
            <el-button type="primary">
              <el-icon class="el-icon--left"><Plus /></el-icon>新增商机
            </el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商机名称" min-width="180" />
        <el-table-column prop="customer" label="客户" min-width="180" />
        <el-table-column prop="amount" label="金额(元)" width="120">
          <template #default="{ row }">
            ¥ {{ Number(row.amount).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="阶段" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ row.stage }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="probability" label="概率" width="100" />
        <el-table-column prop="owner" label="负责人" width="120" />
        <el-table-column prop="expectedCloseDate" label="预计关闭日期" width="150" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">推进</el-button>
            <el-button link type="success" size="small">赢单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api'
import { Plus } from '@element-plus/icons-vue'

const tableData = ref<any[]>([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.getOpportunities()
    tableData.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.page-container {
  height: 100%;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
