/**
 * Created by aresn on 16/7/18.
 */
let util = {

};
util.alert = function(content) {
    window.alert(content);
};

util.title = function (title) {
    title = title ? title : 'ECMS';
    window.document.title = title;
};
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
util.getStyle = function (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch(e) {
        return element.style[styleName];
    }
};

export function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000/60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}
/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = []
        allRouter.forEach((v, i) => {
            userRouter.forEach((item, index) => {
                if(item.name === v.name){
                    if (item.children && item.children.length > 0) {
                        v.children = recursionRouter(item.children, v.children)
                        // 定义重定向，避免没有路由权限的情况
                        if(v.children[0].children&&v.children[0].length > 0) {
                            v.redirect = v.children[0].children[0].path
                        }else {
                            v.redirect = v.children[0].path
                        }
                    }
                    realRoutes.push(v)
                }
            })
        })
    return realRoutes
}
export function setDefaultRoute() {
    let array = [{
        "children": [
            {
                "name": "仪表盘"
            },
            {
                "name": "个人号",
                "children": [
                    {
                        "name": "成员",
                        "children": [
                            {
                                "name": "客户列表"
                            },
                            {
                                "name": "新的客户"
                            },
                            {
                                "name": "客户查重"
                            },
                            {
                                "name": "群列表"
                            },
                            {
                                "name": "客户详情"
                            },
                            {
                                "name": "群详情"
                            }
                        ]
                    },
                    {
                        "name": "朋友圈",
                        "children": [
                            {
                                "name": "客户朋友圈"
                            },
                            {
                                "name": "我的朋友圈"
                            },
                            {
                                "name": "新消息"
                            },
                            {
                                "name": "朋友圈详情"
                            },
                            {
                                "name": "评论详情"
                            }
                        ]
                    },
                    {
                        "name": "运营",
                        "children": [
                            {
                                "name": "个人号活码"
                            },
                            {
                                "name": "关键词标签"
                            },
                            {
                                "name": "设置关键词标签"
                            },
                            {
                                "name": "黑名单"
                            },
                            {
                                "name": "关键词回复"
                            },
                            {
                                "name": "朋友圈推送"
                            },
                            {
                                "name": "私聊推送"
                            },
                            {
                                "name": "欢迎语"
                            },
                            {
                                "name": "新建推送"
                            },
                            {
                                "name": "失败详情"
                            },
                            {
                                "name": "编辑个人号活码"
                            },
                            {
                                "name": "设置信息"
                            }
                        ]
                    },
                    {
                        "name": "风控",
                        "children": [
                            {
                                "name": "聊天历史"
                            },
                            {
                                "name": "敏感词"
                            },
                            {
                                "name": "通话录音"
                            },
                            {
                                "name": "触发记录"
                            },
                            {
                                "name": "通话详情"
                            },
                            {
                                "name": "收款记录"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "企业号",
                "children": [
                    {
                        "name": "成员",
                        "children": [
                            {
                                "name": "客户列表"
                            },
                            {
                                "name": "新的客户"
                            },
                            {
                                "name": "群列表"
                            },
                            {
                                "name": "客户详情"
                            },
                            {
                                "name": "群详情"
                            }
                        ]
                    },
                    {
                        "name": "客户拓展",
                        "children": [
                            {
                                "name": "导入客户"
                            },
                            {
                                "name": "自动加粉"
                            }
                        ]
                    },
                    {
                        "name": "运营",
                        "children": [
                            {
                                "name": "群聊推送"
                            },
                            {
                                "name": "私聊推送"
                            },
                            {
                                "name": "新建推送"
                            }
                        ]
                    },
                    {
                        "name": "风控",
                        "children": [
                            {
                                "name": "聊天历史"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "资料",
                "children": [
                    {
                        "name": "客户标签"
                    },
                    {
                        "name": "快捷回复"
                    },
                    {
                        "name": "素材管理"
                    },
                    {
                        "name": "微信号标签"
                    },
                    {
                        "name": "群标签"
                    },
                    {
                        "name": "编辑素材"
                    }
                ]
            },
            {
                "name": "产品",
                "children": [
                    {
                        "name": "产品类别"
                    },
                    {
                        "name": "产品信息"
                    },
                    {
                        "name": "批量添加产品"
                    },
                    {
                        "name": "添加产品"
                    }
                ]
            },
            {
                "name": "商城",
                "children": [
                    {
                        "name": "平台订单"
                    }
                ]
            },
            {
                "name": "组织",
                "children": [
                    {
                        "name": "部门管理"
                    },
                    {
                        "name": "角色权限"
                    },
                    {
                        "name": "用户管理"
                    },
                    {
                        "name": "添加用户"
                    },
                    {
                        "name": "修改用户"
                    },
                    {
                        "name": "添加部门"
                    },
                    {
                        "name": "修改部门"
                    },
                    {
                        "name": "设置机器人"
                    },
                    {
                        "name": "添加角色"
                    },
                    {
                        "name": "修改角色"
                    },
                    {
                        "name": "分配权限"
                    },
                    {
                        "name": "维护成员"
                    }
                ]
            },
            {
                "name": "系统",
                "children": [
                    {
                        "name": "手机列表"
                    },
                    {
                        "name": "手机列表详情"
                    },
                    {
                        "name": "企业号授权"
                    },
                    {
                        "name": "企业号员工"
                    },
                    {
                        "name": "操作日志"
                    },
                    {
                        "name": "机器人列表"
                    },
                    {
                        "name": "修改机器人"
                    },
                    {
                        "name":"掉线通知"
                    }
                ]
            },
            {
                "name": "聚合聊天"
            }],
        "name": "首页"
    }]
    return array
}
export function concatMsgArr(arr1,arr2) {
    let arr = []
    arr1.forEach((v, i) => {
        arr2.forEach((item, index) => {
            if (item.key === v.key) {
                v.data = [...v.data,...item.data]
                arr2.splice(index,1)
            }
        })
    })
    arr= [...arr1,...arr2]
    return arr
}
export function powerObject(obj,name) {
    let objList =  obj.children;
    let power = {}
    for(var key in objList){
        objList[key].children && objList[key].children.forEach(el=>{
            if(el.name === name){
                switch(el.name){
                    case '客户列表':
                        el.list.forEach(el=>{
                            if(el.name==="发消息"){
                                power.msg = true;
                            }else if(el.name === "打标签"){
                                power.tag = true;
                            }else if(el.name === '打电话'){
                                power.call = true;
                            }else if(el.name === "导出客户数据"){
                                power.pullexcal = true;
                            }else if(el.name === "编辑客户信息"){
                                power.editMsg = true;
                            }
                        })
                    break;
                    case '群列表':
                        el.list.forEach(el=>{
                            if(el.name==="发消息"){
                                power.group_msg = true;
                            }else if(el.name === '发公告'){
                                power.group_notic = true;
                            }else if(el.name === "编辑群详情"){
                                power.group_edit = true;
                            }
                        })
                    break;
                    case '新的客户':
                        el.list.forEach(el=>{
                            if(el.name==="请求操作"){
                                power.response = true;
                            }else if(el.name === "自动通过客户设置"){
                                power.autoSet = true;
                            }
                        })
                    break;
                    case '客户查重':
                        el.list.forEach(el=>{
                            if(el.name==="删除重复好友"){
                                power.delte = true;
                            }
                        })
                    break;
                    case '客户朋友圈':
                        el.list.forEach(el=>{
                            if(el.name==="评论"){
                                power.talk = true;
                            }else if(el.name === "点赞"){
                                power.like = true;
                            }else if(el.name === "详情"){
                                power.infomation = true;
                            }
                        })
                    break;
                    case '我的朋友圈':
                        el.list.forEach(el=>{
                            if(el.name==="评论"){
                                power.talk = true;
                            }else if(el.name === "点赞"){
                                power.like = true;
                            }else if(el.name === "查看详情"){
                                power.infomation = true;
                            }else if(el.name === "删除"){
                                power.delte = true;
                            }
                        })
                    break;
                    case '敏感词':
                        el.list.forEach(el=>{
                            if(el.name==="新建敏感词"){
                                power.newWord = true;
                            }else if(el.name === "删除敏感词"){
                                power.delte = true;
                            }else if(el.name === "查看敏感词触发详情"){
                                power.infomation = true;
                            }
                        })
                    break;
                    case '通话录音':
                        el.list.forEach(el=>{
                            if(el.name==="查看通话记录详情"){
                                power.infomation = true;
                            }
                        })
                    break;
                    case '聊天历史':
                        el.list.forEach(el=>{
                            if(el.name==="查看聊天记录"){
                                power.historyList = true;
                            }
                        })
                    break;
                    case '收款记录':
                        el.list.forEach(el=>{
                            if(el.name==="编辑收款记录"){
                                power.edit = true;
                            }else if(el.name === "处理收款记录"){
                                power.change = true;
                            }
                        })
                    break;
                    case '私聊推送':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newPush = true;
                                }else if(el.name === "开始/暂停"){
                                    power.action = true;
                                }else if(el.name === "取消"){
                                    power.cancle = true;
                                }else if(el.name === "查看失败详情"){
                                    power.loseInfo = true;
                                }
                            })
                        break;
                    case '朋友圈推送':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newPush = true;
                                }else if(el.name === "开始/暂停"){
                                    power.action = true;
                                }else if(el.name === "取消"){
                                    power.cancle = true;
                                }else if(el.name === "查看失败详情"){
                                    power.loseInfo = true;
                                }
                            })
                        break;
                    case '个人号活码':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newLivecode = true;
                                }else if(el.name === "编辑"){
                                    power.edit = true;
                                }else if(el.name === "删除"){
                                    power.delte = true;
                                }else if(el.name === "设置启用"){
                                    power.upSet = true;
                                }
                            })
                        break;
                    case '欢迎语':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newMsg = true;
                                }else if(el.name === "编辑"){
                                    power.edit = true;
                                }else if(el.name === "删除"){
                                    power.delte = true;
                                }else if(el.name === "设置启用"){
                                    power.upSet = true;
                                }else if(el.name === "设置应用对象"){
                                    power.setObj = true;
                                }
                            })
                        break;
                    case '关键词回复':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newMsg = true;
                                }else if(el.name === "编辑"){
                                    power.edit = true;
                                }else if(el.name === "删除"){
                                    power.delte = true;
                                }else if(el.name === "设置托管对象"){
                                    power.upSet = true;
                                }
                            })
                        break;
                    case '关键词标签':
                            el.list.forEach(el=>{
                                if(el.name==="新建"){
                                    power.newMsg = true;
                                }else if(el.name === "编辑"){
                                    power.edit = true;
                                }else if(el.name === "删除"){
                                    power.delte = true;
                                }else if(el.name === "设置启用"){
                                    power.upSet = true;
                                }
                            })
                        break;
                    case '黑名单':
                        el.list.forEach(el=>{
                            if(el.name==="黑名单设置"){
                                power.set = true;
                            }else if(el.name === "黑名单管理"){
                                power.manage = true;
                            }
                        })
                    break;
                    case '客户标签':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '群标签':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '微信号标签':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '素材管理':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '快捷回复':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '产品类别':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '产品信息':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '用户管理':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '部门管理':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                    break;
                    case '角色权限':
                        el.list.forEach(el=>{
                            if(el.name==="新建"){
                                power.creat = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "删除"){
                                power.delt = true;
                            }
                        })
                        break;
                    case '手机列表':
                        el.list.forEach(el=>{
                            if(el.name==="查看"){
                                power.check = true;
                            }else if(el.name === "编辑"){
                                power.edit = true;
                            }else if(el.name === "打标签"){
                                power.tag = true;
                            }
                        })
                    break;
                    case '个人设置':
                        el.list.forEach(el=>{
                            if(el.name==="消息回复设置"){
                                power.msgReply = true;
                            }
                        })
                    break;
                    case '操作日志':
                        el.list.forEach(el=>{
                            if(el.name==="发消息"){
                                power.msg = true;
                            }else if(el.name === "打标签"){
                                power.tag = true;
                            }
                        })
                    break;

                }
            }
        })
    }
    return power
}
export default util;