// pages/vote/detail/detail.js
const { getVoteDetail, castVote } = require('../../../utils/api')
const { voteStatusText, verifyLevelText, verifyLevelColor } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    icons: ICONS,
    vote: null,
    user: null,
    userVerified: false,
    selectedOption: '',
    showVerifyModal: false,
    showResultModal: false,
    hasVoted: false,
    blockchainHash: '',
    verifyLevels: [
      { level: 1, label: 'L1 手机号验证', desc: '基础身份验证' },
      { level: 2, label: 'L2 房产信息匹配', desc: '房产证信息与系统匹配' },
      { level: 3, label: 'L3 姓名+身份证+房产证', desc: '双过半事项所需核验' },
      { level: 4, label: 'L4 人脸核身', desc: '双¾事项所需核验' }
    ],
    loading: true
  },

  async onLoad(options) {
    const voteId = options.vote_id || options.id || ''
    try {
      const res = await getVoteDetail(voteId)
      const vote = res.data || {}
      const app = getApp()
      const user = app.globalData.userInfo || {}
      const requireLevel = vote.requireLevel || vote.require_level || 3
      const userVerified = (user.verifyLevel || user.verify_level || 0) >= requireLevel

      this.setData({
        vote,
        user,
        userVerified,
        statusText: voteStatusText(vote.status),
        verifyText: verifyLevelText(requireLevel),
        percentCount: (vote.totalCount || vote.total_count || 0) > 0
          ? ((vote.participatedCount || vote.participated_count || 0) / (vote.totalCount || vote.total_count) * 100).toFixed(1) : '0.0',
        percentArea: (vote.totalArea || vote.total_area || 0) > 0
          ? ((vote.participatedArea || vote.participated_area || 0) / (vote.totalArea || vote.total_area) * 100).toFixed(1) : '0.0',
        loading: false
      })
    } catch (err) {
      console.error('加载投票详情失败:', err)
      this.setData({ loading: false })
    }
  },

  onSelectOption(e) {
    if (this.data.vote.status !== 'active') return
    this.setData({ selectedOption: e.currentTarget.dataset.option })
  },

  async onSubmitVote() {
    if (!this.data.selectedOption) {
      wx.showToast({ title: '请选择投票选项', icon: 'none' })
      return
    }
    if (!this.data.userVerified) {
      this.setData({ showVerifyModal: true })
      return
    }
    // 调用后端投票接口
    wx.showLoading({ title: '提交中...' })
    try {
      const res = await castVote(this.data.vote.voteId || this.data.vote.vote_id, {
        option: this.data.selectedOption
      })
      wx.hideLoading()
      if (res.code === 200) {
        const hash = res.data?.blockchainHash || res.data?.txId || ''
        this.setData({
          hasVoted: true,
          blockchainHash: hash,
          showResultModal: true
        })
        wx.showToast({ title: '投票成功！', icon: 'success' })
      } else {
        wx.showToast({ title: res.message || '投票失败', icon: 'none' })
      }
    } catch (err) {
      wx.hideLoading()
      console.error('投票提交失败:', err)
      wx.showToast({ title: '提交失败', icon: 'none' })
    }
  },

  onUpgradeVerify() {
    this.setData({ showVerifyModal: false })
    wx.navigateTo({ url: '/pages/me/verify/verify' })
  },

  onCloseVerifyModal() {
    this.setData({ showVerifyModal: false })
  },

  onCloseResultModal() {
    this.setData({ showResultModal: false })
  },

  onShareVote() {
    wx.showShareMenu({ withShareTicket: true })
  },

  onViewBlockchain() {
    wx.showToast({ title: '区块链存证验证中...', icon: 'none' })
  }
})
