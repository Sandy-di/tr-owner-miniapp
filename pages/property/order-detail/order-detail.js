// pages/property/order-detail/order-detail.js
const { getWorkOrderDetail, processWorkOrder, completeWorkOrder } = require('../../../utils/api')
const { orderStatusText, orderStatusColor } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    order: null,
    icons: ICONS,
    loading: true
  },

  async onLoad(options) {
    const orderId = options.order_id || options.id || ''
    try {
      const res = await getWorkOrderDetail(orderId)
      const order = res.data || {}
      this.setData({ order, loading: false })
    } catch (err) {
      console.error('加载工单详情失败:', err)
      this.setData({ loading: false })
    }
  },

  async onUpdateStatus(e) {
    const { status } = e.currentTarget.dataset
    const statusMap = {
      'processing': '开始处理',
      'pending_check': '标记完成待验收',
      'completed': '确认完结'
    }
    wx.showModal({
      title: '状态变更',
      content: `确认将工单状态变更为"${statusMap[status]}"？`,
      success: async (res) => {
        if (res.confirm) {
          try {
            const orderId = this.data.order.orderId || this.data.order.order_id
            if (status === 'processing') {
              await processWorkOrder(orderId)
            } else if (status === 'pending_check' || status === 'completed') {
              await completeWorkOrder(orderId, { status })
            }
            wx.showToast({ title: '状态已更新', icon: 'success' })
            // 刷新数据
            const detailRes = await getWorkOrderDetail(orderId)
            this.setData({ order: detailRes.data })
          } catch (err) {
            wx.showToast({ title: '更新失败', icon: 'none' })
          }
        }
      }
    })
  },

  onCallOwner() {
    if (this.data.order) {
      const phone = this.data.order.ownerPhone || this.data.order.owner_phone
      if (phone) wx.makePhoneCall({ phoneNumber: phone })
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
