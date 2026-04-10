// pages/index/index.js
const { getVoteList, getWorkOrderList, getPaymentList, getCurrentUser } = require('../../utils/api')
const { verifyLevelText, voteStatusText, orderStatusText, paymentStatusText, formatMoney, timeAgo } = require('../../utils/util')
const { ICONS } = require('../../utils/icons')

Page({
  data: {
    user: {},
    activeVotes: 0,
    pendingOrders: 0,
    unpaidPayments: 0,
    currentVote: null,
    recentOrders: [],
    announcements: [
      { id: 1, title: '关于更换物业服务公司的表决正在进行中', time: '2026-03-20', type: 'vote' },
      { id: 2, title: '2026年4月物业费已出账，请及时缴纳', time: '2026-04-01', type: 'payment' },
      { id: 3, title: '小区公共区域改造方案投票开始', time: '2026-04-01', type: 'vote' }
    ],
    quickActions: [
      { iconKey: 'vote', title: '合规投票', url: '/pages/vote/list/list', bgColor: 'rgba(83,58,253,0.06)' },
      { iconKey: 'wrench', title: '智能报修', url: '/pages/repair/create/create', bgColor: 'rgba(155,104,41,0.06)' },
      { iconKey: 'money', title: '在线缴费', url: '/pages/payment/list/list', bgColor: 'rgba(234,34,97,0.06)' },
      { iconKey: 'chart', title: '财务公开', url: '/pages/finance/list/list', bgColor: 'rgba(21,190,83,0.06)' },
      { iconKey: 'clipboard', title: '工单跟踪', url: '/pages/repair/list/list', bgColor: 'rgba(83,58,253,0.04)' },
      { iconKey: 'lock', title: '身份核验', url: '/pages/me/verify/verify', bgColor: 'rgba(249,107,238,0.06)' }
    ],
    loading: true
  },

  onLoad() {
    this.setData({ icons: ICONS })
    this.initData()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  async initData() {
    this.setData({ loading: true })
    try {
      const app = getApp()
      const user = app.globalData.userInfo || {}

      // 并行请求
      const [voteRes, orderRes, paymentRes] = await Promise.all([
        getVoteList({ status: 'active' }).catch(() => ({ data: { records: [] } })),
        getWorkOrderList({ status: 'submitted,accepted,processing,pending_check' }).catch(() => ({ data: { records: [] } })),
        getPaymentList({ status: 'unpaid' }).catch(() => ({ data: { records: [] } }))
      ])

      const votes = voteRes.data?.records || []
      const orders = orderRes.data?.records || []
      const payments = paymentRes.data?.records || []

      const activeVotes = votes.length
      const pendingOrders = orders.length
      const unpaidPayments = payments.length
      const currentVote = votes.find(v => v.status === 'active') || null
      const recentOrders = orders.slice(0, 2)

      let percentCount = '0.0'
      let percentArea = '0.0'
      if (currentVote && currentVote.totalCount > 0) {
        percentCount = (currentVote.participatedCount / currentVote.totalCount * 100).toFixed(1)
      }
      if (currentVote && currentVote.totalArea > 0) {
        percentArea = (currentVote.participatedArea / currentVote.totalArea * 100).toFixed(1)
      }

      this.setData({
        user,
        activeVotes,
        pendingOrders,
        unpaidPayments,
        currentVote,
        recentOrders,
        verifyLevelText: verifyLevelText(user.verifyLevel || 0),
        percentCount,
        percentArea,
        loading: false
      })
    } catch (err) {
      console.error('首页数据加载失败:', err)
      this.setData({ loading: false })
    }
  },

  onQuickAction(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  onViewVote(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/vote/detail/detail?vote_id=${id}` })
  },

  onViewAnnouncement(e) {
    const { type, id } = e.currentTarget.dataset
    if (type === 'vote') {
      wx.navigateTo({ url: `/pages/vote/detail/detail?vote_id=${id}` })
    } else if (type === 'payment') {
      wx.navigateTo({ url: '/pages/payment/list/list' })
    }
  },

  onUpgradeVerify() {
    wx.navigateTo({ url: '/pages/me/verify/verify' })
  },

  onPullDownRefresh() {
    this.initData().then(() => wx.stopPullDownRefresh())
  }
})
