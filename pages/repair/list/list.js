// pages/repair/list/list.js
const { mockWorkOrders } = require('../../../utils/mock')
const { orderStatusText, orderStatusColor, timeAgo } = require('../../../utils/util')

Page({
  data: {
    orders: [],
    currentTab: 'all',
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'active', label: '进行中' },
      { key: 'completed', label: '已完结' }
    ]
  },

  onLoad() {
    this.loadOrders()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  loadOrders() {
    const orders = mockWorkOrders.map(o => ({
      ...o,
      statusText: orderStatusText(o.status),
      statusColor: orderStatusColor(o.status),
      timeAgo: timeAgo(o.sla_start)
    }))
    this.setData({ orders })
  },

  onTabChange(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab })
  },

  filteredOrders() {
    const { orders, currentTab } = this.data
    if (currentTab === 'all') return orders
    if (currentTab === 'active') return orders.filter(o => ['submitted', 'accepted', 'processing', 'pending_check', 'rework'].includes(o.status))
    return orders.filter(o => o.status === 'completed')
  },

  onOrderTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/repair/detail/detail?order_id=${id}` })
  },

  onCreateRepair() {
    wx.navigateTo({ url: '/pages/repair/create/create' })
  },

  onPullDownRefresh() {
    this.loadOrders()
    wx.stopPullDownRefresh()
  }
})
