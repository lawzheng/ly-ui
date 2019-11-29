/**
 * 统一管理一些常用的方法
 * 2017-11-14
 */

const Vue = require('vue').default
const self = Vue.prototype

const Base64 = require('js-base64').Base64
    // import Base64 from './Base64'

// 获取URL参数的方法
const getQueryString = name => {
    let search = location.href.substr(location.href.indexOf('?') + 1)
    if (!search) return null
    let r = null
        // 加#判断，因为vue-router链接hash(#)特性
    let reg = new RegExp('(^|&)' + name + '=([^&^#]*)(&|#|$)', 'i')
    if (isBase64String(search)) {
        search = search.replace(/=.+/g, '')
        r = Base64.decode(search).match(reg)
    } else {
        r = search.match(reg)
    }
    if (r != null) return unescape(decodeURI(r[2]))
        // 添加另一段参数获取，因为微信授权登录后会把code、state插入 vue-router 链接hash('#')之前
        // url?code=code&state=state#/customQuery
    let searchOther = search.substr(search.indexOf('?') + 1, search.length)
    if (!searchOther) return null
    if (isBase64String(searchOther)) {
        searchOther = searchOther.replace(/=.+/g, '')
        r = Base64.decode(searchOther).match(reg)
    } else {
        // 加#判断，因为vue-router链接hash(#)特性
        let reg = new RegExp('(^|&)' + name + '=([^&^#]*)(&|#|$)', 'i')
        r = searchOther.match(reg)
    }
    if (r != null) return unescape(decodeURI(r[2]))
    return null
}

// 设置cookie
const setCookie = (name, value) => {
    let Days = 30
    let exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/;`
}

// 读取cookie
const getCookie = name => {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
        return unescape(arr[2])
    } else {
        return null
    }
}

// 删除cookie
const removeCookie = name => {
    let exp = new Date()
    exp.setTime(exp.getTime() - 100)
    let cval = getCookie(name)
    if (cval !== null) {
        document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/;`
    }
}

function formatDate(date, fmt) {
    if (!date || date === null) {
        return ''
    }
    if (date.constructor === String) {
        if (date === '0000-00-00' || date === '0000-00-00 00:00:00') {
            return ''
        } else {
            date = new Date(date.replace(/-/g, '/'))
        }
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function getDateByString(dateString) {
    if (!dateString) {
        console.log('getDateByString()方法参数为空')
        return null
    }
    // 兼容ios的时间转换方法
    return new Date(dateString.replace(/-/g, '/'))
}

function getCurDateString() {
    let date = new Date()
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}

function getCurWeek(myDate) {
    if (!myDate) myDate = new Date()
        // 获取当前星期几
    let curDate = new Date()
    let week = curDate.getDay()
    let string = ''
    switch (week) {
        case 0:
            string = '星期日'
            break
        case 1:
            string = '星期一'
            break
        case 2:
            string = '星期二'
            break
        case 3:
            string = '星期三'
            break
        case 4:
            string = '星期四'
            break
        case 5:
            string = '星期五'
            break
        case 6:
            string = '星期六'
            break
    }
    return string
}

function getMonthWeek(myDate) {
    if (!myDate) myDate = new Date()
    let date = myDate
    let firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
    let firstDay = firstDate.getDay()
    let d = date.getDate()
    return Math.ceil(
        (d + firstDay) / 7
    )
}

function getFtv(date) {
    if (!date) date = new Date()
        // 公历节日
    let ftvList = {
        '01-01': '元旦',
        '02-14': '情人节',
        '03-08': '妇女节',
        '03-12': '植树节',
        '03-15': '消费者权益日',
        '04-01': '愚人节',
        '05-01': '劳动节',
        '05-04': '青年节',
        '05-12': '母亲节',
        '06-01': '儿童节',
        '07-01': '建党节',
        '08-01': '建军节',
        '09-10': '教师节',
        '09-28': '孔子诞辰',
        '10-01': '国庆节',
        '10-06': '老人节',
        '10-24': '联合国日',
        '12-24': '平安夜',
        '12-25': '圣诞节'
    }
    let dateString = formatDate(date, 'MM-dd')
    return ftvList[dateString]
}

function getCurrentMonthFirst(date) {
    if (!date) date = new Date()
    date.setDate(1)
    return date
}

function getCurrentMonthLast(date) {
    if (!date) date = new Date()
    let currentMonth = date.getMonth()
    let nextMonth = ++currentMonth
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
    let oneDay = 1000 * 60 * 60 * 24
    return new Date(nextMonthFirstDay - oneDay)
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

// 时间转化
function getDateDiff(date) {
    if (!date || date === null) {
        return ''
    }
    if (date.constructor === String) {
        if (date === '0000-00-00') {
            return ''
        } else {
            date = new Date(date.replace(/-/g, '/'))
        }
    }
    let now = new Date() // 当前时间
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 今日凌晨
    let yesterday = new Date(today - 24 * 3600 * 1000) // 昨天凌晨
    let fDayOfYear = new Date(now.getFullYear(), 0, 1) // 今年第一天
        // 获取显示数据
    let year = date.getFullYear()
    let mon = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let second = date.getSeconds()
        // 小于10的在前面补0
    if (mon < 10) {
        mon = '0' + mon
    }
    if (day < 10) {
        day = '0' + day
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }
    if (second < 10) {
        second = '0' + second
    }
    let d = now.getTime() - date.getTime()
        // let days = parseInt(d / (24 * 60 * 60 * 1000))
    let hours = parseInt(d / (60 * 60 * 1000))
    let minutes = parseInt(d / (60 * 1000))
    let seconds = parseInt(d / 1000)
    let isYesterday = date >= yesterday && date < today
    if (date < fDayOfYear) {
        return year + '-' + mon + '-' + day + ' ' + hour + ':' + min
    } else if (date < yesterday) {
        return mon + '-' + day + ' ' + hour + ':' + min
    } else if (isYesterday) {
        return '昨天 ' + hour + ':' + min
    } else if (hours >= 24) {
        return hour + ':' + min
    } else if (hours > 0 && hours < 24) {
        return hours + '小时前'
    } else if (minutes > 0) {
        return minutes + '分钟前'
    } else if (seconds <= 60) {
        return '刚刚'
    } else {
        return mon + '-' + day + ' ' + hour + ':' + min
    }
}

// 函数节流
const throttle = (fn, duration) => {
    let begin = new Date()
    return function() {
        let context = this
        let args = arguments
        let now = new Date()
        if (now - begin >= duration) {
            fn.apply(context, args)
            begin = now
        }
    }
}

// 函数去抖
const debounce = (fn, delay) => {
    let timer = null
    return function() {
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

// 数组去重
const distinct = (arr) => {
    if (!(arr instanceof Array)) {
        throw new Error('no Array')
    }
    let result = []
    arr.forEach((v, i, arr) => {
        let bool = arr.indexOf(v, i + 1)
        if (bool === -1) {
            result.push(v)
        }
    })
    return result
}

// 加载第三方脚本
const getScript = (src) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve({ status: 'success' })
        }
        script.onerror = () => {
            reject(new Error('加载脚本失败，请检查链接是否有效'))
        }
        document.head.appendChild(script)
    })
}

// 检查字符串是否经 base64 加密
const isBase64String = str => {
    if (!str) return false
    str = str.replace(/=.+/g, '') // 需要把自动填补上的等号去了才准确
    try {
        let s = Base64.encode(Base64.decode(str))
        return s.replace(/=.+/g, '') === str.replace(/=.+/g, '')
    } catch (e) {
        return false
    }
}

const encode = str => {
    return Base64.encode(str)
}

const decode = str => {
    return Base64.decode(str)
}

// 获取赛事类型
const getGameType = (gametype, roundRobin) => { // 格式化赛制
    if (!+gametype || !+roundRobin) {
        return ''
    }
    return +gametype === 2 && +roundRobin === 1 ? '单循环联赛' :
        +gametype === 2 && +roundRobin === 2 ? '双循环联赛' :
        +gametype === 3 && +roundRobin === 1 ? '单循环杯赛' :
        +gametype === 3 && +roundRobin === 2 ? '双循环杯赛' :
        +gametype === 3 && +roundRobin === 3 ? '小组赛双循环杯赛' :
        +gametype === 3 && +roundRobin === 4 ? '淘汰赛双循环杯赛' :
        +gametype === 2 ? '联赛' :
        +gametype === 3 ? '杯赛' :
        ''
}

// 获取赛事几人制
const getRuleName = name => {
    if (!name || name === 'null' || name === 'undefined') {
        return ''
    }
    return /^\d人/.test(name) ? name.replace('制', '') + '制' : name.replace(/赛$/, '')
}

// 根据生日获取年龄
const getAgeByBirthday = (birthday, curDate) => {
    let birthDate = getDateByString(birthday)
    let nowDateTime = curDate || new Date()
    let age = nowDateTime.getFullYear() - birthDate.getFullYear()
        // 再考虑月、天的因素
    if (nowDateTime.getMonth() > birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() > birthDate.getDate())) {
        age++
    }
    return age
}

// 判断对象是否相等
const diff = (obj1, obj2) => {
    let o1 = obj1 instanceof Object
    let o2 = obj2 instanceof Object
    if (!o1 || !o2) {
        return obj1 === obj2
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }
    for (let attr in obj1) {
        let t1 = obj1[attr] instanceof Object
        let t2 = obj2[attr] instanceof Object
        if (t1 && t2) {
            return this.diff(obj1[attr], obj2[attr])
        } else if (obj1[attr] !== obj2[attr]) {
            return false
        }
    }
    return true
}

// 封装操作localstorage本地存储的方法
const storage = {
    // 存储
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    // 取出数据
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    // 删除数据
    remove(key) {
        localStorage.removeItem(key)
    }
}

const hex2Rgb = (sColor, rgba) => {
    // 16进制颜色转rgb
    sColor = sColor.toLowerCase()
    if (sColor) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色
        let sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        if (rgba === 'rgba') {
            return 'rgba(' + sColorChange.join(',') + ')'
        } else {
            return 'rgb(' + sColorChange.join(',') + ')'
        }
    } else {
        return sColor
    }
}

const rgb2hex = (rgb) => {
    // rgb转16进制
    if (rgb.charAt(0) === '#') return rgb
    let ds = rgb.split(/\D+/)
    let decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3])
    return '#' + zeroFillHex(decimal, 6)
}

const zeroFillHex = (num, digits) => {
    // rgb转16进制附带
    let s = num.toString(16)
    while (s.length < digits) {
        s = '0' + s
    }
    return s
}

const isNumber = (val) => {
    // 判断是不是数字
    let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true
    } else {
        return false
    }
}

// 根据出生日期算出年龄
function jsGetAge(strBirthday) {
    let returnAge
    let strBirthdayArr = strBirthday.split('-')
    let birthYear = +strBirthdayArr[0]
    let birthMonth = +strBirthdayArr[1]
    let birthDay = +strBirthdayArr[2]

    let d = new Date()
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let nowDay = d.getDate()
        // console.log(birthYear, birthMonth, birthDay, nowYear, nowMonth, nowDay)
    if (nowYear === birthYear) {
        returnAge = 0 // 同年 则为0岁
    } else {
        let ageDiff = nowYear - birthYear // 年之差
        if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
                let dayDiff = nowDay - birthDay // 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            } else {
                let monthDiff = nowMonth - birthMonth // 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            }
        } else {
            returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge // 返回周岁年龄
}

// 判断是不是数组
function isArrayFn(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    } else {
        return Object.prototype.toString.call(value) === '[object Array]'
    }
}

/**
 * @method 校验身份证
 * @input code 身份证号
 * @return {boolean}
 */
function identityCodeValid(code) {
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
    }
    let tip = ''
    let pass = true

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
            code = code.split('')
                // ∑(ai×Wi)(mod 11)
                // 加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                // 校验位
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            // let last = parity[sum % 11]
            if (+parity[sum % 11] !== +code[17]) {
                tip = '身份证输入有误'
                pass = false
            }
        }
    }
    if (tip) self.showToast(tip)
    return pass
}

/**
 * @method 复制内容到粘贴板
 * @input data：要复制的内容   toast: 要提示的信息 可不传
 */
function copyData(data, toast) {
    toast = toast || '复制成功'
    if (self.isGreenApp) {
        self.$sendDataToClient({
            type: 'copyToPasteboard',
            url: data
        })
        self.showToast(toast)
    } else {
        let node = document.createElement('div')
        node.id = 'copy'
        node.innerHTML = data
        node.style.opacity = '0'
        document.body.appendChild(node)
        let pathItem = document.querySelector('#copy')
        let range = document.createRange()
        range.selectNode(pathItem)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        if (document.execCommand('copy')) {
            self.showToast(toast)
        }
        document.body.removeChild(node)
        window.getSelection().removeAllRanges()
    }
}

/**
 * 校验手机号格式
 * @param phone 手机号
 * @returns {boolean} 校验结果
 */
function testPhone(phone) {
    let reg = /^[1][3456789][0-9]{9}$/
    return reg.test(phone)
}

/**
 * 倒计时 输入结束时间戳 返回时分秒
 * @param endTime
 * @returns {{hour: string, minute: string, second: string}}
 */
function countDown(endTime) {
    const now = new Date().getTime()
    const downTime = endTime - now
    let hour = ''
    let minute = ''
    let second = ''
    let a = downTime / 1000
    let hh = parseInt(a / 3600)
    if (hh < 10) hh = '0' + hh
    let mm = parseInt((a - hh * 3600) / 60)
    if (mm < 10) mm = '0' + mm
    let ss = parseInt((a - hh * 3600) % 60)
    if (ss < 10) ss = '0' + ss
    if (a > 0) {
        hour = hh + ''
        minute = mm + ''
        second = ss + ''
    } else {
        hour = '00'
        minute = '00'
        second = '00'
    }
    return {
        hour,
        minute,
        second
    }
}

/**
 * 打开外部链接
 * @param url
 */
function openUrl(url) {
    if (self.isGreenApp) {
        self.$sendDataToClient({
            type: 'openUrlWithBrowser',
            url: url
        })
    } else {
        window.open(url)
    }
}

/**
 * 下载图片
 * @param imgSrc
 * @param name
 */
function downloadImg(imgSrc, name) {
    if (self.isGreenApp) {
        self.$sendDataToClient({
            type: 'openUrlWithBrowser',
            url: imgSrc
        })
    } else {
        let alink = document.createElement('a')
        alink.href = imgSrc
        alink.download = name
        alink.click()
    }
}

/**
 * 图片拼上后缀
 * @param img 图片路径
 * @param suffix  所要加的后缀 small m l middle def
 * @returns {*}
 */
function jointImgSuffix(img, suffix) {
    if (!img) return img
    const index = img.indexOf('!')
    let url = img
    if (index !== -1) {
        url = img.slice(0, index)
    }
    url = url + '!' + suffix
    return url
}

/**
 * 打电话
 * @param tel 电话号
 */
function callPhone(tel) {
    if (self.isGreenApp) {
        self.$sendDataToClient({
            type: 'copyToPasteboard',
            url: tel
        })
        self.showToast('已复制号码')
    } else {
        location.href = 'tel:' + tel
    }
}

// 导出所有方法
export default {
    getQueryString: getQueryString,
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie,
    formatDate: formatDate,
    getDateDiff: getDateDiff,
    throttle: throttle,
    debounce: debounce,
    distinct: distinct,
    getScript: getScript,
    isBase64String: isBase64String,
    getGameType: getGameType,
    getRuleName: getRuleName,
    getCurWeek: getCurWeek,
    getCurDateString: getCurDateString,
    getMonthWeek: getMonthWeek,
    getFtv: getFtv,
    getCurrentMonthFirst: getCurrentMonthFirst,
    getCurrentMonthLast: getCurrentMonthLast,
    getDateByString: getDateByString,
    getAgeByBirthday: getAgeByBirthday,
    diff: diff,
    storage: storage,
    rgb2hex: rgb2hex,
    zeroFillHex: zeroFillHex,
    isNumber: isNumber,
    hex2Rgb: hex2Rgb,
    jsGetAge: jsGetAge,
    isArrayFn: isArrayFn,
    identityCodeValid: identityCodeValid,
    copyData: copyData,
    testPhone: testPhone,
    decode: decode,
    encode: encode,
    countDown: countDown,
    openUrl: openUrl,
    downloadImg: downloadImg,
    jointImgSuffix: jointImgSuffix,
    callPhone: callPhone
}