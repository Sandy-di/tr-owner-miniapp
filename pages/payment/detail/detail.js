// pages/payment/detail/detail.js
const { getPaymentDetail, createPayment } = require('../../../utils/api')
const { formatMoney, paymentStatusText } = require('../../../utils/util')

Page({
  data: {
    payment: null,
    loading: true
  },

  async onLoad(options) {
    const paymentId = options.payment_id || options.id || ''
    try {
      const res = await getPaymentDetail(paymentId)
      const payment = res.data || {}
      this.setData({
        payment: {
          ...payment,
          statusText: paymentStatusText(payment.status),
          amountText: formatMoney(payment.amount)
        },
        loading: false
      })
    } catch (err) {
      console.error('加载缴费详情失败:', err)
      this.setData({ loading: false })
    }
  },

  async onPay() {
    wx.showModal({
      title: '确认缴费',
      content: `确认缴纳 ${this.data.payment.amountText}？`,
      success: async (res) => {
        if (res.confirm) {
          try {
            wx.showLoading({ title: '支付中...' })
            const payRes = await createPayment(this.data.payment.paymentId || this.data.payment.payment_id)
            wx.hideLoading()
            if (payRes.code === 200 && payRes.data) {
              const payParams = payRes.data
              wx.requestPayment({
                timeStamp: payParams.timeStamp,
                nonceStr: payParams.nonceStr,
                package: payParams.packageValue,
                signType: 'RSA',
                paySign: payParams.paySign,
                success: () => {
                  wx.showToast({ title: '支付成功', icon: 'success' })
                },
                fail: () => {
                  wx.showToast({ title: '支付取消', icon: 'none' })
                }
              })
            }
          } catch (err) {
            wx.hideLoading()
            wx.showToast({ title: '支付失败', icon: 'none' })
          }
        }
      }
    })
  },

  onViewReceipt() {
    wx.showToast({ title: '查看电子收据', icon: 'none' })
  }
})
