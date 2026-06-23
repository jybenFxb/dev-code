<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="never" class="profile-card">
          <div class="profile-header">
            <el-avatar :size="80" icon="UserFilled" />
            <h3 class="user-name">{{ authStore.userInfo.name }}</h3>
            <el-tag size="small">{{ authStore.userInfo.role === 'admin' ? '超级管理员' : '普通用户' }}</el-tag>
          </div>
          <el-divider />
          <div class="profile-info">
            <div class="info-item">
              <span class="label">部门</span>
              <span class="value">管理部</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱</span>
              <span class="value">admin@crm.com</span>
            </div>
            <div class="info-item">
              <span class="label">注册时间</span>
              <span class="value">2023-01-01</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <span style="font-weight: bold;">系统配置</span>
          </template>
          <el-form label-width="120px">
            <el-form-item label="系统名称">
              <el-input value="CRM 管理系统" disabled />
            </el-form-item>
            <el-form-item label="主题设置">
              <el-radio-group model-value="light" disabled>
                <el-radio label="light">浅色模式</el-radio>
                <el-radio label="dark">深色模式</el-radio>
                <el-radio label="auto">跟随系统</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消息通知">
              <el-switch model-value="true" disabled />
            </el-form-item>
            <el-form-item label="默认数据展示">
              <el-select model-value="20" disabled>
                <el-option label="20条/页" value="20" />
                <el-option label="50条/页" value="50" />
                <el-option label="100条/页" value="100" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" disabled>保存配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.page-container {
  height: 100%;
}
.profile-card {
  text-align: center;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
}
.user-name {
  margin: 0;
  color: #303133;
}
.profile-info {
  padding: 10px 0;
}
.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}
.info-item .label {
  color: #909399;
}
.info-item .value {
  color: #303133;
}
</style>
