<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
      <div class="logo">
        <span v-if="!isCollapse">CRM系统</span>
        <span v-else>CRM</span>
      </div>
      <el-menu
        :default-active="route.path"
        class="layout-menu"
        :collapse="isCollapse"
        background-color="#1a1f2e"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
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
        <el-menu-item index="/seo">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>SEO 分析</template>
        </el-menu-item>
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ breadcrumbName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-icon class="bell-icon"><Bell /></el-icon>
          <el-dropdown @command="handleCommand">
            <span class="user-dropdown">
              {{ authStore.userInfo.name }}
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="layout-main">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Odometer, UserFilled, Connection, TrendCharts, Avatar, Setting, Fold, Expand, Bell, ArrowDown, DataAnalysis } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const route = useRoute()
const authStore = useAuthStore()

const breadcrumbName = computed(() => {
  const map: Record<string, string> = {
    '/dashboard': '仪表盘',
    '/customers': '客户管理',
    '/leads': '线索管理',
    '/opportunities': '商机管理',
    '/contacts': '联系人',
    '/seo': 'SEO 分析',
    '/settings': '系统设置',
  }
  return map[route.path] || ''
})

const handleCommand = (command: string) => {
  if (command === 'logout') {
    authStore.logout()
    navigateTo('/login')
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-aside {
  background-color: #1a1f2e;
  transition: width 0.3s;
}
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.layout-menu {
  border-right: none;
}
.layout-header {
  background-color: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;
}
.header-left {
  display: flex;
  align-items: center;
}
.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.header-right {
  display: flex;
  align-items: center;
}
.bell-icon {
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.layout-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>