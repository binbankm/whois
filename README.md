# WHOIS 查询代理服务

一个简单的WHOIS查询API服务，支持缓存和速率限制功能。

## 功能特性

- 域名WHOIS信息查询
- 自动缓存查询结果（1小时）
- 请求速率限制（每IP每15分钟最多100次请求）
- 提取关键WHOIS信息（创建日期、过期日期、注册商）
- 支持Vercel部署

## 本地开发

### 环境要求

- Node.js >= 14.x
- npm 或 yarn

### 安装步骤

1. 克隆项目到本地：
```bash
git clone <your-repo-url>
cd whois-proxy
```

2. 安装依赖：
```bash
npm install
# 或
yarn install
```

3. 启动服务：
```bash
node whois-proxy.js
```

服务将在 http://localhost:3000 启动

## API 使用说明

### 获取API信息
```
GET /
```

### 查询域名WHOIS信息
```
GET /whois/:domain
```
示例：`/whois/example.com`

## Vercel部署步骤

1. 安装Vercel CLI：
```bash
npm install -g vercel
```

2. 登录Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel
```

4. 生产环境部署：
```bash
vercel --prod
```

## 项目结构

```
whois/
  ├── whois-proxy.js    # 主服务文件
  ├── package.json      # 项目依赖配置
  ├── vercel.json       # Vercel部署配置
  └── README.md         # 项目文档
```

## 环境变量

目前项目不需要配置环境变量。

## 注意事项

- API有速率限制，每个IP每15分钟最多100次请求
- WHOIS查询结果会缓存1小时
- 部分域名的WHOIS信息可能无法完全解析

## 技术栈

- Express.js - Web框架
- node-whois - WHOIS查询
- express-rate-limit - 速率限制
- node-cache - 数据缓存

## 许可证

MIT
