// pages/vote/detail/detail.js
const { mockVotes, mockUser } = require('../../../utils/mock')
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
    ]
  },

  onLoad(options) {
    const vote_id = options.vote_id || 'V001'
    const vote = mockVotes.find(v => v.vote_id === vote_id) || mockVotes[0]
    const user = mockUser
    const userVerified = user.verify_level >= vote.require_level

    this.setData({
      vote,
      user,
      userVerified,
      statusText: voteStatusText(vote.status),
      verifyText: verifyLevelText(vote.require_level),
      percentCount: (vote.participated_count / vote.total_count * 100).toFixed(1),
      percentArea: (vote.participated_area / vote.total_area * 100).toFixed(1)
    })
  },

  onSelectOption(e) {
    if (this.data.vote.status !== 'active') return
    this.setData({ selectedOption: e.currentTarget.dataset.option })
  },

  onSubmitVote() {
    if (!this.data.selectedOption) {
      wx.showToast({ title: '请选择投票选项', icon: 'none' })
      return
    }
    if (!this.data.userVerified) {
      this.setData({ showVerifyModal: true })
      return
    }
    // 模拟投票提交
    wx.showLoading({ title: '提交中...' })
    setTimeout(() => {
      wx.hideLoading()
      // 模拟区块链存证哈希
      const hash = '0x' + Math.random().toString(16).substr(2, 16)
      this.setData({
        hasVoted: true,
        blockchainHash: hash,
        showResultModal: true
      })
      wx.showToast({ title: '投票成功！', icon: 'success' })
    }, 1500)
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
