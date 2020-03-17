// pages/download/download.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    initForm();

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

  /**
   * 开始日期改变事件
   */
  bindStartDateChange: function (e) {
    this.setData({
      dateStart: e.detail.value,
    })
  },

  /**
   * 结束日期改变事件
   */
  bindEndDateChange: function (e) {
    this.setData({
      dateEnd: e.detail.value,
    })
  },

  /**
   * 清除文本按钮事件
   */
  bindResiteInput: function (event) {
    var value = event.currentTarget.dataset.value;
    var obj = {};
    if (value) {
      obj[value] = "";
      this.setData(obj);
    }
    console.log(event, value, obj);
  },

  /**
   * 提交表单
   */
  submit: function (e) {
    //获取表单并转换数据
    var DataObj = e.detail.value;
    console.log(DataObj)
    wx.navigateTo({
      url: '../excel/excel?find_start_time=' + DataObj.find_start_time + '&find_end_time=' + DataObj.find_end_time,
    })
  },

  /**
   * 重置按钮事件
   */
  bindResite: function () {
    initForm();
  },

})

/** 初始化表单 */
function initForm() {

  that.setData({
    dateStart:"",
    dateEnd: "",
  });
}