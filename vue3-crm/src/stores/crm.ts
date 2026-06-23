import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCrmStore = defineStore('crm', () => {
  const customers = ref<any[]>([])
  const leads = ref<any[]>([])
  const opportunities = ref<any[]>([])
  const contacts = ref<any[]>([])

  function fetchCustomers() {
    customers.value = [
      { id: 1, name: '北京星火科技有限公司', contact: '张总', phone: '13800138000', region: '北京', level: 'A', status: '活跃', createdAt: '2023-01-15' },
      { id: 2, name: '上海光耀集团', contact: '李总', phone: '13900139000', region: '上海', level: 'B', status: '跟进中', createdAt: '2023-02-20' },
      { id: 3, name: '广州新星网络', contact: '王经理', phone: '13700137000', region: '广州', level: 'C', status: '休眠', createdAt: '2023-03-10' },
      { id: 4, name: '深圳云创科技', contact: '赵总', phone: '13600136000', region: '深圳', level: 'A', status: '活跃', createdAt: '2023-04-05' },
      { id: 5, name: '杭州聚力数据', contact: '刘经理', phone: '13500135000', region: '杭州', level: 'B', status: '活跃', createdAt: '2023-05-12' },
    ]
    return customers.value
  }

  function fetchLeads() {
    leads.value = [
      { id: 1, source: '官网咨询', contact: '钱先生', phone: '18600186000', product: 'CRM专业版', status: '新线索', owner: '张三', createdAt: '2023-10-01' },
      { id: 2, source: '展会收集', contact: '孙女士', phone: '18700187000', product: 'ERP系统', status: '已联系', owner: '李四', createdAt: '2023-10-05' },
      { id: 3, source: '老客户介绍', contact: '周总', phone: '18800188000', product: '定制开发', status: '跟进中', owner: '王五', createdAt: '2023-10-10' },
      { id: 4, source: '百度推广', contact: '吴经理', phone: '18900189000', product: 'CRM基础版', status: '无意向', owner: '赵六', createdAt: '2023-10-15' },
      { id: 5, source: '自媒体引流', contact: '郑小姐', phone: '18500185000', product: '营销自动化', status: '已转化', owner: '张三', createdAt: '2023-10-20' },
    ]
    return leads.value
  }

  function fetchOpportunities() {
    opportunities.value = [
      { id: 1, name: '星火科技CRM升级项目', customer: '北京星火科技有限公司', amount: '50000', stage: '需求确认', probability: '60%', owner: '张三', expectedCloseDate: '2023-12-31' },
      { id: 2, name: '光耀集团ERP实施', customer: '上海光耀集团', amount: '200000', stage: '方案报价', probability: '40%', owner: '李四', expectedCloseDate: '2023-11-30' },
      { id: 3, name: '云创科技年度维保', customer: '深圳云创科技', amount: '30000', stage: '商务谈判', probability: '80%', owner: '王五', expectedCloseDate: '2023-10-31' },
      { id: 4, name: '聚力数据定制开发', customer: '杭州聚力数据', amount: '120000', stage: '合同签订', probability: '95%', owner: '张三', expectedCloseDate: '2023-10-25' },
      { id: 5, name: '新星网络二期项目', customer: '广州新星网络', amount: '80000', stage: '初步接触', probability: '20%', owner: '赵六', expectedCloseDate: '2024-01-31' },
    ]
    return opportunities.value
  }

  function fetchContacts() {
    contacts.value = [
      { id: 1, name: '张三', company: '北京星火科技有限公司', position: 'CEO', email: 'zhang@xinghuo.com', phone: '13800138000', source: '合作伙伴' },
      { id: 2, name: '李四', company: '上海光耀集团', position: 'IT总监', email: 'li@guangyao.com', phone: '13900139000', source: '展会' },
      { id: 3, name: '王五', company: '广州新星网络', position: '采购经理', email: 'wang@xinxing.com', phone: '13700137000', source: '官网搜索' },
      { id: 4, name: '赵六', company: '深圳云创科技', position: '技术负责人', email: 'zhao@yunchuang.com', phone: '13600136000', source: '转介绍' },
      { id: 5, name: '钱七', company: '杭州聚力数据', position: '运营总监', email: 'qian@juli.com', phone: '13500135000', source: '线下活动' },
    ]
    return contacts.value
  }

  return { customers, leads, opportunities, contacts, fetchCustomers, fetchLeads, fetchOpportunities, fetchContacts }
})