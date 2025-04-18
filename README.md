# WHOIS 查询服务

简单高效的域名WHOIS信息查询API服务，支持缓存和请求限制。

## ✨ 特性

- 🔍 域名WHOIS信息实时查询
- 💾 自动缓存查询结果（1小时）
- 🚦 请求速率限制保护（每IP 15分钟/100次）
- 📊 智能信息提取（创建日期、过期日期、注册商）
- ☁️ 支持Vercel一键部署

## 🚀 快速开始

### 环境要求

- Node.js >= 14.x
- npm 或 yarn

### 安装

```bash
npm install
# 或
yarn install
```

### 启动

```bash
node whois-proxy.js
```

## 📖 API文档

### 基础信息
```
GET /
```

### WHOIS查询
```
GET /whois/:domain
# 示例：/whois/example.com
```

## 🌩️ Vercel部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fwhois)

### 手动部署

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 部署
vercel

# 3. 生产环境部署
vercel --prod
```

## 🛠️ 技术栈

- Express.js - Web框架
- node-whois - WHOIS查询
- express-rate-limit - 速率限制
- node-cache - 数据缓存

## 📝 许可证

MIT
