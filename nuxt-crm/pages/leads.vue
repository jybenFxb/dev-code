<template>
  <div class="leads-container">
    <div class="page-header">
      <h2 class="page-title">线索管理</h2>
      <el-button type="primary">新建线索</el-button>
    </div>

    <el-card>
      <el-table :data="crmStore.leads" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="contact" label="联系人" width="120" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="intentProduct" label="意向产品" min-width="150" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">{{ getStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="负责人" width="120" />
        <el-table-column prop="createdAt" label="创建时间" width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">跟进</el-button>
            <el-button link type="success" size="small">转化</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const crmStore = useCrmStore()

onMounted(() => {
  crmStore.fetchLeads()
})

const getStatusTagType = (status: string) => {
  const map: Record<string, 'primary' | 'warning' | 'success' | 'info'> = {
    'new': 'primary',
    'following': 'warning',
    'converted': 'success',
    'lost': 'info'
  }
  return map[status] || 'info'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    'new': '新线索',
    'following': '跟进中',
    'converted': '已转化',
    'lost': '已流失'
  }
  return map[status] || status
}
</script>