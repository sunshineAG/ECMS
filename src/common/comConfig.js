
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

//drager事件定义
//var Recognizer = require('./recognizer')
function Base64() {

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                var c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}



var config= {
    uuid:uuid
    ,getImageBySize : function(imgName,size){
        var prefix = imgName.substr(0,imgName.length-4);
        var Suffix = imgName.substr(imgName.length-4,imgName.length);
        return prefix+"_"+size+"x"+size+Suffix;
    }
    ,getSearch: function(){
        /**
         * [获取URL参数]
         *
         **/
    
        var qs = (location.search.length > 0 ? location.search.substring(1) : '');
        var args = {};
        var items = qs.split('&');
        var item = null,
            name = null,
            value = null;
        for(var i=0; i<items.length;i++){
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            args[name] = value;
        }
        return args;
    }
    //长度获取，。区分中英文
    ,getByteLen:function(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var length = val.charCodeAt(i);
            if(length>=0&&length<=128)
            {
                len += 1;
            }
            else
            {
                len += 2;
            }
        }
        return len;
    }
    ,showIcon : function(h, text) {
        //let text = params.row.name
        if (!text || text == '') return []
        let imgreg = /<span class="(\w*?emoji) (\w*?emoji[^"]+?)"><\/span>/gi
        let emojireg = /\w*?emoji \w*?emoji[^"]+/gi
        text = text.replace(/<img class="(\w*?emoji) (\w*?emoji[^"]+?)" text="(.*?)_web" src=[^>]+>/g, '<span class="$1 $2"></span>')
            .replace(/<span class="(\w*?emoji) (\w*?emoji[^"]+?)"><\/span>/g, '<span class="$1 $2"></span>');

        let arrEmoji = text.match(imgreg)
        let harr = []
        if (arrEmoji && arrEmoji.length > 0) {

            let newText = text.replace(imgreg, (match) => {
                let classStr = match.match(emojireg)[0]
                return '|' + classStr + '|'
            })
            let newTxtArr = newText.split('|')
            newTxtArr.forEach(el => {
                if (emojireg.test(el)) {
                    harr.push(h('span', {
                        attrs: {
                            class: el
                        }
                    }))
                } else {
                    harr.push(el)
                }
            })
        }
        return harr;
    }
    ,base64 : new Base64()
    ,Uint8ToString:function (fileData) {
        let dataString = "";
        for (let i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString
    }
    ,arrayUnique:function (arr, name) {
        var hash = {};
        return arr.reduce(function (item, next) {
            hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
            return item;
        }, []);
    }
    ,formatDate:function(time){// 時間格式化  參數是 new Data()
        var year = time.getFullYear();       //年
        var month = time.getMonth() + 1;     //月
        var day = time.getDate();            //日
        var hh = time.getHours();            //时
        var mm = time.getMinutes();          //分
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
    },
    compareTime:function(startTime,endTime) { // 時間比較   
        if(startTime === '0000-00-00 00:00:00'){
            return 0;
        }
        
      var startTimes = startTime&&startTime.substring(0, 10).split('-');
      var endTimes = endTime&&endTime.substring(0, 10).split('-');
      startTime = startTimes&&startTimes[0] + '-' + startTimes[1] + '-' + startTimes[2] + ' ' + startTime.substring(10, 19);
      endTime = endTimes&&endTimes[0] + '-' + endTimes[1] + '-' + endTimes[2] + ' ' + endTime.substring(10, 19);
      var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
      if (thisResult < 0) {
        console.log("endTime小于startTime！");
        return 1;
      } else if (thisResult > 0) {
        console.log("endTime大于startTime！");
        return 0;
      } else if (thisResult == 0) {
        console.log("endTime等于startTime！");
        return 0;
      } else {
        return '异常';
      }
    },
    colorList:function () {
        let list = [
            {id:1,color:'#393939',selectColor:'#000000'},
            {id:2,color:'#5BBFEA',selectColor:'#37B1E6'},
            {id:3,color:'#5BCA89',selectColor:'#2FCC71'},
            {id:4,color:'#7666CC',selectColor:'#5843CA'},
            {id:5,color:'#FFB802',selectColor:'#ECAA00'},
            {id:6,color:'#FF9A47',selectColor:'#F9811E'},
            {id:7,color:'#FF6B6B',selectColor:'#F91A1A'}
        ]
        return list
    },
    isOfflineRobot:function (user_name,offlineRobot) {
        let flag = false
        offlineRobot.forEach(el=>{
            if(el.username == user_name) {
                flag = true
            }
        })
        return flag
    },
    getRandomParams:function(length) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let params = ''
        for(let i=0;i<length;i++) {
            params += chars[Math.floor(Math.random()*chars.length)]
        }
        return params
    },
    autoHeight(header,table){
        if(header&&table){
            let clientHeight = `${document.documentElement.clientHeight}`; //页面可视区高度
            let headerHeight = header.offsetHeight + 126;
            let changeHeight = table.$children[0].$children[0].$el.children[0].childNodes[0].children[0].children[0].childNodes[1];
            if(changeHeight){
                if((clientHeight - headerHeight) <= (changeHeight.childNodes[0].clientHeight + 40)){
                    return {
                        heightFlg:true,
                        sheight:clientHeight - headerHeight + 30
                    }
                }else{
                    return {
                        heightFlg:false
                    }
                }
            }
        }
    },
    formatTime(number,format) {  
        var formateArr  = ['Y','M','D','h','m','s'];  
        var returnArr   = [];  

        var date = new Date(number * 1000);  
        returnArr.push(date.getFullYear());  
        returnArr.push(config.formatNumber(date.getMonth() + 1));  
        returnArr.push(config.formatNumber(date.getDate()));  

        returnArr.push(config.formatNumber(date.getHours()));  
        returnArr.push(config.formatNumber(date.getMinutes()));  
        returnArr.push(config.formatNumber(date.getSeconds()));  

        for (var i in returnArr)  
        {  
            format = format.replace(formateArr[i], returnArr[i]);  
        }  
        return format;  
    } ,
    formatNumber(n) {  
        n = n.toString()  
        return n[1] ? n : '0' + n  
    }, 
    format(time){
        return config.formatTime(time,'Y-M-D h:m:s')
    }
}

module.exports=config;