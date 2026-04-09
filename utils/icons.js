/**
 * SVG 图标系统 — Stripe 风格线条图标
 * 使用 base64 内联 data URI，兼容微信小程序
 * 所有图标 24x24 viewBox，1.5px stroke，圆角端点
 */

// 通用 SVG 包装器
function svg(content, color = 'currentColor') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`
}

// SVG → base64 data URI (兼容微信小程序无 Buffer 的情况)
function toDataUri(svgStr) {
  // 手动 base64 编码
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result = ''
  let i = 0
  const bytes = []
  for (let c = 0; c < svgStr.length; c++) {
    const code = svgStr.charCodeAt(c)
    if (code < 0x80) {
      bytes.push(code)
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f))
    } else {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f))
    }
  }
  while (i < bytes.length) {
    const a = bytes[i++] || 0
    const b = bytes[i++] || 0
    const c = bytes[i++] || 0
    const bitmap = (a << 16) | (b << 8) | c
    result += base64Chars[(bitmap >> 18) & 63]
    result += base64Chars[(bitmap >> 12) & 63]
    result += base64Chars[(bitmap >> 6) & 63]
    result += base64Chars[bitmap & 63]
  }
  // Fix padding
  const padMap = [0, 2, 1]
  const pad = padMap[bytes.length % 3]
  if (pad) {
    result = result.slice(0, result.length - pad) + '='.repeat(pad)
  }
  return 'data:image/svg+xml;base64,' + result
}

// ===== 图标定义 =====

// 投票 🗳️ → 投票箱
const vote = svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2 4-4"/><path d="M8 4v-1M16 4v-1"/>')

// 扳手 🔧 → 工具
const wrench = svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>')

// 钱 💰 → 钱币
const money = svg('<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3.5 3.5 0 0 0-5 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><path d="M12 6v2M12 16v2"/>')

// 图表 📊 → 柱状图
const chart = svg('<path d="M18 20V10M12 20V4M6 20v-6"/>')

// 剪贴板 📋 → 清单
const clipboard = svg('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>')

// 用户 👤 → 用户圆
const user = svg('<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>')

// 位置 📍 → 定位
const location = svg('<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>')

// 时钟 ⏰ → 时钟
const clock = svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>')

// 人数 👤人数 → 用户组
const users = svg('<circle cx="9" cy="7" r="3"/><path d="M15 7a3 3 0 1 0 0-0.01"/><path d="M2 21v-1a6 6 0 0 1 12 0v1"/><path d="M17 20a5 5 0 0 1 5-5"/>')

// 面积 📐 → 尺子
const ruler = svg('<path d="M21 3H3v18h18V3z"/><path d="M3 9h6M3 15h4M9 3v6M15 3v4"/>')

// 锁 🔐 → 锁
const lock = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5"/>')

// 房子 🏠 → 房屋
const home = svg('<path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10"/>')

// 文件 📜 → 文件
const file = svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>')

// 齿轮 ⚙️ → 设置
const settings = svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>')

// 警告 ⚠️ → 三角警告
const warning = svg('<path d="M12 2L1 21h22L12 2z"/><path d="M12 9v4M12 17h.01"/>', '#ea2261')

// 完成 ✅ → 勾选圆
const check = svg('<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>')

// 刷新 🔄 → 刷新
const refresh = svg('<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>')

// 暂停 ⏸️ → 暂停
const pause = svg('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>')

// 播放 ▶️ → 播放
const play = svg('<polygon points="5,3 19,12 5,21"/>')

// 提交 📝 → 编辑
const edit = svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>')

// 握手 🤝 → 握手
const handshake = svg('<path d="M20 11l-4-4-4 2-4-2-4 4"/><path d="M4 11l3 3 4-1 3 1 3-3"/><path d="M12 20l4-4M8 16l4 4"/>')

// 庆祝 🎉 → 纪念
const celebrate = svg('<path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="M9 7l4 4M9 11l4-4"/><path d="M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>')

// 工人 👷 → 安全帽
const worker = svg('<path d="M12 2a7 7 0 0 0-7 7v1h14V9a7 7 0 0 0-7-7z"/><path d="M4 10h16"/><path d="M6 17h12"/><path d="M5 14h14v8H5z"/>')

// 星星 ⭐ → 星星
const star = svg('<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>')

// 电话 📞 → 电话
const phone = svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>')

// 相机 📷 → 相机
const camera = svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>')

// 麦克风 🎤 → 麦克风
const mic = svg('<rect x="9" y="1" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>')

// 证书 🪪 → ID卡
const idCard = svg('<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h2"/>')

// 书 📖 → 书本
const book = svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8M8 11h5"/>')

// 未解锁 🔒 → 解锁
const unlock = svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0"/><circle cx="12" cy="16" r="1.5"/>')

// 加号 → 添加
const plus = svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')

// 关闭 → X
const close = svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')

// 右箭头
const arrowRight = svg('<path d="M9 18l6-6-6-6"/>')

// 铃铛 🔔 → 通知
const bell = svg('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>')

// 导出所有图标的 base64 data URI，按颜色分组
const ICONS = {
  // 紫色系 — 主要交互图标
  vote: toDataUri(svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 12l2 2 4-4"/><path d="M8 4v-1M16 4v-1"/>', '#533afd')),
  wrench: toDataUri(svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>', '#533afd')),
  money: toDataUri(svg('<circle cx="12" cy="12" r="9"/><path d="M14.5 9a3.5 3.5 0 0 0-5 0"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/><path d="M12 6v2M12 16v2"/>', '#533afd')),
  chart: toDataUri(svg('<path d="M18 20V10M12 20V4M6 20v-6"/>', '#533afd')),
  clipboard: toDataUri(svg('<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/>', '#533afd')),
  user: toDataUri(svg('<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>', '#533afd')),
  location: toDataUri(svg('<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>', '#533afd')),
  clock: toDataUri(svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>', '#533afd')),
  users: toDataUri(svg('<circle cx="9" cy="7" r="3"/><path d="M15 7a3 3 0 1 0 0-0.01"/><path d="M2 21v-1a6 6 0 0 1 12 0v1"/><path d="M17 20a5 5 0 0 1 5-5"/>', '#533afd')),
  ruler: toDataUri(svg('<path d="M21 3H3v18h18V3z"/><path d="M3 9h6M3 15h4M9 3v6M15 3v4"/>', '#533afd')),
  lock: toDataUri(svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5"/>', '#533afd')),
  home: toDataUri(svg('<path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10"/>', '#533afd')),
  file: toDataUri(svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>', '#533afd')),
  settings: toDataUri(svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', '#533afd')),
  check: toDataUri(svg('<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>', '#15be53')),
  refresh: toDataUri(svg('<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>', '#533afd')),
  pause: toDataUri(svg('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>', '#533afd')),
  play: toDataUri(svg('<polygon points="5,3 19,12 5,21"/>', '#533afd')),
  edit: toDataUri(svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>', '#533afd')),
  handshake: toDataUri(svg('<path d="M20 11l-4-4-4 2-4-2-4 4"/><path d="M4 11l3 3 4-1 3 1 3-3"/><path d="M12 20l4-4M8 16l4 4"/>', '#533afd')),
  celebrate: toDataUri(svg('<path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01"/><path d="M22 2l-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>', '#533afd')),
  worker: toDataUri(svg('<path d="M12 2a7 7 0 0 0-7 7v1h14V9a7 7 0 0 0-7-7z"/><path d="M4 10h16M5 14h14v8H5z"/>', '#533afd')),
  star: toDataUri(svg('<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>', '#533afd')),
  starEmpty: toDataUri(svg('<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>', '#d0d5dd')),
  phone: toDataUri(svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>', '#533afd')),
  camera: toDataUri(svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>', '#533afd')),
  mic: toDataUri(svg('<rect x="9" y="1" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>', '#533afd')),
  idCard: toDataUri(svg('<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h2"/>', '#533afd')),
  book: toDataUri(svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8M8 11h5"/>', '#533afd')),
  unlock: toDataUri(svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0"/><circle cx="12" cy="16" r="1.5"/>', '#d0d5dd')),
  plus: toDataUri(svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', '#533afd')),
  close: toDataUri(svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', '#64748d')),
  arrowRight: toDataUri(svg('<path d="M9 18l6-6-6-6"/>', '#8896ab')),
  bell: toDataUri(svg('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>', '#533afd')),
  // 链接 🔗 → 链
  link: toDataUri(svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>', '#533afd')),

  // 天平 ⚖️ → 天平
  balance: toDataUri(svg('<path d="M12 3v18M3 7l3-4 3 4M15 7l3-4 3 4M3 7v6a3 3 0 0 0 6 0V7M15 7v6a3 3 0 0 0 6 0V7"/>', '#533afd')),

  // 计时 ⏱️ → 秒表
  stopwatch: toDataUri(svg('<circle cx="12" cy="14" r="7"/><path d="M12 9v5l2 2M10 2h4"/><path d="M12 2v3"/>', '#533afd')),

  trophy: toDataUri(svg('<path d="M6 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3"/><path d="M18 9h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3"/><path d="M6 4h12v6a6 6 0 0 1-12 0V4z"/><path d="M12 16v3M8 22h8M10 22v-3M14 22v-3"/>', '#533afd')),

  // 警告色 — 红色
  warningRed: toDataUri(svg('<path d="M12 2L1 21h22L12 2z"/><path d="M12 9v4M12 17h.01"/>', '#ea2261')),

  // 橙色 — 警告
  warningOrange: toDataUri(svg('<path d="M12 2L1 21h22L12 2z"/><path d="M12 9v4M12 17h.01"/>', '#9b6829')),

  // 绿色 — 成功
  checkGreen: toDataUri(svg('<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>', '#15be53')),
  
  // 手机号 — 蓝紫色
  phoneMobile: toDataUri(svg('<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>', '#533afd')),
  
  // 循环箭头 — 当前
  current: toDataUri(svg('<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>', '#9b6829')),
}

module.exports = { ICONS }
