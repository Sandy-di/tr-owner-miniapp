// pages/me/verify/verify.js
const { mockUser } = require('../../../utils/mock')
const { verifyLevelText } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    currentLevel: 0,
    levels: [
      { 
        level: 1, 
        label: 'L1 手机号验证', 
        desc: '基础身份验证，绑定手机号即可完成',
        status: 'completed',
        iconKey: 'phoneMobile'
      },
      { 
        level: 2, 
        label: 'L2 房产信息匹配', 
        desc: '房产证信息与系统记录匹配验证',
        status: 'completed',
        iconKey: 'home'
      },
      { 
        level: 3, 
        label: 'L3 姓名+身份证+房产证', 
        desc: '双过半事项所需核验，接入腾讯云实名认证',
        status: 'current',
        iconKey: 'idCard'
      },
      { 
        level: 4, 
        label: 'L4 人脸核身', 
        desc: '双¾事项所需核验，接入腾讯云慧眼FaceID',
        status: 'locked',
        iconKey: 'user'
      }
    ],
    // L3 表单
    l3Form: {
      realName: '',
      idCard: '',
      propertyCertNo: ''
    },
    // L4 状态
    l4Started: false
  },

  onLoad() {
    this.setData({ currentLevel: mockUser.verify_level, icons: ICONS })
    this.updateLevelStatus()
  },

  updateLevelStatus() {
    const levels = this.data.levels.map(l => {
      if (l.level <= this.data.currentLevel) {
        l.status = 'completed'
      } else if (l.level === this.data.currentLevel + 1) {
        l.status = 'current'
      } else {
        l.status = 'locked'
      }
      return l
    })
    this.setData({ levels })
  },

  onL3NameInput(e) {
    this.setData({ 'l3Form.realName': e.detail.value })
  },

  onL3IdCardInput(e) {
    this.setData({ 'l3Form.idCard': e.detail.value })
  },

  onL3CertInput(e) {
    this.setData({ 'l3Form.propertyCertNo': e.detail.value })
  },

  onSubmitL3() {
    const { realName, idCard, propertyCertNo } = this.data.l3Form
    if (!realName.trim()) {
      wx.showToast({ title: '请输入真实姓名', icon: 'none' })
      return
    }
    if (!idCard.trim() || idCard.length < 15) {
      wx.showToast({ title: '请输入有效身份证号', icon: 'none' })
      return
    }
    if (!propertyCertNo.trim()) {
      wx.showToast({ title: '请输入房产证编号', icon: 'none' })
      return
    }

    wx.showLoading({ title: '核验中...' })
    // 模拟接入腾讯云实名认证
    setTimeout(() => {
      wx.hideLoading()
      this.setData({ currentLevel: 3 })
      this.updateLevelStatus()
      wx.showToast({ title: 'L3核验通过！', icon: 'success' })
    }, 2000)
  },

  onStartL4() {
    if (this.data.currentLevel < 3) {
      wx.showToast({ title: '请先完成L3核验', icon: 'none' })
      return
    }
    wx.showModal({
      title: '人脸核身',
      content: '即将启动腾讯云慧眼FaceID进行人脸识别验证，请确保光线充足、面部无遮挡。',
      success: (res) => {
        if (res.confirm) {
          this.setData({ l4Started: true })
          wx.showLoading({ title: '人脸识别中...' })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({ currentLevel: 4 })
            this.updateLevelStatus()
            wx.showToast({ title: 'L4人脸核身通过！', icon: 'success' })
          }, 3000)
        }
      }
    })
  }
})
