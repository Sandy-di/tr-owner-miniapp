// pages/finance/detail/detail.js
const { getFinanceDetail } = require('../../../utils/api')
const { formatMoney } = require('../../../utils/util')

Page({
  data: {
    record: null,
    loading: true
  },

  async onLoad(options) {
    const financeId = options.finance_id || options.id || ''
    try {
      const res = await getFinanceDetail(financeId)
      const record = res.data || {}
      this.setData({
        record: {
          ...record,
          amountText: formatMoney(record.amount)
        },
        loading: false
      })
    } catch (err) {
      console.error('加载财务详情失败:', err)
      this.setData({ loading: false })
    }
  },

  onPreviewVoucher() {
    wx.showToast({ title: '凭证预览（3秒内加载）', icon: 'none' })
    // 实际场景: wx.previewImage / wx.openDocument
  }
})
