

const supertools = {
    //异步   将blob形式的二进制数据转为arraybuffer
    //需配合.then(res)使用  res为值；
    //v0.1 20190107 
    blobToArrayBuffer: function (blob) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            reader.onload = function (e) {
                return resolve(e.target.result);
            }
        })
    },
    //同步 将数组形式的二进制数据转为arraybuffer
    //v0.1 20190117
    arrayToArrayBuffer:function(array){
        let arraybuffer = new Uint8Array(array).buffer;
        return arraybuffer;
    }
}

export default supertools;
// module.exports = supertools


