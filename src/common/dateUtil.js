
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getCurrentDate () {
    return new Date();
}
// 获取本周起止时间
function getCurrentWeek () {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = getCurrentDate();
    //返回date是一周中的某一天
    var week = currentDate.getDay();
    //返回date是一个月中的某一天
    var month = currentDate.getDate();
    //一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    //减去的天数
    var minusDay = week != 0 ? week - 1 : 6;
    //alert(minusDay);
    //本周 周一
    var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
    //本周 周日
    var sunday = new Date(monday.getTime() + (6 * millisecond));
    //添加本周时间
    startStop.push(monday.Format("yyyy-MM-dd")); //本周起始时间
    //添加本周最后一天时间
    startStop.push(sunday.Format("yyyy-MM-dd")); //本周终止时间
    //返回
    return startStop;
}
// 获取本月起止时间
function getCurrentMonth () {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = getCurrentDate();
    //获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //求出本月第一天
    var firstDay = new Date(currentYear, currentMonth, 1);
    //当为12月的时候年份需要加1
    //月份需要更新为0 也就是下一年的第一个月
    if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0; //就为
    } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
    }
    //一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    //下月的第一天
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
    //求出上月的最后一天
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
    //添加至数组中返回
    startStop.push(firstDay.Format("yyyy-MM-dd"));
    startStop.push(lastDay.Format("yyyy-MM-dd"));
    //返回
    return startStop;
};
function getCurrentYear () {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = getCurrentDate();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //本年第一天
    var currentYearFirstDate = new Date(currentYear, 0, 1);
    //本年最后一天
    var currentYearLastDate = new Date(currentYear, 11, 31);
    //添加至数组
    startStop.push(currentYearFirstDate.Format("yyyy-MM-dd"));
    startStop.push(currentYearLastDate.Format("yyyy-MM-dd"));
    //返回
    return startStop;
}
function getCurrentDay() {
    var startStop = new Array();
    startStop.push(getCurrentDate().Format("yyyy-MM-dd"));
    startStop.push(getCurrentDate().Format("yyyy-MM-dd"));
    return startStop;
}
function getYesterday() {
    var startStop = new Array();
    var yesterday = new Date(getCurrentDate().getTime()-24*60*60*1000);
    startStop.push(yesterday.Format("yyyy-MM-dd"));
    startStop.push(yesterday.Format("yyyy-MM-dd"));
    return startStop;
}
// 最近7天
function getSevenDay() {
    var startStop = new Array();
    var sevenday = new Date(getCurrentDate().getTime()-6*24*60*60*1000);
    startStop.push(sevenday.Format("yyyy-MM-dd"));
    startStop.push(getCurrentDate().Format("yyyy-MM-dd"));
    return startStop;
}

var dateUtil= function (type) {
    var startStopDate = new Array();
    switch (type) {
        case '0':
            startStopDate = getYesterday()
            break
        case '1':
            startStopDate = getCurrentDay()
            break
        case '2':
            startStopDate = getCurrentWeek()
            break
        case '3':
            startStopDate = getCurrentMonth()
            break
        case '4':
            startStopDate = getCurrentYear()
            break
        case  '5':
            startStopDate = getSevenDay()
            break
    }
    return startStopDate
}

module.exports=dateUtil;