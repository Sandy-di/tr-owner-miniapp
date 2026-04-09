// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log('登录code:', res.code)
        // 发送 code 到后台换取 openid
      }
    })
    // 检查更新
    this.checkUpdate()
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
    communityName: 'TR智慧社区',
    baseUrl: 'https://api.example.com'
  }
})
