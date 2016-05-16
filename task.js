/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
window.onload = function () {


    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var aqiData = [];
        var oCity = document.getElementById('aqi-city-input');
        var oQuity = document.getElementById('aqi-value-input');

        aqiData.push(oCity.value);
        aqiData.push(oQuity.value);
        return aqiData;
    }

    /**
     * 渲染aqi-table表格
     */
    var oTable = document.getElementById('aqi-table');

    function renderAqiList(x, y) {
        if (oTable.childElementCount == 0) {
            var oTr = document.createElement('tr');
            var oTd = document.createElement('td');
            oTd.innerHTML = '城市';
            oTr.appendChild(oTd);
            var oTd = document.createElement('td');
            oTd.innerHTML = '空气质量';
            oTr.appendChild(oTd);
            var oTd = document.createElement('td');
            oTd.innerHTML = '操作';
            oTr.appendChild(oTd);
            oTable.appendChild(oTr);
        }
        var oTr = document.createElement('tr');
        var oTd = document.createElement('td');
        oTd.innerHTML = x;
        oTr.appendChild(oTd);
        var oTd = document.createElement('td');
        oTd.innerHTML = y;
        oTr.appendChild(oTd);
        var oTd = document.createElement('td');
        var oButton = document.createElement('button');
        oButton.innerHTML = '删除';
        oButton.onclick = delBtnHandle;
        oButton.par = oTr;
        oTd.appendChild(oButton);
        oTr.appendChild(oTd);
        oTable.appendChild(oTr);

    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     * 用户输入的城市名必须为中英文字符，空气质量指数必须为整数
     用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
     用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
     */
    function addBtnHandle(tmp) {
        //var tmp = addAqiData();
        if (tmp[0] == '' || tmp[1] == '') {
            alert('城市或者空气质量不能为空');
            return;
        }
        renderAqiList(tmp[0], tmp[1]);
    }


    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle() {
        //var aTr=document.getElementsByTagName('tr');
        //var aBtn=document.getElementsByTagName('button');
        //for(var i=0;i<aTr.length;i++){
        //    aTr[i].index=i;
        //    aBtn[i].onclick=function(){
        //        oTable.removeAttribute(aTr[i]);
        //    }
        //}
        //alert(par)
        //oTable.removeChild(oTr);

    }
    delBtnHandle();


    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var oBtn = document.getElementById('add-btn');
        oBtn.onclick = function () {
            addBtnHandle(addAqiData());
        };

    }

    init();

}
