// utils/api.js - 后端 API 接口统一封装

const { request } = require('./util')

// ==================== 认证 ====================

/** 微信登录 */
const wxLogin = (code) => request('/api/auth/login', { code }, 'POST')

/** 手机号验证（L1） */
const phoneVerify = (data) => request('/api/auth/phone-verify', data, 'POST')

/** 房产信息验证（L2） */
const propertyVerify = (data) => request('/api/auth/property-verify', data, 'POST')

/** 获取当前用户信息 */
const getCurrentUser = () => request('/api/auth/me')

// ==================== 投票 ====================

/** 投票列表 */
const getVoteList = (params = {}) => request('/api/votes', params)

/** 投票详情 */
const getVoteDetail = (voteId) => request(`/api/votes/${voteId}`)

/** 发起投票 */
const createVote = (data) => request('/api/votes', data, 'POST')

/** 投票表决 */
const castVote = (voteId, data) => request(`/api/votes/${voteId}/cast`, data, 'POST')

/** 关闭投票 */
const closeVote = (voteId) => request(`/api/votes/${voteId}/close`, {}, 'PUT')

// ==================== 报修工单 ====================

/** 工单列表 */
const getWorkOrderList = (params = {}) => request('/api/repairs', params)

/** 工单详情 */
const getWorkOrderDetail = (orderId) => request(`/api/repairs/${orderId}`)

/** 创建工单 */
const createWorkOrder = (data) => request('/api/repairs', data, 'POST')

/** 接单 */
const acceptWorkOrder = (orderId) => request(`/api/repairs/${orderId}/accept`, {}, 'PUT')

/** 开始处理 */
const processWorkOrder = (orderId) => request(`/api/repairs/${orderId}/process`, {}, 'PUT')

/** 提交验收 */
const completeWorkOrder = (orderId, data) => request(`/api/repairs/${orderId}/complete`, data, 'PUT')

/** 评价工单 */
const rateWorkOrder = (orderId, data) => request(`/api/repairs/${orderId}/rate`, data, 'POST')

// ==================== 财务公开 ====================

/** 财务记录列表 */
const getFinanceList = (params = {}) => request('/api/finance', params)

/** 财务记录详情 */
const getFinanceDetail = (financeId) => request(`/api/finance/${financeId}`)

/** 发布财务记录 */
const publishFinance = (data) => request('/api/finance', data, 'POST')

/** 审批联署 */
const approveFinance = (financeId) => request(`/api/finance/${financeId}/approve`, {}, 'POST')

// ==================== 缴费 ====================

/** 缴费列表 */
const getPaymentList = (params = {}) => request('/api/payments', params)

/** 缴费详情 */
const getPaymentDetail = (paymentId) => request(`/api/payments/${paymentId}`)

/** 发起支付 */
const createPayment = (paymentId) => request(`/api/payments/${paymentId}/pay`, {}, 'POST')

// ==================== 文件上传 ====================

/** 上传图片 */
const uploadImage = (filePath) => {
  const app = getApp()
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: app.globalData.baseUrl + '/api/files/upload/image',
      filePath,
      name: 'file',
      header: {
        'Authorization': wx.getStorageSync('token') || ''
      },
      success(res) {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          resolve(data)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  wxLogin,
  phoneVerify,
  propertyVerify,
  getCurrentUser,
  getVoteList,
  getVoteDetail,
  createVote,
  castVote,
  closeVote,
  getWorkOrderList,
  getWorkOrderDetail,
  createWorkOrder,
  acceptWorkOrder,
  processWorkOrder,
  completeWorkOrder,
  rateWorkOrder,
  getFinanceList,
  getFinanceDetail,
  publishFinance,
  approveFinance,
  getPaymentList,
  getPaymentDetail,
  createPayment,
  uploadImage
}
