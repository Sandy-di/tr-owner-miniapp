// pages/finance/detail/detail.js
const { mockFinanceRecords } = require('../../../utils/mock')
const { formatMoney } = require('../../../utils/util')

Page({
  data: {
    record: null
  },

  onLoad(options) {
    const finance_id = options.finance_id || 'F001'
    const record = mockFinanceRecords.find(r => r.finance_id === finance_id) || mockFinanceRecords[0]
    this.setData({
      record: {
        ...record,
        amountText: formatMoney(record.amount)
      }
    })
  },

  onPreviewVoucher() {
    wx.showToast({ title: '凭证预览（3秒内加载）', icon: 'none' })
    // 实际场景: wx.previewImage / wx.openDocument
  }
})
