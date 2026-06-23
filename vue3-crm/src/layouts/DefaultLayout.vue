<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo-area">
        <span v-show="!isCollapse" class="logo-text">CRM系统</span>
        <span v-show="isCollapse" class="logo-text-mini">C</span>
      </div>
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#1a1f2e"
        text-color="#c1c6d8"
        active-text-color="#ffffff"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        <el-menu-item index="/customers">
          <el-icon><UserFilled /></el-icon>
          <template #title>客户管理</template>
        </el-menu-item>
        <el-menu-item index="/leads">
          <el-icon><Connection /></el-icon>
          <template #title>线索管理</template>
        </el-menu-item>
        <el-menu-item index="/opportunities">
          <el-icon><TrendCharts /></el-icon>
          <template #title>商机管理</template>
        </el-menu-item>
        <el-menu-item index="/contacts">
          <el-icon><Avatar /></el-icon>
          <template #title>联系人</template>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="toggleCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentRouteName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-icon class="msg-icon"><Bell /></el-icon>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="user-dropdown">
              {{ authStore.userInfo.name }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Odometer, UserFilled, Connection, TrendCharts, Avatar, Setting, Fold, Expand, Bell, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const currentRouteName = computed(() => {
  const map: Record<string, string> = {
    '/dashboard': '仪表盘',
    '/customers': '客户管理',
    '/leads': '线索管理',
    '/opportunities': '商机管理',
    '/contacts': '联系人',
    '/settings': '系统设置'
  }
  return map[route.path] || ''
})

const handleCommand = (command: string) => {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/settings')
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
}

.aside {
  background-color: #1a1f2e;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.logo-area {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.logo-text {
  white-space: nowrap;
}

.logo-text-mini {
  font-size: 24px;
}

.el-menu-vertical {
  border-right: none;
  flex: 1;
}

.el-menu-item.is-active {
  background-color: #0d121c !important;
  border-left: 4px solid #409EFF;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  color: #606266;
}

.collapse-btn:hover {
  color: #409EFF;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.msg-icon {
  font-size: 20px;
  cursor: pointer;
  color: #606266;
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #606266;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
