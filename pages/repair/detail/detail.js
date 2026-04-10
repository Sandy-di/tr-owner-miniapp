// pages/repair/detail/detail.js
const { getWorkOrderDetail, rateWorkOrder } = require('../../../utils/api')
const { orderStatusText, orderStatusColor, formatDate } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    order: null,
    statusSteps: [],
    showRatingModal: false,
    rating: 0,
    comment: '',
    icons: ICONS,
    loading: true
  },

  async onLoad(options) {
    const orderId = options.order_id || options.id || ''
    try {
      const res = await getWorkOrderDetail(orderId)
      const order = res.data || {}
      this.setData({
        order,
        statusSteps: this.buildStatusSteps(order.status),
        loading: false
      })
    } catch (err) {
      console.error('加载工单详情失败:', err)
      this.setData({ loading: false })
    }
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

  async onSubmitRating() {
    if (this.data.rating === 0) {
      wx.showToast({ title: '请选择评分', icon: 'none' })
      return
    }
    wx.showLoading({ title: '提交中...' })
    try {
      const orderId = this.data.order.orderId || this.data.order.order_id
      await rateWorkOrder(orderId, {
        rating: this.data.rating,
        comment: this.data.comment
      })
      wx.hideLoading()
      this.setData({ showRatingModal: false })
      wx.showToast({ title: '评价成功', icon: 'success' })
    } catch (err) {
      wx.hideLoading()
      console.error('评价提交失败:', err)
      wx.showToast({ title: '评价失败', icon: 'none' })
    }
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
    const phone = this.data.order.staffPhone || this.data.order.staff_phone
    if (phone) wx.makePhoneCall({ phoneNumber: phone })
  }
})
