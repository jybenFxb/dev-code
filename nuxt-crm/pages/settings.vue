<template>
  <div class="settings-container">
    <div class="page-header">
      <h2 class="page-title">系统设置</h2>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card header="个人信息" class="settings-card">
          <el-form label-width="100px">
            <el-form-item label="用户名">
              <el-input :value="authStore.userInfo.name" readonly />
            </el-form-item>
            <el-form-item label="角色">
              <el-input :value="authStore.userInfo.role" readonly />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input value="admin@crm.example.com" readonly />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="系统偏好" class="settings-card">
          <el-form label-width="100px">
            <el-form-item label="语言">
              <el-select v-model="language" placeholder="选择语言">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
              </el-select>
            </el-form-item>
            <el-form-item label="时区">
              <el-select v-model="timezone" placeholder="选择时区">
                <el-option label="Asia/Shanghai (UTC+8)" value="Asia/Shanghai" />
                <el-option label="UTC" value="UTC" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存偏好</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const authStore = useAuthStore()
const language = ref('zh-CN')
const timezone = ref('Asia/Shanghai')
</script>

<style scoped>
.settings-card {
  margin-bottom: 20px;
}
</style>