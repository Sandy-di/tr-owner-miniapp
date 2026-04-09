// utils/util.js - 通用工具函数

/**
 * 格式化日期
 */
function formatDate(date, fmt = 'YYYY-MM-DD HH:mm') {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 格式化金额
 */
function formatMoney(amount, prefix = '¥') {
  const num = parseFloat(amount)
  if (isNaN(num)) return prefix + '0.00'
  return prefix + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 计算时间差（友好显示）
 */
function timeAgo(date) {
  const now = new Date().getTime()
  const diff = now - new Date(date).getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return '刚刚'
  if (diff < hour) return Math.floor(diff / minute) + '分钟前'
  if (diff < day) return Math.floor(diff / hour) + '小时前'
  if (diff < 30 * day) return Math.floor(diff / day) + '天前'
  return formatDate(date, 'YYYY-MM-DD')
}

/**
 * 核验等级文字
 */
function verifyLevelText(level) {
  const map = {
    0: '未核验',
    1: 'L1 手机号',
    2: 'L2 房产匹配',
    3: 'L3 实名认证',
    4: 'L4 人脸核身'
  }
  return map[level] || '未知'
}

/**
 * 核验等级颜色
 */
function verifyLevelColor(level) {
  const map = {
    0: '#999',
    1: '#FF9500',
    2: '#1A6DFF',
    3: '#07C160',
    4: '#1A6DFF'
  }
  return map[level] || '#999'
}

/**
 * 投票状态
 */
function voteStatusText(status) {
  const map = {
    'draft': '草稿',
    'active': '进行中',
    'closed': '已结束',
    'published': '已公示'
  }
  return map[status] || '未知'
}

/**
 * 工单状态
 */
function orderStatusText(status) {
  const map = {
    'submitted': '已提交',
    'accepted': '已接单',
    'processing': '处理中',
    'pending_check': '待验收',
    'completed': '已完结',
    'rework': '待复修',
    'cancelled': '已取消'
  }
  return map[status] || '未知'
}

/**
 * 工单状态颜色
 */
function orderStatusColor(status) {
  const map = {
    'submitted': '#FF9500',
    'accepted': '#1A6DFF',
    'processing': '#1A6DFF',
    'pending_check': '#FF9500',
    'completed': '#07C160',
    'rework': '#FF3B30',
    'cancelled': '#999'
  }
  return map[status] || '#999'
}

/**
 * 缴费状态
 */
function paymentStatusText(status) {
  const map = {
    'unpaid': '待缴费',
    'paid': '已缴费',
    'overdue': '已逾期'
  }
  return map[status] || '未知'
}

/**
 * 简易防抖
 */
function debounce(fn, delay = 500) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

/**
 * 请求封装
 */
function request(url, data = {}, method = 'GET') {
  const app = getApp()
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.baseUrl + url,
      data,
      method,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token') || ''
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          wx.showToast({ title: '请先登录', icon: 'none' })
          reject(res)
        } else {
          reject(res)
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}

/**
 * 订阅消息
 */
function requestSubscribeMessage(tmplIds) {
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 选择图片
 */
function chooseImage(count = 1) {
  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success(res) {
        resolve(res.tempFiles)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  formatDate,
  formatMoney,
  timeAgo,
  verifyLevelText,
  verifyLevelColor,
  voteStatusText,
  orderStatusText,
  orderStatusColor,
  paymentStatusText,
  debounce,
  request,
  requestSubscribeMessage,
  chooseImage
}
