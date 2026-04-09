// pages/repair/create/create.js
const { chooseImage } = require('../../../utils/util')
const { ICONS } = require('../../../utils/icons')

Page({
  data: {
    icons: ICONS,
    form: {
      title: '',
      category: '',
      description: '',
      images: [],
      voice: '',
      appointment_date: '',
      appointment_time: ''
    },
    categories: ['电梯故障', '管道故障', '照明故障', '安防设施', '消防设施', '绿化问题', '噪音投诉', '其他'],
    categoryIndex: -1,
    imageList: [],
    hasVoice: false,
    dateOptions: [],
    timeSlots: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'],
    selectedTimeSlot: ''
  },

  onLoad() {
    // 生成未来7天日期选项
    const dateOptions = []
    for (let i = 1; i <= 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      dateOptions.push({
        value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        label: `${d.getMonth() + 1}月${d.getDate()}日 ${weekDays[d.getDay()]}`
      })
    }
    this.setData({ dateOptions })
  },

  onTitleInput(e) {
    this.setData({ 'form.title': e.detail.value })
  },

  onCategoryChange(e) {
    const index = e.detail.value
    this.setData({
      categoryIndex: index,
      'form.category': this.data.categories[index]
    })
  },

  onDescInput(e) {
    this.setData({ 'form.description': e.detail.value })
  },

  async onChooseImage() {
    try {
      const files = await chooseImage(3 - this.data.imageList.length)
      const newImages = files.map(f => f.tempFilePath)
      this.setData({
        imageList: [...this.data.imageList, ...newImages]
      })
    } catch (e) {
      // 用户取消
    }
  },

  onRemoveImage(e) {
    const index = e.currentTarget.dataset.index
    const imageList = this.data.imageList.filter((_, i) => i !== index)
    this.setData({ imageList })
  },

  onRecordVoice() {
    wx.showToast({ title: '录音功能需要真机调试', icon: 'none' })
  },

  onDateSelect(e) {
    this.setData({ 'form.appointment_date': e.currentTarget.dataset.value })
  },

  onTimeSelect(e) {
    this.setData({ 
      selectedTimeSlot: e.currentTarget.dataset.value,
      'form.appointment_time': e.currentTarget.dataset.value
    })
  },

  onSubmit() {
    const { form, imageList } = this.data
    if (!form.title.trim()) {
      wx.showToast({ title: '请输入报修标题', icon: 'none' })
      return
    }
    if (!form.category) {
      wx.showToast({ title: '请选择故障类别', icon: 'none' })
      return
    }
    if (!form.description.trim()) {
      wx.showToast({ title: '请描述故障情况', icon: 'none' })
      return
    }

    wx.showLoading({ title: '提交中...' })
    setTimeout(() => {
      wx.hideLoading()
      // 请求订阅消息权限
      wx.requestSubscribeMessage({
        tmplIds: ['template_id_repair_notify'],
        success() {
          console.log('订阅消息授权成功')
        },
        complete() {
          wx.showToast({ title: '报修提交成功', icon: 'success' })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      })
    }, 1000)
  }
})
