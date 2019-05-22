/**
 *   @Project:   整理常用的js工具方法
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/4/18 9:25
 *   @Note:      具体详情有细分（根据类型），列表可在utils>~README.md中查看或者在底部导出查看
 */

/** ********************************* */
/*              判断相关              */
/** ********************************* */

/**
 * 判断对象是否为空
 * @param obj {Object} 判断对象参数
 * @returns {boolean}
 */
const isEmptyObj = obj => JSON.stringify(obj) === '{}';

/**
 * 判断数组是否为空
 * @param arr {Array} 判断数组参数
 * @return {boolean}
 */
const isEmptyArray = arr => !arr.length;

/**
 * 检测空格、回车、换行、空白
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
const isBlank = (str) => {
  const reg = /^\s*$/;
  return reg.test(str);
};


/**
 * 是否登录
 * @return {boolean} 是否已登录
 */
const isLogin = () => {
  const SESSION_LOGIN = sessionStorage.getItem('userInfo');
  const LOCAL_LOGIN = localStorage.getItem('userInfo');
  return SESSION_LOGIN !== null || LOCAL_LOGIN !== null;
};

/** ********************************* */
/*              设备相关              */
/** ********************************* */

/**
 * 是否在Safari中
 * @type {boolean}
 */
const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);


/** ********************************* */
/*             字符串相关             */
/** ********************************* */

/**
 * 字符串去除所有html标签
 * @param str {string} 需要处理的字符串
 */
const removeHtmlTag = (str) => {
  const reg = /<\/?.+?\/?>/g;
  return str.replace(reg, '');
};

/**
 * 清除字符前后空格
 * @param str {String} 需要处理的字符串
 * @return {*}
 */
const clearSpace = str => str.replace(/(^\s*)|(\s*)$/g, '');

/**
 * 移除所有空格
 * @param v {String} 需要处理的字符串
 * @return {*} 返回正确的字符串
 */
const removeAllSpace = v => v.replace(/\s+/g, '');

/**
 * 移除所有超链接
 * @param html {String} html字符串
 * @return {*} 返回移除超链接之后的字符串
 */
const removeAllHyperLink = (html) => {
  const reg = new RegExp(
    /<a[^>]*href=['"]([^"]*)['"].*?[^>]*>(.*?)<\/a>/gi
  );
  return reg.test(html) ? html.replace(reg, '') : html;
};


/**
 * 替换文本中所有换行(\n)为<br/>
 * @param str {String} 需要处理的字符串
 * @return {*} 替换之后的字符串
 */
const replaceAllLineBreakWithBr = (str) => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, '<br/>') : str;
};


/**
 * 清除内容中 \n | \\n
 * @param str {String} 需要处理的字符串
 * @return {*} 清除之后的字符串
 */
const removeAllLineBreak = (str) => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, '') : str;
};

/**
 * 去除字符串中 <br/>
 * @param str {String} 需要处理的字符串
 * @return {*} 去除之后的字符串
 */
const removeBr = (str) => {
  const reg = new RegExp(/<br\s*\\?\/?>/gi);
  return reg.test(str) ? str.replace(reg, '') : str;
};

/**
 * 将所有超链接转换为不被浏览器解析的文本
 * @param html {String} html字符串
 * @return {*} 返回替换所有超链接为文本之后的字符串
 */
const replaceAllHyperLinkToText = (html) => {
  const reg = new RegExp(
    /<a[^>]*href=['"]([^"]*)['"].*?[^>]*>(.*?)<\/a>/gi
  );
  const regAnchoStart = new RegExp(
    /<a[^>]*href=['"]([^"]*)['"].*?[^>]*>/gi
  );
  const regAnchoEnd = new RegExp(/<\/a>/gi);
  return reg.test(html) ? html.replace(regAnchoStart, '').replace(regAnchoEnd, '') : html;
};

/**
 * 验证手机号
 * @param phone {Number} 一串数字
 * @return {boolean}
 */
const checkPhone = phone => /^1[34578]\d{9}$/.test(phone) || /^8\d+$/.test(phone);

/**
 * 验证是否是URL地址
 * @param url {String} 字符串
 * @return {boolean}
 */
const checkUrl = (url) => {
  const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp的user@
    + '|' // 允许IP和DOMAIN（域名）
    + '([0-9a-z_!~*()-]+)*' // 域名- www.
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]' // 二级域名
    + '[a-z]{2,6})' // first level domain- .com or .museum
    + '(:[0-9]{1,4})?' // 端口- :80
    + '((/?)|' // a slash isn't required if there is no file name
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
  const re = new RegExp(strRegex);
  return re.test(url);
};


/**
 * 解析url参数，转换为参数对象模式
 * @example ?id=12345&a=b
 * @return Object {id:12345, a:b}
 */
const urlParse = (pathUrl) => {
  const index = pathUrl.indexOf('?');
  const url = pathUrl.substring(index);
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substr(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

/**
 * 解析url参数，转换为参数对象模式
 * @param url {String} url地址 default: window.location.href
 * @example ?id=12345&a=b
 * @return {Object} 转换之后的对象 {id:12345, a:b}
 */
const parseQueryString = (url) => {
  const newUrl = !url ? window.location.href : url;
  if (newUrl.indexOf('?') === -1) {
    return {};
  }
  let search = newUrl[0] === '?' ? newUrl.substr(1) : newUrl.substring(newUrl.lastIndexOf('?') + 1);
  if (search === '') {
    return {};
  }
  search = search.split('&');
  const query = {};
  for (let i = 0; i < search.length; i++) {
    const pair = search[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

/** ********************************* */
/*           数组、对象相关            */
/** ********************************* */

/**
 * 两个数组合并一个对象
 * @param arr1 {Array} 被合并数组，在对象中以 键 存在
 * @param arr2 {Array} 被合并数组，在对象中以 值 存在
 * @return {Object} 返回键值对的对象
 */
const arrContactObject = (arr1, arr2) => {
  const obj = {};
  for (let i = 0; i < arr1.length; i++) {
    obj[arr1[i]] = arr2[i];
  }
  return obj;
};


/** ********************************* */
/*              数值相关              */
/** ********************************* */

/**
 * 四舍五入
 * @param number {Number} 处理的数字
 * @param digit {Number} 需要保留的小数位数
 * @return {number} 12.34
 */
const getMathRound = (number = 0, digit = 2) => {
  const exponent = 10 ** digit;
  return Math.round(number * exponent) / exponent;
};

/**
 * 取两个数之间的随机数
 * @param min {Number} 范围最小值(包此值)
 * @param max {Number} 范围最大值(含此值)
 * @return {number} 随机数
 * @example (1,7) => 1/2/3/4/5/6/7
 */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);


/**
 * 判断是否为手机号
 * @param str {String} 处理的字符串
 * @return {boolean}
 */
const isPhoneNum = str => /^(\+?0?86-?)?1[3456789]\d{9}$/.test(str);

/**
 * 强制保留n位小数
 * @param value {String | Number} 需要处理的数
 * @param n {Number} 需要保留的小数位数
 * @return {number}
 */
const returnFloat = (value, n) => {
  let v = Math.round(parseFloat(value) * 100) / 100;
  const xsd = v.toString().split('.');
  let res = null;
  if (xsd.length === 1) {
    v = `${v.toString()}.${'0'.repeat(n)}`;
    res = v;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < n) {
      v = `${v.toString()}0`;
    }
    res = v;
  }
  return res;
};

export {
  isEmptyObj, // 判断对象是否为空
  isEmptyArray, // 判数组是否为空
  isBlank, // 检测空格、回车、换行、空白
  isLogin, // 是否登录
  isSafari, // 是否在Safari中
  removeHtmlTag, // 字符串去除所有html标签
  clearSpace, // 清除字符前后空格
  removeAllSpace, // 移除所有空格
  removeAllHyperLink, // 移除所有超链接
  replaceAllLineBreakWithBr, // 替换文本中所有换行(\n)为<br/>
  removeAllLineBreak, // 清除内容中 \n | \\n
  removeBr, // 去除字符串中 <br/>
  replaceAllHyperLinkToText, // 将所有超链接转换为不被浏览器解析的文本
  checkPhone, // 验证手机号
  isPhoneNum, // 判断是否为手机号
  checkUrl, // 验证是否是URL地址
  urlParse, // 解析路径参数
  parseQueryString, // 解析url参数，转换为参数对象模式
  arrContactObject, // 两个数组合并一个对象
  getMathRound, // 五舍五入取值
  randomInt, // 取两个数之间的随机数
  returnFloat, // 强制保留n位小数
};
