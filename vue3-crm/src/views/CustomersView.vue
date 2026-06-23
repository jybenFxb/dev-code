<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header>
        <div class="page-header">
          <span class="page-title">客户管理</span>
          <div class="header-actions">
            <el-input v-model="searchQuery" placeholder="搜索客户名称" style="width: 200px" clearable>
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary">
              <el-icon class="el-icon--left"><Plus /></el-icon>新增客户
            </el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="filteredTableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="客户名称" min-width="180" />
        <el-table-column prop="contact" label="联系人" width="120" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="region" label="所在地区" width="120" />
        <el-table-column prop="level" label="客户级别" width="100">
          <template #default="{ row }">
            <el-tag :type="row.level === 'A' ? 'danger' : (row.level === 'B' ? 'warning' : 'info')" size="small">
              {{ row.level }}级
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'info'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="150" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api'
import { Search, Plus } from '@element-plus/icons-vue'

const tableData = ref<any[]>([])
const loading = ref(false)
const searchQuery = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const res = await api.getCustomers()
    tableData.value = res.data
  } finally {
    loading.value = false
  }
}

const filteredTableData = computed(() => {
  if (!searchQuery.value) return tableData.value
  return tableData.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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
.header-actions {
  display: flex;
  gap: 16px;
}
</style>
