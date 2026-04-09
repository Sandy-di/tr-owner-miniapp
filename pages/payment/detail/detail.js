// pages/payment/detail/detail.js
const { mockPayments } = require('../../../utils/mock')
const { formatMoney, paymentStatusText } = require('../../../utils/util')

Page({
  data: {
    payment: null
  },

  onLoad(options) {
    const payment_id = options.payment_id || 'P001'
    const payment = mockPayments.find(p => p.payment_id === payment_id) || mockPayments[0]
    this.setData({
      payment: {
        ...payment,
        statusText: paymentStatusText(payment.status),
        amountText: formatMoney(payment.amount)
      }
    })
  },

  onPay() {
    wx.showModal({
      title: '确认缴费',
      content: `确认缴纳 ${this.data.payment.amountText}？`,
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '支付中...' })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({ title: '支付成功', icon: 'success' })
          }, 1500)
        }
      }
    })
  },

  onViewReceipt() {
    wx.showToast({ title: '查看电子收据', icon: 'none' })
  }
})
