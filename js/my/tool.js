const Tool={}
Tool.getBLen = function(str,num) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
        if(realLength > 25){
            break;
        }
    }
    if(num){
        return realLength;
    }
    return str.substr(0,realLength)
};

Tool.getDay = function (date) {
        var date = new Date(date);
        var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        if (time < 0) {
            return '';
        } else if (time / 1000 < 60) {
            return '刚刚';
        } else if ((time / 60000) < 60) {
            return parseInt((time / 60000)) + '分钟前';
        } else if ((time / 3600000) < 24) {
            return parseInt(time / 3600000) + '小时前';
        } else if ((time / 86400000) < 31) {
            return parseInt(time / 86400000) + '天前';
        } else if ((time / 2592000000) < 12) {
            return parseInt(time / 2592000000) + '月前';
        } else {
            return parseInt(time / 31536000000) + '年前';
        }
    }
export default Tool;
