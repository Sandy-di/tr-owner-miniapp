// pages/vote/list/list.js
const { getVoteList } = require('../../../utils/api')
const { voteStatusText, verifyLevelText } = require('../../../utils/util')

Page({
  data: {
    votes: [],
    currentTab: 'all', // all / active / closed
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'active', label: '进行中' },
      { key: 'closed', label: '已结束' }
    ],
    loading: true
  },

  onLoad() {
    this.loadVotes()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  async loadVotes() {
    this.setData({ loading: true })
    try {
      const res = await getVoteList()
      const votes = (res.data?.records || []).map(v => ({
        ...v,
        statusText: voteStatusText(v.status),
        verifyText: 'L' + (v.requireLevel || v.require_level || 3),
        percentCount: v.totalCount > 0 ? (v.participatedCount / v.totalCount * 100).toFixed(1) : '0.0',
        percentArea: v.totalArea > 0 ? (v.participatedArea / v.totalArea * 100).toFixed(1) : '0.0'
      }))
      this.setData({ votes, loading: false })
    } catch (err) {
      console.error('加载投票列表失败:', err)
      this.setData({ loading: false })
    }
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
    this.loadVotes().then(() => wx.stopPullDownRefresh())
  }
})
