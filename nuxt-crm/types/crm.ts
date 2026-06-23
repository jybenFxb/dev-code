export interface Customer {
  id: number
  name: string
  contact: string
  phone: string
  region: string
  level: 'A' | 'B' | 'C' | 'D'
  status: 'active' | 'inactive' | 'potential'
  createdAt: string
}

export interface Lead {
  id: number
  source: string
  contact: string
  phone: string
  intentProduct: string
  status: 'new' | 'following' | 'converted' | 'lost'
  owner: string
  createdAt: string
}

export interface Opportunity {
  id: number
  name: string
  customer: string
  amount: number
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  probability: number
  owner: string
  expectedCloseDate: string
}

export interface Contact {
  id: number
  name: string
  company: string
  position: string
  email: string
  phone: string
  source: string
}

export interface UserInfo {
  name: string
  role: string
  avatar: string
}

export interface DashboardStats {
  totalCustomers: number
  totalLeads: number
  totalOpportunities: number
  monthlyDeals: number
}