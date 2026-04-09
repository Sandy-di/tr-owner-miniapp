// pages/property/order-detail/order-detail.js
const { mockWorkOrders } = require('../../../utils/mock')
const { orderStatusText, orderStatusColor } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    order: null,
    icons: ICONS
  },

  onLoad(options) {
    const order_id = options.order_id || 'W001'
    const order = mockWorkOrders.find(o => o.order_id === order_id) || mockWorkOrders[0]
    this.setData({ order })
  },

  onUpdateStatus(e) {
    const { status } = e.currentTarget.dataset
    const statusMap = {
      'processing': '开始处理',
      'pending_check': '标记完成待验收',
      'completed': '确认完结'
    }
    wx.showModal({
      title: '状态变更',
      content: `确认将工单状态变更为"${statusMap[status]}"？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '状态已更新', icon: 'success' })
        }
      }
    })
  },

  onCallOwner() {
    if (this.data.order) {
      wx.makePhoneCall({ phoneNumber: this.data.order.owner_phone })
    }
  },

  onUploadPhoto() {
    wx.chooseMedia({
      count: 3,
      mediaType: ['image'],
      success: () => {
        wx.showToast({ title: '照片已上传', icon: 'success' })
      }
    })
  }
})
