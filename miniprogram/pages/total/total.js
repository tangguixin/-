// miniprogram/pages/search/index.js

const MAX_LIMIT = 100;
const util = require('../../util/time.js')
let where = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {

    ncovList: [],
    show: true,
    date: "",
    no: "",
    loadAll: 0,
    total: 0,
  },
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ddstr = util.formatTime(new Date());
    this.setData({
      date: ddstr
    })

    
    this.setData({
      ncovList: []
    })
    this._getNcovList();
    this._getTotal();
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
    this.setData({
      ncovList: []
    })
    this._getNcovList();
    this._getTotal();
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
  // 日期输入
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  onScrolltolower: function () {
    console.log("滚动到底部时触发");
    this._getNcovList();
  },

  onScrolltoupper: function () {
    console.log("滚动到顶部时触发");

  },

  onDetailTap: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id
    })
  },

  onDateChange: function (e) {
    console.log("date值发生改变", e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },

  onNoInput: function (e) {
    console.log("no值发生改变", e.detail.value);
    console.log("no=的类型", typeof (e.detail.value));
    this.setData({
      no: e.detail.value
    })
  },

  onSearchTap: function () {

    let date =this.data.date
    let no = this.data.no;
    let openid = this.data.openid;

    console.log("no的值", no)

    if (date == "" && no == "") {
      wx.showToast({
        title: '请输入查询条件',
        icon: 'none'
      })

      return;
    }

    where = {
      date,
      no,
      openid
    };
    console.log("where的类型", typeof (where))
    console.log("where的值", where)

    this.setData({
     
      ncovList: []
    })
    this.data.loadAll = 0,

    this._getNcovList();

  },

  onResetTap: function () {
    this.setData({
      date:"",
      no: "",
      ncovList: []
    })
    this.data.loadAll = 0,
    where = {};
    this._getNcovList();
    this._getTotal();
  },

  _getTotal: function () {
    wx.cloud.callFunction({
      name: 'search',
      data: {
        $url: 'total1'
      }
    }).then((res) => {
      console.log(res);
      this.setData({
        total: res.result.total
      })
    })
  },


  _getNcovList: function () {
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'search',
      data: {
        $url: 'find',
        start: this.data.ncovList.length,
        count: MAX_LIMIT,
        condition: where
      }
    }).then((res) => {
      console.log(res);
      if (res.result.data == 0) {
        this.data.loadAll=1
      }
      else {
        this.setData({
          ncovList: this.data.ncovList.concat(res.result.data),
          total:res.result.data.length
        })
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  }
})