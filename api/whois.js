const whois = require('whois');
const NodeCache = require('node-cache');

// 创建缓存实例,默认缓存时间为1小时
const cache = new NodeCache({ stdTTL: 3600 });

// 提取辅助函数
function extractCreationDate(whoisData) {
    const creationDateRegex = /(?:Creation|Registration) (?:Date|Time): (.+)/i;
    const match = whoisData.match(creationDateRegex);
    return match ? match[1] : "Unknown";
}

function extractExpirationDate(whoisData) {
    const expirationDateRegex = /(?:Expiration) (?:Date|Time): (.+)/i;
    const match = whoisData.match(expirationDateRegex);
    return match ? match[1] : "Unknown";
}

function extractRegistrar(whoisData) {
  const match = whoisData.match(/Registrar: (.+)/i);
  if (!match) {
    console.warn('Could not extract registrar from WHOIS data');
  }
  return match ? match[1].trim() : 'Unknown';
}

// 添加新的辅助函数
function validateDomain(domain) {
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
}

function extractNameServers(whoisData) {
  const nameServers = whoisData.match(/Name Server:(.+?)(?=\n)/gi);
  return nameServers ? nameServers.map(ns => ns.replace(/Name Server:/i, '').trim()) : [];
}

function extractUpdateDate(whoisData) {
  const updateDateRegex = /(?:Updated|Update) (?:Date|Time): (.+)/i;
  const match = whoisData.match(updateDateRegex);
  return match ? match[1] : "Unknown";
}

module.exports = async (req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // 获取域名参数
  const domain = req.query.domain;
  
  if (!domain) {
    return res.status(400).json({ error: '域名参数是必需的' });
  }

  if (!validateDomain(domain)) {
    return res.status(400).json({ error: '无效的域名格式' });
  }

  console.log(`收到域名 ${domain} 的WHOIS查询请求`);

  // 检查缓存
  const cachedData = cache.get(domain);
  if (cachedData) {
    console.log(`返回 ${domain} 的缓存数据`);
    return res.json(cachedData);
  }

  try {
    const data = await new Promise((resolve, reject) => {
      whois.lookup(domain, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    const result = {
      domain,
      creationDate: extractCreationDate(data),
      expirationDate: extractExpirationDate(data),
      updateDate: extractUpdateDate(data),
      registrar: extractRegistrar(data),
      nameServers: extractNameServers(data),
      rawData: data
    };
    
    cache.set(domain, result);
    return res.json(result);
    
  } catch (error) {
    console.error(`处理 ${domain} 的WHOIS数据时出错:`, error);
    return res.status(500).json({ 
      error: 'WHOIS数据处理错误', 
      details: error.message,
      domain 
    });
  }
};