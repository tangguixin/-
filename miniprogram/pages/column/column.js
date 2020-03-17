var wxCharts = require('../../util/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
    main: {
        title: '总条数',
        data: [1500, 2000, 4500, 3700],
        categories: ['工地1', '工地2', '工地3', '工地4']
    },
    sub: [{
        title: '工地1',
        data: [70, 40, 65, 100, 34, 18],
        categories: ['1', '2', '3', '4', '5', '6']
    }, {
        title: '工地2',
        data: [55, 30, 45, 36, 56, 13],
        categories: ['1', '2', '3', '4', '5', '6']
    }, {
        title: '工地3',
        data: [76, 45, 32, 74, 54, 35],
        categories: ['1', '2', '3', '4', '5', '6']                
    }, {
        title: '工地4',
        data: [76, 54, 23, 12, 45, 65],
        categories: ['1', '2', '3', '4', '5', '6']
    }]
};
Page({
    data: {
        chartTitle: '总成交量',
        isMainChartDisplay: true
    },
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'workplace', //云函数的名称
      data: {
        //传入云函数event中
      },
      success: res => {
        console.log("返回的数据", res.result.list[1]._id)  //res的数据结构如下图
      },
      fail: err => {
        console.error('[云函数] [loginInfo] 调用失败', err)
      }
    })

  },

    backToMainChart: function () {
        this.setData({
            chartTitle: chartData.main.title,
            isMainChartDisplay: true
        });
        columnChart.updateData({
            categories: chartData.main.categories,
            series: [{
                name: '钢筋条数',
                data: chartData.main.data,
                format: function (val, name) {
                    return val + '条';
                }
            }]
        });
    },
    touchHandler: function (e) {
        var index = columnChart.getCurrentDataIndex(e);
        if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
            this.setData({
                chartTitle: chartData.sub[index].title,
                isMainChartDisplay: false
            });
            columnChart.updateData({
                categories: chartData.sub[index].categories,
                series: [{
                    name: '钢筋条数',
                    data: chartData.sub[index].data,
                    format: function (val, name) {
                        return val + '条';
                    }
                }]
            });

        }
    },
    onReady: function (e) {
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }

        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: chartData.main.categories,
            series: [{
                name: '成交量',
                data: chartData.main.data,
                format: function (val, name) {
                    return val.toFixed(2) + '条';
                }
            }],
            yAxis: {
                format: function (val) {
                    return val + '条';
                },
                title: '条数',
                min: 0
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 15
                }
            },
            width: windowWidth,
            height: 200,
        });
    }
});