// pages/vote/create/create.js
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    icons: ICONS,
    form: {
      title: '',
      type: 'double_half',
      require_level: 3,
      description: '',
      options: ['同意', '不同意', '弃权'],
      duration_days: 15
    },
    typeOptions: [
      { value: 'double_half', label: '双过半表决', desc: '参与人数及面积均过半（民法典278条一般事项）' },
      { value: 'double_three_quarter', label: '双¾表决', desc: '参与人数及面积均达3/4（民法典278条重大事项）' }
    ],
    levelOptions: [
      { value: 3, label: 'L3 姓名+身份证+房产证', desc: '双过半事项所需' },
      { value: 4, label: 'L4 人脸核身', desc: '双¾事项所需' }
    ],
    durationOptions: [
      { value: 7, label: '7天' },
      { value: 15, label: '15天' },
      { value: 30, label: '30天' }
    ]
  },

  onTitleInput(e) {
    this.setData({ 'form.title': e.detail.value })
  },

  onDescInput(e) {
    this.setData({ 'form.description': e.detail.value })
  },

  onTypeChange(e) {
    const type = e.currentTarget.dataset.value
    const require_level = type === 'double_three_quarter' ? 4 : 3
    this.setData({ 'form.type': type, 'form.require_level': require_level })
  },

  onLevelChange(e) {
    this.setData({ 'form.require_level': e.currentTarget.dataset.value })
  },

  onDurationChange(e) {
    this.setData({ 'form.duration_days': e.currentTarget.dataset.value })
  },

  onOptionInput(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ [`form.options[${index}]`]: e.detail.value })
  },

  onAddOption() {
    if (this.data.form.options.length >= 6) {
      wx.showToast({ title: '最多6个选项', icon: 'none' })
      return
    }
    const options = [...this.data.form.options, '']
    this.setData({ 'form.options': options })
  },

  onRemoveOption(e) {
    const index = e.currentTarget.dataset.index
    if (this.data.form.options.length <= 2) {
      wx.showToast({ title: '至少2个选项', icon: 'none' })
      return
    }
    const options = this.data.form.options.filter((_, i) => i !== index)
    this.setData({ 'form.options': options })
  },

  onSubmit() {
    const { form } = this.data
    if (!form.title.trim()) {
      wx.showToast({ title: '请输入投票标题', icon: 'none' })
      return
    }
    if (!form.description.trim()) {
      wx.showToast({ title: '请输入投票说明', icon: 'none' })
      return
    }
    if (form.options.some(o => !o.trim())) {
      wx.showToast({ title: '请填写所有选项', icon: 'none' })
      return
    }

    wx.showLoading({ title: '提交中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '发起成功', icon: 'success' })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1500)
  }
})
