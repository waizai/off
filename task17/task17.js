/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'

    }
});


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

var oSelect = document.getElementById('city-select');
var aGraTime = document.getElementsByName('gra-time');


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var showData = chartData[pageState["nowGraTime"]][pageState["nowSelectCity"]];
    var XData = Object.getOwnPropertyNames(showData);
    var YData = [];
    for (var i = 0; i < XData.length; i++) {
        YData.push(XData[i]);
    }

    require(
        [
            'echars',
            'echars/chart/bar'
        ],
        function (ec) {
            var myChart = ec.init(document.getElementById('aqi-chart-wrap'));
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data: ['空气质量']
                },
                xAxis: {
                    data: XData
                },
                yAxis: {},
                series: [{
                    name: '空气质量',
                    type: 'bar',
                    data: YData
                }]
            };
            myChart.setOption(option);
        }
    )
    ;


}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    for (var i = 0; i < aGraTime.length; i++) {
        if (aGraTime[i].checked) {
            pageState.nowGraTime = aGraTime[i].value;
        }
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    // 设置对应数据
    pageState.nowSelectCity = oSelect.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    for (var i = 0; i < aGraTime.length; i++) {
        if (aGraTime[i].checked) {
            pageState.nowGraTime = aGraTime[i].value;
        }
    }
    //当点击时调用 graTimeChange 改变 radio 值并渲染页面
    var oForm = document.getElementById('form-gra-time');
    oForm.onchange = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var allCity = '';
    for (var city in aqiSourceData) {
        allCity += '<option>' + city + '</option>';
    }
    oSelect.innerHTML = allCity;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    oSelect.onchange = citySelectChange;
    pageState['nowSelectCity'] = '北京';
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    //城市的数据
    //var citySelected = pageState['nowSelectCity'];
    //var cityData = aqiSourceData[citySelected];
    //
    ////粒度处理
    //if (pageState.nowGraTime == 'day') {
    //    var dayData = [];
    //    for (var i = 0; i < cityData.length; i++) {
    //        dayData[i] = cityData[i];
    //    }
    //    chartData = dayData;
    //} else if (pageState.nowGraTime == 'week') {
    //    var cityweekData = [];
    //    var weekData = [];
    //    for (var i = 0; i < cityData.length; i++) {
    //        var index = cityData[i].slice(5, 7) + '-0' + Math.floor(parseInt(cityData[i].slice(8.10) / 7) + 1).toString();
    //        cityweekData[index] = 0;
    //        weekData[index] = 0;
    //    }
    //    for (var i = 0; i < cityData.length; i++) {
    //        var index = cityData[i].slice(5, 7) + '-0' + Math.floor(parseInt(cityData[i].slice(8.10) / 7) + 1).toString();
    //        cityweekData[index] += cityData[i].slice(12);
    //        weekData[index] = parseInt(cityData[index] / 7);
    //    }
    //    chartData = weekData;
    //} else {
    //    var citymonthData = [];
    //    var monthData = [];
    //    for (var i = 0; i < cityData.length; i++) {
    //        var index = cityData[i].slice(5, 7);
    //        citymonthData[index] = 0;
    //        monthData[index] = 0;
    //    }
    //    for (var i = 0; i < cityData.length; i++) {
    //        var index = cityData[i].slice(5, 7);
    //        citymonthData[index] += cityData[i].slice(12);
    //        monthData[index] = parseInt(citymonthData[index] / citymonthData.length);
    //    }
    //    chartData = monthData;
    //}
    //return chartData;
    //renderChart();
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    //天的处理
    chartData['day'] = aqiSourceData;

    //周的处理
    var cityWeekData = {};
    //把aqiSourceData的数据分解成2级，1级city，2级每个城市下的时间
    for (var city in aqiSourceData) {
        var oneCity = aqiSourceData[city];
        var everycityTime = Object.getOwnPropertyNames(oneCity);
        //进一步处理每个城市下的时间数据,初始化
        var onecityweekData = {};
        for (var i = 0; i < everycityTime.length; i++) {
            var weekIndex = everycityTime[i].slice(5, 7) + '-0' + Math.floor(parseInt(everycityTime[i].slice(8.10) / 7) + 1).toString();
            onecityweekData[weekIndex] = 0;
        }
        for (var i = 0; i < everycityTime.length; i++) {
            var weekIndex = everycityTime[i].slice(5, 7) + '-0' + Math.floor(parseInt(everycityTime[i].slice(8.10) / 7) + 1).toString();
            onecityweekData[weekIndex] += oneCity[everycityTime[i]];
        }
        cityWeekData[city] = onecityweekData;
    }
    chartData['week'] = cityWeekData;

//月的处理
    var monthData = {};
    for (var city in aqiSourceData) {
        var oneCity = aqiSourceData[city];
        var everycityTime = Object.getOwnPropertyNames(oneCity);
    }
//处理每个城市下时间数据
    var onecitymongthData = {};
    for (var i = 0; i < everycityTime.length; i++) {
        var monthData = everycityTime[i].slice(5, 7);
        onecitymongthData[monthData] = 0;
    }
    for (var i = 0; i < everycityTime.length; i++) {
        var monthData = everycityTime[i].slice(5, 7);
        onecitymongthData[monthData] += oneCity[everycityTime[i]];
    }
    monthData[city] = onecitymongthData;
    chartData['month'] = monthData;

    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();