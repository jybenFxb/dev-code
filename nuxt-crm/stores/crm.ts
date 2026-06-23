import { defineStore } from 'pinia'
import type { Customer, Lead, Opportunity, Contact } from '../types/crm'

export const useCrmStore = defineStore('crm', () => {
  const customers = ref<Customer[]>([])
  const leads = ref<Lead[]>([])
  const opportunities = ref<Opportunity[]>([])
  const contacts = ref<Contact[]>([])

  async function fetchCustomers() {
    customers.value = [
      { id: 1, name: '北京科技有限公司', contact: '张三', phone: '13800000001', region: '华北', level: 'A', status: 'active', createdAt: '2025-01-01' },
      { id: 2, name: '上海贸易有限责任公司', contact: '李四', phone: '13800000002', region: '华东', level: 'B', status: 'potential', createdAt: '2025-01-02' },
      { id: 3, name: '广州软件技术有限公司', contact: '王五', phone: '13800000003', region: '华南', level: 'A', status: 'active', createdAt: '2025-01-03' },
      { id: 4, name: '深圳跨境电商有限公司', contact: '赵六', phone: '13800000004', region: '华南', level: 'C', status: 'inactive', createdAt: '2025-01-04' },
      { id: 5, name: '成都游戏开发中心', contact: '孙七', phone: '13800000005', region: '西南', level: 'D', status: 'active', createdAt: '2025-01-05' }
    ]
  }

  async function fetchLeads() {
    leads.value = [
      { id: 1, source: '官网注册', contact: '周八', phone: '13900000001', intentProduct: '旗舰版系统', status: 'new', owner: '王销售', createdAt: '2025-02-01' },
      { id: 2, source: '展会收集', contact: '吴九', phone: '13900000002', intentProduct: '企业版系统', status: 'following', owner: '李销售', createdAt: '2025-02-02' },
      { id: 3, source: '朋友推荐', contact: '郑十', phone: '13900000003', intentProduct: '基础版系统', status: 'converted', owner: '张销售', createdAt: '2025-02-03' },
      { id: 4, source: '社交媒体', contact: '陈十一', phone: '13900000004', intentProduct: '旗舰版系统', status: 'lost', owner: '王销售', createdAt: '2025-02-04' },
      { id: 5, source: '官网注册', contact: '林十二', phone: '13900000005', intentProduct: '企业版系统', status: 'following', owner: '李销售', createdAt: '2025-02-05' }
    ]
  }

  async function fetchOpportunities() {
    opportunities.value = [
      { id: 1, name: 'A公司采购项目', customer: '北京科技有限公司', amount: 500000, stage: 'proposal', probability: 60, owner: '王销售', expectedCloseDate: '2025-03-01' },
      { id: 2, name: 'B公司续费项目', customer: '上海贸易有限责任公司', amount: 120000, stage: 'negotiation', probability: 80, owner: '李销售', expectedCloseDate: '2025-03-05' },
      { id: 3, name: 'C公司新签项目', customer: '广州软件技术有限公司', amount: 350000, stage: 'closed_won', probability: 100, owner: '张销售', expectedCloseDate: '2025-02-15' },
      { id: 4, name: 'D公司增购项目', customer: '深圳跨境电商有限公司', amount: 80000, stage: 'prospecting', probability: 20, owner: '王销售', expectedCloseDate: '2025-04-01' },
      { id: 5, name: 'E公司系统升级', customer: '成都游戏开发中心', amount: 200000, stage: 'closed_lost', probability: 0, owner: '李销售', expectedCloseDate: '2025-02-10' }
    ]
  }

  async function fetchContacts() {
    contacts.value = [
      { id: 1, name: '张三', company: '北京科技有限公司', position: 'CEO', email: 'zhangsan@example.com', phone: '13800000001', source: '合作伙伴' },
      { id: 2, name: '李四', company: '上海贸易有限责任公司', position: 'CTO', email: 'lisi@example.com', phone: '13800000002', source: '展会' },
      { id: 3, name: '王五', company: '广州软件技术有限公司', position: '采购总监', email: 'wangwu@example.com', phone: '13800000003', source: '官网' },
      { id: 4, name: '赵六', company: '深圳跨境电商有限公司', position: '运营总监', email: 'zhaoliu@example.com', phone: '13800000004', source: '推荐' },
      { id: 5, name: '孙七', company: '成都游戏开发中心', position: '技术总监', email: 'sunqi@example.com', phone: '13800000005', source: '电话拜访' }
    ]
  }

  return {
    customers, leads, opportunities, contacts,
    fetchCustomers, fetchLeads, fetchOpportunities, fetchContacts
  }
})