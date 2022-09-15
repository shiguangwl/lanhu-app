 const Hex = function Hex(){
    
}

/**
 * 将数据编码成hex字符串
 * @param b byte数组，字符串需要先转成数组
 * @param pos 数组开始位置
 * @param len 需要编码的长度
 * @returns
 */
Hex.encode = function(b,pos,len) {
    var hexCh = new Array(len*2);
    var hexCode = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F');
    
    for(var i = pos,j = 0;i<len+pos;i++,j++) {
        hexCh[j] = hexCode[(b[i]&0xFF)>>4];
        hexCh[++j] = hexCode[(b[i]&0x0F)];
    }
    
    return hexCh.join('');
}

/**
 * 将hex字符解码成byte数组
 * @param hex hex字符
 * @returns
 */
Hex.decode = function(hex) {
    
    if(hex == null || hex == '') {
        return null;
    }
    if(hex.length%2 != 0) {
        return null;
    }
    
    var ascLen = hex.length/2;
    var hexCh = this.toCharCodeArray(hex);
    var asc = new Array(ascLen);
    
    for(var i = 0;i<ascLen;i++) {
        
        if(hexCh[2*i]>=0x30 && hexCh[2*i]<=0x39) {
            asc[i] = ((hexCh[2*i]-0x30)<<4);
        }else if(hexCh[2*i]>=0x41 && hexCh[2*i]<=0x46) {//A-F : 0x41-0x46
            asc[i] = ((hexCh[2*i]-0x41+10)<<4);
        }else if(hexCh[2*i]>=0x61 && hexCh[2*i]<=0x66) {//a-f  : 0x61-0x66
            asc[i] = ((hexCh[2*i]-0x61+10)<<4);
        }else {
            return null;
        }
        
        if(hexCh[2*i+1]>=0x30 && hexCh[2*i+1]<=0x39) {
            asc[i] = (asc[i] | (hexCh[2*i+1]-0x30));
        }else if(hexCh[2*i+1]>=0x41 && hexCh[2*i+1]<=0x46) {
            asc[i] = (asc[i] | (hexCh[2*i+1]-0x41+10));
        }else if(hexCh[2*i+1]>=0x61 && hexCh[2*i+1]<=0x66) {
            asc[i] = (asc[i] | (hexCh[2*i+1]-0x61+10));
        }else {
            return null;
        }
        
        
    }
    
    return asc;
}

/**
 * 将utf8字符集的字符串编码成hex字符串
 * 或许可以简单理解成：将字符串编码成hex字符串
 * @param utf8Str 字符串
 * @returns 返回hex字符串
 */
Hex.utf8StrToHex = function(utf8Str){
	var ens = encodeURIComponent(utf8Str);
	var es = unescape(ens);
	
	
	var esLen = es.length;

    // Convert
    var words = [];
    for (var i = 0; i < esLen; i++) {
        words[i] = (es.charCodeAt(i).toString(16));
    }
    return words.join('');
}

/**
 * 获取utf8字符串的byte数据
 * @param utf8Str 字符串
 * @returns byte数据
 */
Hex.utf8StrToBytes = function(utf8Str){
	var ens = encodeURIComponent(utf8Str);
	var es = unescape(ens);
	
	
	var esLen = es.length;

    // Convert
    var words = [];
    for (var i = 0; i < esLen; i++) {
        words[i] = es.charCodeAt(i);
    }
    return words;
}

/**
 * 将hex字符串转成utf8格式的字符串
 * 注意，如果你整个过程是这样的：GBK编码的字符串-->hex字符-->UTF8编码的字符串
 * 存在中文则很可能乱码！！！
 * @param utf8Str
 * @returns
 */
Hex.hexToUtf8Str = function(utf8Str){
	
	var utf8Byte = Hex.decode(utf8Str);
    var latin1Chars = [];
    for (var i = 0; i < utf8Byte.length; i++) {
        latin1Chars.push(String.fromCharCode(utf8Byte[i]));
    }
    return decodeURIComponent(escape(latin1Chars.join('')));
}

/**
 * byte数据转utf8字符串
 * @param bytesArray
 * @returns
 */
Hex.bytesToUtf8Str = function(bytesArray){
	
	var utf8Byte = bytesArray;
    var latin1Chars = [];
    for (var i = 0; i < utf8Byte.length; i++) {
        latin1Chars.push(String.fromCharCode(utf8Byte[i]));
    }
    return decodeURIComponent(escape(latin1Chars.join('')));
}

/**
 * 获取字符串的asc码
 * @param chs
 * @returns {Array}
 */
Hex.toCharCodeArray = function(chs){
    var chArr = new Array(chs.length);
    for(var i = 0;i<chs.length;i++){
        chArr[i] = chs.charCodeAt(i);
    }
    return chArr;
}
export default Hex