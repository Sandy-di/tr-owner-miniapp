// pages/me/settings/settings.js
Page({
  data: {
    notificationRepair: true,
    notificationVote: true,
    notificationPayment: true,
    notificationFinance: false
  },

  onToggleRepair(e) {
    this.setData({ notificationRepair: e.detail.value })
  },
  onToggleVote(e) {
    this.setData({ notificationVote: e.detail.value })
  },
  onTogglePayment(e) {
    this.setData({ notificationPayment: e.detail.value })
  },
  onToggleFinance(e) {
    this.setData({ notificationFinance: e.detail.value })
  },

  onClearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确认清除本地缓存数据？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              wx.showToast({ title: '缓存已清除', icon: 'success' })
            }
          })
        }
      }
    })
  },

  onAbout() {
    wx.showModal({
      title: '关于',
      content: 'TR业主微信小程序 v1.0\n基于《民法典》第278条构建的合规投票、财务透明及三方协同社区治理平台。',
      showCancel: false
    })
  },

  onPrivacy() {
    wx.navigateTo({ url: '/pages/webview/webview?url=privacy' })
  }
})
