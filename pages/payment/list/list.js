// pages/payment/list/list.js
const { getPaymentList, createPayment } = require('../../../utils/api')
const { formatMoney, paymentStatusText } = require('../../../utils/util')

Page({
  data: {
    payments: [],
    totalUnpaid: 0,
    user: null,
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const app = getApp()
      const user = app.globalData.userInfo || {}
      const res = await getPaymentList()
      const payments = (res.data?.records || []).map(p => ({
        ...p,
        statusText: paymentStatusText(p.status),
        amountText: formatMoney(p.amount)
      }))
      const totalUnpaid = payments.filter(p => p.status === 'unpaid').reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
      const totalUnpaidText = totalUnpaid.toFixed(2)
      this.setData({ payments, totalUnpaid, totalUnpaidText, user, loading: false })
    } catch (err) {
      console.error('加载缴费列表失败:', err)
      this.setData({ loading: false })
    }
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

  async doPay(paymentId) {
    wx.showLoading({ title: '支付中...' })
    try {
      const res = await createPayment(paymentId)
      wx.hideLoading()
      if (res.code === 200 && res.data) {
        // 调用微信支付
        const payParams = res.data
        wx.requestPayment({
          timeStamp: payParams.timeStamp,
          nonceStr: payParams.nonceStr,
          package: payParams.packageValue,
          signType: 'RSA',
          paySign: payParams.paySign,
          success: () => {
            wx.showToast({ title: '支付成功', icon: 'success' })
            this.loadData()
          },
          fail: (err) => {
            console.error('微信支付失败:', err)
            wx.showToast({ title: '支付取消', icon: 'none' })
          }
        })
      }
    } catch (err) {
      wx.hideLoading()
      console.error('发起支付失败:', err)
      wx.showToast({ title: '支付失败', icon: 'none' })
    }
  }
})
