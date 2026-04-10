// pages/finance/list/list.js
const { getFinanceList } = require('../../../utils/api')
const { formatMoney } = require('../../../utils/util')

Page({
  data: {
    records: [],
    summary: {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    },
    currentTab: 'all',
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'income', label: '收入' },
      { key: 'expense', label: '支出' }
    ],
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const res = await getFinanceList()
      const records = (res.data?.records || []).map(r => ({
        ...r,
        amountText: formatMoney(r.amount)
      }))
      const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)
      const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0)
      this.setData({
        records,
        summary: {
          totalIncome: formatMoney(totalIncome),
          totalExpense: formatMoney(totalExpense),
          balance: formatMoney(totalIncome - totalExpense)
        },
        loading: false
      })
    } catch (err) {
      console.error('加载财务列表失败:', err)
      this.setData({ loading: false })
    }
  },

  onTabChange(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab })
  },

  filteredRecords() {
    const { records, currentTab } = this.data
    if (currentTab === 'all') return records
    return records.filter(r => r.type === currentTab)
  },

  onRecordTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/finance/detail/detail?finance_id=${id}` })
  },

  onPullDownRefresh() {
    this.loadData().then(() => wx.stopPullDownRefresh())
  }
})
