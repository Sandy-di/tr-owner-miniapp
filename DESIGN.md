# 业鉴 · Stripe Design Language

## 视觉主题

基于 Stripe 设计语言，融合金融级信任感与物业场景。品牌深靛蓝 (`#1c1e54`) 渐变头部营造专业氛围，Stripe 紫 (`#533afd`) 作为核心交互色贯穿全系统。蓝色调多层阴影创造有品牌感的深度。标题使用 Deep Navy (`#061b31`) 而非纯黑，字体权重偏轻（300-500），圆角保守（4-16rpx），整体克制而精致。

## 色彩

| 角色 | 色值 | 用途 |
|------|------|------|
| Stripe Purple | `#533afd` | 主交互色、CTA、链接、选中态 |
| Purple Hover | `#4434d4` | 按压态 |
| Purple Light | `#b9b9f9` | 边框、淡色强调 |
| Deep Navy | `#061b31` | 标题文字 |
| Label Slate | `#273951` | 表单标签 |
| Body Slate | `#64748d` | 正文、辅助文字 |
| Brand Dark | `#1c1e54` | 头部渐变起点 |
| Ruby | `#ea2261` | 危险态、装饰渐变 |
| Magenta | `#f96bee` | 装饰渐变 |
| Success | `#15be53` | 成功状态 |
| Warning | `#9b6829` | 警告状态 |
| Page BG | `#f6f9fc` | 页面背景 |
| Card BG | `#ffffff` | 卡片背景 |
| Border | `#e5edf5` | 边框 |

## 阴影系统

蓝色调多层阴影，创造品牌感深度：

```
--shadow-card: 0 6rpx 70rpx rgba(23, 23, 23, 0.06)
--shadow-card-hover: 0 30rpx 90rpx -30rpx rgba(50, 50, 93, 0.25), 0 36rpx 72rpx -36rpx rgba(0, 0, 0, 0.1)
--shadow-float: 0 60rpx 90rpx -60rpx rgba(50, 50, 93, 0.25), 0 36rpx 72rpx -36rpx rgba(0, 0, 0, 0.1)
--shadow-modal: 0 28rpx 42rpx -28rpx rgba(3, 3, 39, 0.25), 0 16rpx 34rpx -16rpx rgba(0, 0, 0, 0.1)
```

## 排版

- 标题权重：300-500（Stripe 轻量签名风）
- 正文字重：400
- 数字：`font-variant-numeric: tabular-nums`
- 等宽字体（哈希、代码）：`SF Mono`, `Menlo`, monospace
- 标题颜色：Deep Navy `#061b31`（永不使用纯黑）

## 圆角

保守克制，4-16rpx 范围：
- `radius-xs: 4rpx` — 按钮、标签
- `radius-sm: 8rpx` — 输入框、小卡片
- `radius-md: 12rpx` — 中等容器
- `radius-lg: 16rpx` — 大卡片
- `radius-xl: 24rpx` — 头部底弧

## 组件

### 按钮
- **Primary**: `#533afd` 背景，`#fff` 文字，`radius-sm`，hover `#4434d4`
- **Outline**: 透明背景，`#533afd` 文字，`1px solid #b9b9f9` 边框
- **Ghost**: 透明背景，`#b9b9f9` 文字

### 卡片
- 白色背景，`1px solid #f0f4f8` 边框，`radius-lg`，蓝色调阴影
- 选中态：`rgba(83, 58, 253, 0.03)` 背景 + `box-shadow: 0 0 0 3rpx rgba(83, 58, 253, 0.08)`

### 标签
- 极小圆角 `radius-xs`，带1px语义色边框
- Success: `rgba(21, 190, 83, 0.2)` 背景 + `#108c3d` 文字

### 表单
- 输入框 `radius-sm`，`#e5edf5` 边框
- 聚焦态：`#533afd` 边框 + `3rpx rgba(83, 58, 253, 0.1)` 外环

## 禁忌

- ❌ 不用纯黑 `#000` 做标题，始终用 Deep Navy `#061b31`
- ❌ 不用大圆角（24rpx+）做按钮和卡片
- ❌ 不用中性灰阴影，始终蓝色调 `rgba(50, 50, 93, ...)`
- ❌ 不用粗体（600+）做标题，Stripe 轻量是签名
- ❌ 不用暖色（橙黄）做交互色，紫色是主色
