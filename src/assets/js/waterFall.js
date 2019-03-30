

const waterFall = {
    wfBaseInfo: function (wfbox, minWidth, maxMargin) {
        //计算每个item的宽度
        let wfbase = { colNum: 0, itemWidth: 0 };
        let wfAreaWidth = wfbox.clientWidth; //1080px,660px,320px
        wfbase.colNum = Math.floor(wfAreaWidth / minWidth);
        let overWidth = wfAreaWidth % minWidth; //多余的宽度
        let totalMarginWidth = maxMargin * (wfbase.colNum + 1); //去除最小间距的宽度
        let everyAddWidth = (overWidth - totalMarginWidth) / wfbase.colNum;
        wfbase.itemWidth = minWidth + everyAddWidth; //最后每个item的宽度
        return wfbase;
    },
    getPicinfo: function (imgList, loading, loadingOK) {  //获取图片数据，可以设置事件
        if (loading) {
            loading();
        }
        let promiseAll = [];
        let itemList = imgList;
        let itemListLength = itemList.length;
        for (let i = 0; i < itemListLength; i++) {
            promiseAll[i] = new Promise((resolve, reject) => {
                let img = new Image();
                img.src = itemList[i];
                img.onload = function () {
                    resolve(img);
                };
            });
        }
        Promise.all(promiseAll).then(res => {
            if (loadingOK) {
                loadingOK();
            }
            promiseAll = null;
            return res;
        });
    },
    createWF: function (wfbox, wfitem, minWidth, maxMargin) {  //需要创建瀑布的盒子，需要加载的图片列表，需要替换的数据列表
        function WaterFall(wfbox, wfitem, minWidth, maxMargin, colNum, itemWidth, wfboxHeightList, wfboxLeftList, eleStr) {
            this.version = '0.0.1';
            this.wfbox = wfbox,
            this.wfitem = wfitem;
            this.minWidth = minWidth;
            this.maxMargin = maxMargin;
            this.colNum = colNum;
            this.itemWidth = itemWidth;
            this.wfboxHeightList = wfboxHeightList;
            this.wfboxLeftList = wfboxLeftList;
            this.eleStr = eleStr;
        }


        WaterFall.prototype = {
            constructor: WaterFall,
            wfBaseInfo: function (wfbox, minWidth, maxMargin) {
                //计算每个item的宽度
                let wfbase = { colNum: 0, itemWidth: 0 };
                let wfAreaWidth = wfbox.clientWidth; //1080px,660px,320px
                wfbase.colNum = Math.floor(wfAreaWidth / minWidth);
                let overWidth = wfAreaWidth % minWidth; //多余的宽度
                let totalMarginWidth = maxMargin * (wfbase.colNum + 1); //去除最小间距的宽度
                let everyAddWidth = (overWidth - totalMarginWidth) / wfbase.colNum;
                wfbase.itemWidth = minWidth + everyAddWidth; //最后每个item的宽度
                return wfbase;
            },
            getImgDataList: function (imgList, loading, loadingOK) {
                if (loading) {
                    loading();
                }
                let promiseAll = [];
                let itemList = imgList;
                let itemListLength = itemList.length;
                for (let i = 0; i < itemListLength; i++) {
                    promiseAll[i] = new Promise((resolve, reject) => {
                        let img = new Image();
                        img.src = itemList[i];
                        img.onload = function () {
                            resolve(img);
                        };
                    });
                }
                Promise.all(promiseAll).then(res => {
                    if (loadingOK) {
                        loadingOK(res);
                    }
                    promiseAll = null;
                    res = null;
                });
            },
            render: function (imgRes, wfdata) {
                let wfDataList = wfdata;

                let eleStr = this.eleStr;
                let imgResLength = imgRes.length;
                let item = null;
                let wfboxHeight = null;
                let imgNode = null;
                let imgParentNode = null;
                let img = null;
                let boxHeight = 0;

                for (let index = 0; index < imgResLength; index++) {
                    //-------------------------------------------------------
                    if (index == 0) {
                        item = this.wfitem;
                        this.wfbox.removeChild(this.wfitem);
                        let tempNode = document.createElement('div');
                        //-------------------------------------------
                        let Str = item.outerHTML;
                        let wfDataItem = wfDataList[index];
                        let newStr = "";
                        let S=this.eleStr;
                        for (const key in wfDataItem) {
                            newStr = S.replace(key, wfDataItem[key])
                            S=newStr;
                        }//替换字符串
                        //-------------------------------------------
                        tempNode.innerHTML = newStr;
                        item = tempNode.firstChild;
                    } else {
                        let tempNode = document.createElement('div');
                        //-------------------------------------------
                        let wfDataItem = wfDataList[index];
                        let newStr = "";
                        let S=this.eleStr;
                        for (const key in wfDataItem) {
                            newStr = S.replace(key, wfDataItem[key])
                            S=newStr;
                        }//替换字符串
                        //-------------------------------------------
                        tempNode.innerHTML = newStr;
                        item = tempNode.firstChild;
                    }
                    //---------------------------------------------------------
                    // console.log(item);
                    // imgNode = item.getElementsByClassName('wfimg')[0]
                    imgNode = item.querySelector('.wfimg')
                    imgParentNode = imgNode.parentNode;
                    img = imgRes[index];
                    img.className = "wfimg";
                    img.style.width = 100 + "%";
                    img.style.height = "auto";
                    imgParentNode.replaceChild(img, imgNode);
                    //----------------------------------------------------------
                    item.style.width = this.itemWidth + "px";
                    let x = 0,
                        y = 0;

                    if (index == 0) {
                        x = this.maxMargin;
                    } else if (index < this.colNum) {
                        x = Math.floor(
                            index * this.itemWidth + this.maxMargin * index + this.maxMargin
                        );
                    } else {
                        let i = index - this.colNum;
                        x = this.wfboxLeftList[i];
                    }
                    item.style.left = x + "px";

                    if (index < this.colNum) {
                        y = 5;
                    } else {
                        let yy = index - this.colNum;
                        y = this.wfboxHeightList[yy];
                    }
                    item.style.top = y + "px";
                    this.wfbox.append(item);
                    //---------------------------------------------------------
                    wfboxHeight = item.offsetTop + item.offsetHeight + this.maxMargin;
                    if (wfboxHeight > boxHeight) {
                        boxHeight = wfboxHeight;
                        this.wfbox.style.height = wfboxHeight + 'px';
                    }
                    this.wfboxHeightList.push(wfboxHeight);
                    this.wfboxLeftList.push(x);
                }
                this.wfitem = this.wfbox.firstChild; //重新定位
            },
            reRender(wfbox) {
                let newWfInfo = this.wfBaseInfo(wfbox, this.minWidth, this.maxMargin);
                this.colNum = newWfInfo.colNum;
                this.itemWidth = newWfInfo.itemWidth;
                this.wfboxHeightList = [];
                this.wfboxLeftList = [];

                let itemList = wfbox.childNodes;
                let itemListLength = itemList.length;
                let boxHeight = 0;

                for (let index = 0; index < itemListLength; index++) {
                    itemList[index].style.width = newWfInfo.itemWidth + 'px';
                    let x = 0,
                        y = 0;
                    if (index == 0) {
                        x = this.maxMargin;
                    } else if (index < this.colNum) {
                        x = Math.floor(
                            index * this.itemWidth + this.maxMargin * index + this.maxMargin
                        );
                    } else {
                        let i = index - this.colNum;
                        x = this.wfboxLeftList[i];
                    }
                    itemList[index].style.left = x + "px";

                    if (index < this.colNum) {
                        y = 5;
                    } else {
                        y = this.wfboxHeightList[index - this.colNum];
                    }

                    itemList[index].style.top = y + "px";
                    let wfboxHeight =
                        itemList[index].offsetTop + itemList[index].offsetHeight + this.maxMargin;
                    if (wfboxHeight > boxHeight) {
                        boxHeight = wfboxHeight;
                        this.wfbox.style.height = wfboxHeight + 'px';
                    }
                    this.wfboxHeightList.push(wfboxHeight);
                    this.wfboxLeftList.push(x);
                }

            }
        }

        let baseInfo = this.wfBaseInfo(wfbox, minWidth, maxMargin);

        let eleStr = wfitem.outerHTML;
        let wfboxLeftList = [];
        let wfboxHeightList = [];
        let colNum = baseInfo.colNum;
        let itemWidth = baseInfo.itemWidth;
        let wf = new WaterFall(wfbox, wfitem, minWidth, maxMargin, colNum, itemWidth, wfboxHeightList, wfboxLeftList, eleStr);




        return wf;

    },
}














export default waterFall;
