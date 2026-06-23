<template>
  <div class="opportunities-container">
    <div class="page-header">
      <h2 class="page-title">商机管理</h2>
      <el-button type="primary">新建商机</el-button>
    </div>

    <el-card>
      <el-table :data="crmStore.opportunities" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="商机名称" min-width="180" />
        <el-table-column prop="customer" label="客户" min-width="180" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="{ row }">
            {{ formatAmount(row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="阶段" width="120">
          <template #default="{ row }">
            <el-tag :type="getStageTagType(row.stage)">{{ getStageText(row.stage) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="probability" label="赢单概率" width="150">
          <template #default="{ row }">
            <el-progress :percentage="row.probability" :color="getProbabilityColor(row.probability)" />
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="负责人" width="120" />
        <el-table-column prop="expectedCloseDate" label="预计关闭日期" width="150" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">推进</el-button>
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
  crmStore.fetchOpportunities()
})

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(amount)
}

const getStageTagType = (stage: string) => {
  const map: Record<string, 'info' | 'primary' | 'warning' | 'primary' | 'success' | 'danger'> = {
    'prospecting': 'info',
    'qualification': 'primary',
    'proposal': 'warning',
    'negotiation': 'primary',
    'closed_won': 'success',
    'closed_lost': 'danger'
  }
  return map[stage] || 'info'
}

const getStageText = (stage: string) => {
  const map: Record<string, string> = {
    'prospecting': '初期沟通',
    'qualification': '立项评估',
    'proposal': '方案报价',
    'negotiation': '商务谈判',
    'closed_won': '赢单',
    'closed_lost': '输单'
  }
  return map[stage] || stage
}

const getProbabilityColor = (percentage: number) => {
  if (percentage < 30) return '#909399'
  if (percentage < 70) return '#E6A23C'
  if (percentage < 100) return '#409EFF'
  return '#67C23A'
}
</script>