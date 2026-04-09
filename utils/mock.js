// utils/mock.js - 模拟数据

const mockVotes = [
  {
    vote_id: 'V001',
    title: '关于更换物业服务公司的表决',
    type: 'double_three_quarter', // 双四分之三
    threshold: 0.75,
    status: 'active',
    require_level: 4,
    start_time: '2026-03-20T09:00:00',
    end_time: '2026-04-20T18:00:00',
    description: '根据《民法典》第278条，经业委会提议，就更换现有物业服务公司进行表决。需双四分之三（人数+面积）通过。',
    options: ['同意更换', '不同意更换', '弃权'],
    total_area: 125000,
    participated_area: 68000,
    participated_count: 320,
    total_count: 500,
    results: { '同意更换': { count: 240, area: 52000 }, '不同意更换': { count: 60, area: 13000 }, '弃权': { count: 20, area: 3000 } },
    creator: '业委会主任 张某'
  },
  {
    vote_id: 'V002',
    title: '小区公共区域改造方案投票',
    type: 'double_half', // 双过半
    threshold: 0.5,
    status: 'active',
    require_level: 3,
    start_time: '2026-04-01T08:00:00',
    end_time: '2026-04-15T20:00:00',
    description: '对小区中心花园改造方案进行投票，方案A为建设儿童游乐场，方案B为建设健身休闲区。',
    options: ['方案A-儿童游乐场', '方案B-健身休闲区', '都不支持'],
    total_area: 125000,
    participated_area: 45000,
    participated_count: 210,
    total_count: 500,
    results: { '方案A-儿童游乐场': { count: 130, area: 28000 }, '方案B-健身休闲区': { count: 60, area: 13000 }, '都不支持': { count: 20, area: 4000 } },
    creator: '业委会委员 李某'
  },
  {
    vote_id: 'V003',
    title: '2025年度物业费调整方案',
    type: 'double_half',
    threshold: 0.5,
    status: 'closed',
    require_level: 3,
    start_time: '2026-01-10T08:00:00',
    end_time: '2026-02-10T18:00:00',
    description: '因物价上涨，拟调整物业费标准，由2.5元/㎡调整至2.8元/㎡。',
    options: ['同意调整', '不同意调整', '弃权'],
    total_area: 125000,
    participated_area: 78000,
    participated_count: 380,
    total_count: 500,
    results: { '同意调整': { count: 250, area: 52000 }, '不同意调整': { count: 100, area: 22000 }, '弃权': { count: 30, area: 4000 } },
    creator: '业委会主任 张某'
  },
  {
    vote_id: 'V004',
    title: '电梯大修基金使用表决',
    type: 'double_three_quarter',
    threshold: 0.75,
    status: 'published',
    require_level: 4,
    start_time: '2025-11-01T08:00:00',
    end_time: '2025-12-01T18:00:00',
    description: '3号楼电梯已使用15年，需大修更换，预计费用48万元，使用维修基金。',
    options: ['同意使用', '不同意使用', '弃权'],
    total_area: 125000,
    participated_area: 95000,
    participated_count: 420,
    total_count: 500,
    results: { '同意使用': { count: 390, area: 82000 }, '不同意使用': { count: 20, area: 10000 }, '弃权': { count: 10, area: 3000 } },
    creator: '业委会主任 张某'
  }
]

const mockWorkOrders = [
  {
    order_id: 'W001',
    title: '3号楼2单元电梯异响',
    category: '电梯故障',
    status: 'processing',
    description: '3号楼2单元电梯运行时有异常响声，尤其上行时明显',
    images: [],
    voice: '',
    sla_start: '2026-04-08T10:30:00',
    accept_time: '2026-04-08T10:45:00',
    staff_name: '王师傅',
    staff_phone: '138****5678',
    owner_name: '赵先生',
    owner_phone: '139****1234',
    building: '3号楼2单元',
    appointment_time: '2026-04-08 14:00-16:00',
    rating: null,
    comment: null
  },
  {
    order_id: 'W002',
    title: '地下车库B区漏水',
    category: '管道故障',
    status: 'accepted',
    description: '地下车库B区靠近电梯口位置天花板漏水，地面有积水',
    images: [],
    voice: '',
    sla_start: '2026-04-09T08:15:00',
    accept_time: '2026-04-09T09:00:00',
    staff_name: '李师傅',
    staff_phone: '137****9876',
    owner_name: '钱女士',
    owner_phone: '136****5678',
    building: '地下车库B区',
    appointment_time: '2026-04-09 10:00-12:00',
    rating: null,
    comment: null
  },
  {
    order_id: 'W003',
    title: '5号楼门禁失灵',
    category: '安防设施',
    status: 'pending_check',
    description: '5号楼1单元门禁系统无法正常识别门禁卡，业主无法刷卡进入',
    images: [],
    voice: '',
    sla_start: '2026-04-07T16:00:00',
    accept_time: '2026-04-07T16:30:00',
    staff_name: '张师傅',
    staff_phone: '135****4321',
    owner_name: '孙先生',
    owner_phone: '134****8765',
    building: '5号楼1单元',
    appointment_time: '2026-04-08 09:00-11:00',
    rating: null,
    comment: null,
    complete_photos: []
  },
  {
    order_id: 'W004',
    title: '7号楼楼层灯不亮',
    category: '照明故障',
    status: 'completed',
    description: '7号楼3层走廊灯损坏不亮，影响业主夜间通行',
    images: [],
    voice: '',
    sla_start: '2026-04-05T19:00:00',
    accept_time: '2026-04-05T19:20:00',
    staff_name: '陈师傅',
    staff_phone: '133****7890',
    owner_name: '周女士',
    owner_phone: '132****3456',
    building: '7号楼3层',
    appointment_time: '2026-04-06 10:00-12:00',
    rating: 5,
    comment: '维修很及时，态度好！',
    complete_photos: []
  }
]

const mockPayments = [
  {
    payment_id: 'P001',
    type: 'property_fee',
    title: '2026年4月物业费',
    amount: 375.00,
    area: 125,
    unit_price: 2.5,
    period: '2026-04',
    status: 'unpaid',
    due_date: '2026-04-30',
    paid_date: null,
    transaction_id: null
  },
  {
    payment_id: 'P002',
    type: 'property_fee',
    title: '2026年3月物业费',
    amount: 375.00,
    area: 125,
    unit_price: 2.5,
    period: '2026-03',
    status: 'paid',
    due_date: '2026-03-31',
    paid_date: '2026-03-25',
    transaction_id: 'TX202603250001'
  },
  {
    payment_id: 'P003',
    type: 'parking_fee',
    title: '2026年地下车位管理费',
    amount: 150.00,
    period: '2026-Q2',
    status: 'unpaid',
    due_date: '2026-04-15',
    paid_date: null,
    transaction_id: null
  },
  {
    payment_id: 'P004',
    type: 'water_fee',
    title: '2026年3月水费',
    amount: 68.50,
    period: '2026-03',
    status: 'paid',
    due_date: '2026-03-31',
    paid_date: '2026-03-28',
    transaction_id: 'TX202603280001'
  }
]

const mockFinanceRecords = [
  {
    finance_id: 'F001',
    title: '公共停车收益 - 2026年3月',
    category: '公共收益',
    amount: 28500.00,
    type: 'income',
    date: '2026-03-31',
    description: '地下车库临时停车收入',
    vouchers: ['invoice_f001_1.jpg', 'invoice_f001_2.jpg'],
    approved_by: ['张某', '李某', '王某'],
    status: 'published'
  },
  {
    finance_id: 'F002',
    title: '电梯维保服务费 - 2026年Q1',
    category: '维修支出',
    amount: 36000.00,
    type: 'expense',
    date: '2026-03-25',
    description: '1-5号楼电梯季度维保费用，由XX电梯维保公司提供',
    vouchers: ['contract_f002.pdf', 'invoice_f002.jpg'],
    approved_by: ['张某', '李某'],
    status: 'published'
  },
  {
    finance_id: 'F003',
    title: '小区绿化养护费 - 2026年3月',
    category: '绿化支出',
    amount: 12800.00,
    type: 'expense',
    date: '2026-03-20',
    description: '小区公共区域绿化养护费用',
    vouchers: ['invoice_f003.jpg'],
    approved_by: ['张某'],
    status: 'pending_approval'
  },
  {
    finance_id: 'F004',
    title: '广告位出租收益 - 2026年Q1',
    category: '公共收益',
    amount: 42000.00,
    type: 'income',
    date: '2026-03-15',
    description: '电梯内广告位及小区门口广告牌出租收入',
    vouchers: ['contract_f004.pdf', 'invoice_f004.jpg'],
    approved_by: ['张某', '李某', '王某'],
    status: 'published'
  }
]

const mockUser = {
  openid: 'oXXXX_XXXXXXXXXXXX',
  name: '赵先生',
  phone: '139****1234',
  avatar: '',
  role: 'owner',
  verify_level: 3,
  community: 'TR智慧社区',
  building: '3号楼2单元1801',
  area: 125,
  property_cert: '已认证',
  join_date: '2025-06-15'
}

module.exports = {
  mockVotes,
  mockWorkOrders,
  mockPayments,
  mockFinanceRecords,
  mockUser
}
