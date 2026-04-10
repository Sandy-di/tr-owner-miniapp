// pages/me/me.js
const { getCurrentUser } = require('../../utils/api')
const { verifyLevelText, verifyLevelColor } = require('../../utils/util')
const { ICONS } = require('../../utils/icons')

Page({
  data: {
    user: null,
    menuList: [
      { title: '身份核验', iconKey: 'lock', url: '/pages/me/verify/verify', badge: '' },
      { title: '我的房产', iconKey: 'home', url: '', badge: '' },
      { title: '缴费记录', iconKey: 'money', url: '/pages/payment/list/list', badge: '' },
      { title: '报修记录', iconKey: 'wrench', url: '/pages/repair/list/list', badge: '' },
      { title: '投票记录', iconKey: 'vote', url: '/pages/vote/list/list', badge: '' },
      { title: '物业看板', iconKey: 'chart', url: '/pages/property/dashboard/dashboard', badge: '物业', show: 'property' },
      { title: '隐私协议', iconKey: 'file', url: '', badge: '' },
      { title: '设置', iconKey: 'settings', url: '/pages/me/settings/settings', badge: '' }
    ]
  },

  onLoad() {
    this.setData({ icons: ICONS })
    this.loadData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
    this.loadData()
  },

  async loadData() {
    try {
      const app = getApp()
      let user = app.globalData.userInfo
      if (!user) {
        const res = await getCurrentUser()
        user = res.data || {}
      }
      const verifyLevel = user.verifyLevel || user.verify_level || 0
      this.setData({
        user,
        verifyText: verifyLevelText(verifyLevel),
        verifyColor: verifyLevelColor(verifyLevel)
      })
    } catch (err) {
      console.error('加载用户信息失败:', err)
    }
  },

  onMenuTap(e) {
    const { url } = e.currentTarget.dataset
    if (!url) {
      wx.showToast({ title: '功能开发中', icon: 'none' })
      return
    }
    wx.navigateTo({ url })
  },

  onUpgradeVerify() {
    wx.navigateTo({ url: '/pages/me/verify/verify' })
  }
})
