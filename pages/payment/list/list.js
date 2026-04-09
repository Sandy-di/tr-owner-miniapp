// pages/payment/list/list.js
const { mockPayments, mockUser } = require('../../../utils/mock')
const { formatMoney, paymentStatusText } = require('../../../utils/util')

Page({
  data: {
    payments: [],
    totalUnpaid: 0,
    user: null
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    const payments = mockPayments.map(p => ({
      ...p,
      statusText: paymentStatusText(p.status),
      amountText: formatMoney(p.amount)
    }))
    const totalUnpaid = mockPayments.filter(p => p.status === 'unpaid').reduce((sum, p) => sum + p.amount, 0)
    const totalUnpaidText = totalUnpaid.toFixed(2)
    this.setData({ payments, totalUnpaid, totalUnpaidText, user: mockUser })
  },

  onPaymentTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/payment/detail/detail?payment_id=${id}` })
  },

  onPayAll() {
    wx.showModal({
      title: '批量缴费',
      content: `确认缴纳所有待缴费用 ${formatMoney(this.data.totalUnpaid)}？`,
      success: (res) => {
        if (res.confirm) {
          this.doPay('all')
        }
      }
    })
  },

  doPay(paymentId) {
    wx.showLoading({ title: '支付中...' })
    // 模拟微信支付
    setTimeout(() => {
      wx.hideLoading()
      wx.requestPayment({
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: 'MD5',
        paySign: '',
        success: () => {
          wx.showToast({ title: '支付成功', icon: 'success' })
        },
        fail: () => {
          // 模拟支付成功
          wx.showToast({ title: '支付成功', icon: 'success' })
        }
      })
    }, 1000)
  }
})
