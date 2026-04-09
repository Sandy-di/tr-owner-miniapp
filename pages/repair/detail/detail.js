// pages/repair/detail/detail.js
const { mockWorkOrders } = require('../../../utils/mock')
const { orderStatusText, orderStatusColor, formatDate } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    order: null,
    statusSteps: [],
    showRatingModal: false,
    rating: 0,
    comment: '',
    icons: ICONS
  },

  onLoad(options) {
    const order_id = options.order_id || 'W001'
    const order = mockWorkOrders.find(o => o.order_id === order_id) || mockWorkOrders[0]
    this.setData({
      order,
      statusSteps: this.buildStatusSteps(order.status)
    })
  },

  buildStatusSteps(currentStatus) {
    const allSteps = [
      { key: 'submitted', label: '已提交', iconKey: 'edit' },
      { key: 'accepted', label: '已接单', iconKey: 'handshake' },
      { key: 'processing', label: '处理中', iconKey: 'wrench' },
      { key: 'pending_check', label: '待验收', iconKey: 'check' },
      { key: 'completed', label: '已完结', iconKey: 'celebrate' }
    ]
    const statusOrder = ['submitted', 'accepted', 'processing', 'pending_check', 'completed']
    const currentIndex = statusOrder.indexOf(currentStatus)
    
    return allSteps.map((step, i) => ({
      ...step,
      completed: i <= currentIndex,
      active: i === currentIndex
    }))
  },

  onRateStar(e) {
    this.setData({ rating: e.currentTarget.dataset.star })
  },

  onCommentInput(e) {
    this.setData({ comment: e.detail.value })
  },

  onSubmitRating() {
    if (this.data.rating === 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' })
      return
    }
    wx.showLoading({ title: '提交中...' })
    setTimeout(() => {
      wx.hideLoading()
      this.setData({ showRatingModal: false })
      wx.showToast({ title: '评价成功', icon: 'success' })
    }, 1000)
  },

  onShowRating() {
    this.setData({ showRatingModal: true })
  },

  onApplyRework() {
    wx.showModal({
      title: '申请复修',
      content: '确定要申请复修吗？工单将重新分配给维修人员。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '已申请复修', icon: 'success' })
        }
      }
    })
  },

  onCallStaff() {
    wx.makePhoneCall({ phoneNumber: this.data.order.staff_phone })
  }
})
