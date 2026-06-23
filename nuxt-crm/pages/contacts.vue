<template>
  <div class="contacts-container">
    <div class="page-header">
      <h2 class="page-title">联系人</h2>
      <el-button type="primary">新建联系人</el-button>
    </div>

    <el-card>
      <el-table :data="crmStore.contacts" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="company" label="公司" min-width="180" />
        <el-table-column prop="position" label="职位" width="120" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="source" label="来源" width="120" />
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
definePageMeta({ middleware: 'auth' })

const crmStore = useCrmStore()

onMounted(() => {
  crmStore.fetchContacts()
})
</script>