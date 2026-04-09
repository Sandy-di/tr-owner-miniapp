// pages/finance/list/list.js
const { mockFinanceRecords } = require('../../../utils/mock')
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
    ]
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  loadData() {
    const records = mockFinanceRecords.map(r => ({
      ...r,
      amountText: formatMoney(r.amount)
    }))
    const totalIncome = mockFinanceRecords.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
    const totalExpense = mockFinanceRecords.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0)
    this.setData({
      records,
      summary: {
        totalIncome: formatMoney(totalIncome),
        totalExpense: formatMoney(totalExpense),
        balance: formatMoney(totalIncome - totalExpense)
      }
    })
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
    this.loadData()
    wx.stopPullDownRefresh()
  }
})
