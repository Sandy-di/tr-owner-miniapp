// pages/vote/list/list.js
const { mockVotes, mockUser } = require('../../../utils/mock')
const { voteStatusText, verifyLevelText } = require('../../../utils/util')

Page({
  data: {
    votes: [],
    currentTab: 'all', // all / active / closed
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'active', label: '进行中' },
      { key: 'closed', label: '已结束' }
    ]
  },

  onLoad() {
    this.loadVotes()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  loadVotes() {
    const votes = mockVotes.map(v => ({
      ...v,
      statusText: voteStatusText(v.status),
      verifyText: 'L' + v.require_level,
      percentCount: (v.participated_count / v.total_count * 100).toFixed(1),
      percentArea: (v.participated_area / v.total_area * 100).toFixed(1)
    }))
    this.setData({ votes })
  },

  onTabChange(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
  },

  filteredVotes() {
    const { votes, currentTab } = this.data
    if (currentTab === 'all') return votes
    if (currentTab === 'active') return votes.filter(v => v.status === 'active')
    return votes.filter(v => v.status !== 'active')
  },

  onVoteTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/vote/detail/detail?vote_id=${id}` })
  },

  onCreateVote() {
    wx.navigateTo({ url: '/pages/vote/create/create' })
  },

  onPullDownRefresh() {
    this.loadVotes()
    wx.stopPullDownRefresh()
  }
})
