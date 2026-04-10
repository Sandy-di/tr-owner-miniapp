// pages/repair/list/list.js
const { getWorkOrderList } = require('../../../utils/api')
const { orderStatusText, orderStatusColor, timeAgo } = require('../../../utils/util')

Page({
  data: {
    orders: [],
    currentTab: 'all',
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'active', label: '进行中' },
      { key: 'completed', label: '已完结' }
    ],
    loading: true
  },

  onLoad() {
    this.loadOrders()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  async loadOrders() {
    this.setData({ loading: true })
    try {
      const res = await getWorkOrderList()
      const orders = (res.data?.records || []).map(o => ({
        ...o,
        statusText: orderStatusText(o.status),
        statusColor: orderStatusColor(o.status),
        timeAgo: timeAgo(o.slaStart || o.sla_start || o.createdAt)
      }))
      this.setData({ orders, loading: false })
    } catch (err) {
      console.error('加载工单列表失败:', err)
      this.setData({ loading: false })
    }
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
    this.loadOrders().then(() => wx.stopPullDownRefresh())
  }
})
