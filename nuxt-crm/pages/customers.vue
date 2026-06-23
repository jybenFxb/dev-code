<template>
  <div class="customers-container">
    <div class="page-header">
      <h2 class="page-title">客户管理</h2>
      <div class="header-actions">
        <el-input v-model="searchQuery" placeholder="搜索客户名称" style="width: 250px; margin-right: 15px;">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary">新增客户</el-button>
      </div>
    </div>

    <el-card>
      <el-table :data="filteredCustomers" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="客户名称" min-width="180" />
        <el-table-column prop="contact" label="联系人" width="120" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="region" label="地区" width="100" />
        <el-table-column prop="level" label="级别" width="100">
          <template #default="{ row }">
            <el-tag :type="getLevelTagType(row.level)">{{ row.level }}级</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

definePageMeta({ middleware: 'auth' })

const crmStore = useCrmStore()
const searchQuery = ref('')

onMounted(() => {
  crmStore.fetchCustomers()
})

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return crmStore.customers
  return crmStore.customers.filter(c => c.name.includes(searchQuery.value))
})

const getLevelTagType = (level: string) => {
  const map: Record<string, 'danger' | 'warning' | 'info' | 'primary'> = {
    'A': 'danger',
    'B': 'warning',
    'C': 'info',
    'D': 'primary'
  }
  return map[level] || 'info'
}

const getStatusTagType = (status: string) => {
  const map: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
    'active': 'success',
    'inactive': 'danger',
    'potential': 'warning'
  }
  return map[status] || 'info'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    'active': '活跃',
    'inactive': '流失',
    'potential': '潜在'
  }
  return map[status] || status
}
</script>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
}
</style>