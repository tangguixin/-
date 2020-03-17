// miniprogram/pages/report/report.js
// const util = require('../../util/tools.js')
const app = getApp();
const util = require('../../util/time.js')
const db = wx.cloud.database()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    total: "",
    price: "",
    isfill: 0,
    name: "",
    index: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var ddstr = util.formatTime(new Date());
    this.setData({
      date: ddstr
    })
  },

  // 日期输入
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  priceinput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  totalinput: function (e) {
    this.setData({
      total: e.detail.value
    })
  },




  // 提交表单内容
  submit: function (e) {
    var name = this.data.name
    let vals = e.detail.value
    console.log(vals)
    if (!vals.workplace) {
      this.showTopTips("请输入工地")
      return
    }

    if (!vals.floor) {
      this.showTopTips("请输入楼层")
      return
    }
    if (!vals.total) {
      this.showTopTips("请输入当日条数")
      return
    }
    if (!vals.price) {
      this.showTopTips("请输入单价")
      return
    }
    if (!vals.income) {
      wx.showToast({
        title: '请输入收入',
        icon: 'none',
      })
      return
    }

    wx.showToast({
      title: '正在提交',
      icon: 'none',
    })

    db.collection("dianzhahan").add({
      data: {
        tijiaodate: Date(util.formatTime1(new Date())),
        name: app.globalData.systemname,
        date: vals.date,
        workplace: vals.workplace,
        floor: vals.floortype + vals.floor,
        total: parseInt(vals.total),
        price: parseFloat(vals.price),
        income: parseFloat(vals.income),
        isall: Boolean(false)
      },
      success: res => {
        wx.showToast({
          title: '记账中',
          duration: 3000,
        })
        console.log("提交成功！！！", res)
        this.inint()
      },
      fail: console.log,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /** 错误提示 */
  showTopTips: function (text) {
    var that = this;
    that.setData({
      showTopTips: true,
      textTopTips: text
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false,
        textTopTips: ""
      });
    }, 3000);
  },
  inint: function () {
    this.setData({
      workplace: "",
      floor: "",
      total: "",
      price: ""
    })
  },
  /**
   * 返回主页
   */
  gotoMain: function () {
    wx.reLaunch({
      url: '/pages/test/test',
    })
  },
})
