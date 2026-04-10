// app.js
const { wxLogin } = require('./utils/api')

App({
  onLaunch() {
    // 检查本地 token
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.token = token
      this.loadUserInfo()
    } else {
      this.doLogin()
    }
    // 检查更新
    this.checkUpdate()
  },

  /** 微信登录 → 后端换 token */
  doLogin() {
    wx.login({
      success: res => {
        if (res.code) {
          wxLogin(res.code).then(data => {
            if (data.code === 200) {
              const { token, user } = data.data
              wx.setStorageSync('token', token)
              this.globalData.token = token
              this.globalData.userInfo = user
              this.globalData.openid = user.openid || ''
              this.globalData.role = user.role || 'owner'
              this.globalData.verifyLevel = user.verifyLevel || 0
              this.globalData.communityName = user.communityName || ''
            }
          }).catch(err => {
            console.error('登录失败:', err)
          })
        }
      }
    })
  },

  /** 加载用户信息（已有 token 时） */
  loadUserInfo() {
    const { getCurrentUser } = require('./utils/api')
    getCurrentUser().then(data => {
      if (data.code === 200) {
        const user = data.data
        this.globalData.userInfo = user
        this.globalData.openid = user.openid || ''
        this.globalData.role = user.role || 'owner'
        this.globalData.verifyLevel = user.verifyLevel || 0
        this.globalData.communityName = user.communityName || ''
      }
    }).catch(err => {
      console.error('加载用户信息失败:', err)
      // token 过期，重新登录
      this.doLogin()
    })
  },

  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },

  globalData: {
    userInfo: null,
    openid: '',
    role: 'owner', // owner / property / committee
    verifyLevel: 0, // L0-L4
    communityName: '业鉴',
    baseUrl: 'https://api.yejian.com', // 后端地址
    token: ''
  }
})
