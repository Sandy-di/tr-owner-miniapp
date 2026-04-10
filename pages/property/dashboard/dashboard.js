// pages/property/dashboard/dashboard.js
const { getWorkOrderList, acceptWorkOrder, processWorkOrder } = require('../../../utils/api')
const { orderStatusText, orderStatusColor, timeAgo } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    icons: ICONS,
    stats: {
      submitted: 0,
      accepted: 0,
      processing: 0,
      pending_check: 0,
      sla_exceeded: 0,
      today_total: 0
    },
    orders: [],
    autoRefreshTimer: null,
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  onUnload() {
    if (this.data.autoRefreshTimer) {
      clearInterval(this.data.autoRefreshTimer)
    }
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const res = await getWorkOrderList()
      const orders = (res.data?.records || []).map(o => ({
        ...o,
        statusText: orderStatusText(o.status),
        statusColor: orderStatusColor(o.status),
        timeAgo: timeAgo(o.slaStart || o.sla_start || o.createdAt),
        isSlaExceeded: this.checkSlaExceeded(o)
      }))

      const stats = {
        submitted: orders.filter(o => o.status === 'submitted').length,
        accepted: orders.filter(o => o.status === 'accepted').length,
        processing: orders.filter(o => o.status === 'processing').length,
        pending_check: orders.filter(o => o.status === 'pending_check').length,
        sla_exceeded: orders.filter(o => o.isSlaExceeded).length,
        today_total: orders.length
      }

      this.setData({ orders, stats, loading: false })
    } catch (err) {
      console.error('加载物业看板失败:', err)
      this.setData({ loading: false })
    }
  },

  checkSlaExceeded(order) {
    if (order.status === 'completed' || order.status === 'cancelled') return false
    const slaStart = new Date(order.slaStart || order.sla_start).getTime()
    const now = Date.now()
    const twoHours = 2 * 60 * 60 * 1000
    return (now - slaStart) > twoHours && order.status === 'submitted'
  },

  async onAcceptOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '接单确认',
      content: '确认接单处理此工单？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await acceptWorkOrder(id)
            wx.showToast({ title: '接单成功', icon: 'success' })
            this.loadData()
          } catch (err) {
            wx.showToast({ title: '接单失败', icon: 'none' })
          }
        }
      }
    })
  },

  onAssignOrder(e) {
    const { id } = e.currentTarget.dataset
    wx.showActionSheet({
      itemList: ['王师傅', '李师傅', '张师傅', '陈师傅'],
      success: (res) => {
        wx.showToast({ title: `已派单给${['王师傅', '李师傅', '张师傅', '陈师傅'][res.tapIndex]}`, icon: 'none' })
      }
    })
  },

  onOrderDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/property/order-detail/order-detail?order_id=${id}` })
  },

  onRefresh() {
    this.loadData()
    wx.showToast({ title: '已刷新', icon: 'success' })
  },

  toggleAutoRefresh() {
    if (this.data.autoRefreshTimer) {
      clearInterval(this.data.autoRefreshTimer)
      this.setData({ autoRefreshTimer: null })
      wx.showToast({ title: '已关闭自动刷新', icon: 'none' })
    } else {
      const timer = setInterval(() => {
        this.loadData()
      }, 60000) // 每分钟刷新
      this.setData({ autoRefreshTimer: timer })
      wx.showToast({ title: '已开启自动刷新(1分钟)', icon: 'none' })
    }
  }
})
