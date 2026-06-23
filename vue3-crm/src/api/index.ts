// import request from './request'
import { useCrmStore } from '@/stores/crm'

// 模拟 API，实际项目中用 request.get 等替换
export const api = {
  getCustomers: () => {
    const crmStore = useCrmStore()
    return Promise.resolve({ code: 200, data: crmStore.fetchCustomers() })
  },
  getLeads: () => {
    const crmStore = useCrmStore()
    return Promise.resolve({ code: 200, data: crmStore.fetchLeads() })
  },
  getOpportunities: () => {
    const crmStore = useCrmStore()
    return Promise.resolve({ code: 200, data: crmStore.fetchOpportunities() })
  },
  getContacts: () => {
    const crmStore = useCrmStore()
    return Promise.resolve({ code: 200, data: crmStore.fetchContacts() })
  }
}
