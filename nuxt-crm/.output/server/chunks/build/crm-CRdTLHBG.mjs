import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCrmStore = defineStore("crm", () => {
  const customers = ref([]);
  const leads = ref([]);
  const opportunities = ref([]);
  const contacts = ref([]);
  async function fetchCustomers() {
    customers.value = [
      { id: 1, name: "\u5317\u4EAC\u79D1\u6280\u6709\u9650\u516C\u53F8", contact: "\u5F20\u4E09", phone: "13800000001", region: "\u534E\u5317", level: "A", status: "active", createdAt: "2025-01-01" },
      { id: 2, name: "\u4E0A\u6D77\u8D38\u6613\u6709\u9650\u8D23\u4EFB\u516C\u53F8", contact: "\u674E\u56DB", phone: "13800000002", region: "\u534E\u4E1C", level: "B", status: "potential", createdAt: "2025-01-02" },
      { id: 3, name: "\u5E7F\u5DDE\u8F6F\u4EF6\u6280\u672F\u6709\u9650\u516C\u53F8", contact: "\u738B\u4E94", phone: "13800000003", region: "\u534E\u5357", level: "A", status: "active", createdAt: "2025-01-03" },
      { id: 4, name: "\u6DF1\u5733\u8DE8\u5883\u7535\u5546\u6709\u9650\u516C\u53F8", contact: "\u8D75\u516D", phone: "13800000004", region: "\u534E\u5357", level: "C", status: "inactive", createdAt: "2025-01-04" },
      { id: 5, name: "\u6210\u90FD\u6E38\u620F\u5F00\u53D1\u4E2D\u5FC3", contact: "\u5B59\u4E03", phone: "13800000005", region: "\u897F\u5357", level: "D", status: "active", createdAt: "2025-01-05" }
    ];
  }
  async function fetchLeads() {
    leads.value = [
      { id: 1, source: "\u5B98\u7F51\u6CE8\u518C", contact: "\u5468\u516B", phone: "13900000001", intentProduct: "\u65D7\u8230\u7248\u7CFB\u7EDF", status: "new", owner: "\u738B\u9500\u552E", createdAt: "2025-02-01" },
      { id: 2, source: "\u5C55\u4F1A\u6536\u96C6", contact: "\u5434\u4E5D", phone: "13900000002", intentProduct: "\u4F01\u4E1A\u7248\u7CFB\u7EDF", status: "following", owner: "\u674E\u9500\u552E", createdAt: "2025-02-02" },
      { id: 3, source: "\u670B\u53CB\u63A8\u8350", contact: "\u90D1\u5341", phone: "13900000003", intentProduct: "\u57FA\u7840\u7248\u7CFB\u7EDF", status: "converted", owner: "\u5F20\u9500\u552E", createdAt: "2025-02-03" },
      { id: 4, source: "\u793E\u4EA4\u5A92\u4F53", contact: "\u9648\u5341\u4E00", phone: "13900000004", intentProduct: "\u65D7\u8230\u7248\u7CFB\u7EDF", status: "lost", owner: "\u738B\u9500\u552E", createdAt: "2025-02-04" },
      { id: 5, source: "\u5B98\u7F51\u6CE8\u518C", contact: "\u6797\u5341\u4E8C", phone: "13900000005", intentProduct: "\u4F01\u4E1A\u7248\u7CFB\u7EDF", status: "following", owner: "\u674E\u9500\u552E", createdAt: "2025-02-05" }
    ];
  }
  async function fetchOpportunities() {
    opportunities.value = [
      { id: 1, name: "A\u516C\u53F8\u91C7\u8D2D\u9879\u76EE", customer: "\u5317\u4EAC\u79D1\u6280\u6709\u9650\u516C\u53F8", amount: 5e5, stage: "proposal", probability: 60, owner: "\u738B\u9500\u552E", expectedCloseDate: "2025-03-01" },
      { id: 2, name: "B\u516C\u53F8\u7EED\u8D39\u9879\u76EE", customer: "\u4E0A\u6D77\u8D38\u6613\u6709\u9650\u8D23\u4EFB\u516C\u53F8", amount: 12e4, stage: "negotiation", probability: 80, owner: "\u674E\u9500\u552E", expectedCloseDate: "2025-03-05" },
      { id: 3, name: "C\u516C\u53F8\u65B0\u7B7E\u9879\u76EE", customer: "\u5E7F\u5DDE\u8F6F\u4EF6\u6280\u672F\u6709\u9650\u516C\u53F8", amount: 35e4, stage: "closed_won", probability: 100, owner: "\u5F20\u9500\u552E", expectedCloseDate: "2025-02-15" },
      { id: 4, name: "D\u516C\u53F8\u589E\u8D2D\u9879\u76EE", customer: "\u6DF1\u5733\u8DE8\u5883\u7535\u5546\u6709\u9650\u516C\u53F8", amount: 8e4, stage: "prospecting", probability: 20, owner: "\u738B\u9500\u552E", expectedCloseDate: "2025-04-01" },
      { id: 5, name: "E\u516C\u53F8\u7CFB\u7EDF\u5347\u7EA7", customer: "\u6210\u90FD\u6E38\u620F\u5F00\u53D1\u4E2D\u5FC3", amount: 2e5, stage: "closed_lost", probability: 0, owner: "\u674E\u9500\u552E", expectedCloseDate: "2025-02-10" }
    ];
  }
  async function fetchContacts() {
    contacts.value = [
      { id: 1, name: "\u5F20\u4E09", company: "\u5317\u4EAC\u79D1\u6280\u6709\u9650\u516C\u53F8", position: "CEO", email: "zhangsan@example.com", phone: "13800000001", source: "\u5408\u4F5C\u4F19\u4F34" },
      { id: 2, name: "\u674E\u56DB", company: "\u4E0A\u6D77\u8D38\u6613\u6709\u9650\u8D23\u4EFB\u516C\u53F8", position: "CTO", email: "lisi@example.com", phone: "13800000002", source: "\u5C55\u4F1A" },
      { id: 3, name: "\u738B\u4E94", company: "\u5E7F\u5DDE\u8F6F\u4EF6\u6280\u672F\u6709\u9650\u516C\u53F8", position: "\u91C7\u8D2D\u603B\u76D1", email: "wangwu@example.com", phone: "13800000003", source: "\u5B98\u7F51" },
      { id: 4, name: "\u8D75\u516D", company: "\u6DF1\u5733\u8DE8\u5883\u7535\u5546\u6709\u9650\u516C\u53F8", position: "\u8FD0\u8425\u603B\u76D1", email: "zhaoliu@example.com", phone: "13800000004", source: "\u63A8\u8350" },
      { id: 5, name: "\u5B59\u4E03", company: "\u6210\u90FD\u6E38\u620F\u5F00\u53D1\u4E2D\u5FC3", position: "\u6280\u672F\u603B\u76D1", email: "sunqi@example.com", phone: "13800000005", source: "\u7535\u8BDD\u62DC\u8BBF" }
    ];
  }
  return {
    customers,
    leads,
    opportunities,
    contacts,
    fetchCustomers,
    fetchLeads,
    fetchOpportunities,
    fetchContacts
  };
});

export { useCrmStore as u };
//# sourceMappingURL=crm-CRdTLHBG.mjs.map
