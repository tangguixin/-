// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: false,
    name: "",
    phoneNum: '',

  },


  confirmM: function (e) {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return
    } else {
      wx.showLoading({
        title: '正在提交！',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'register',
        data: {
          name: this.data.name
        }
      }).then(res => {
        console.log("返回的数据", res)

      })
      success: {
        wx.hideLoading()
      }

      this.setData({
        hiddenmodalput: true
      })
    }
    console.log("姓名：" + this.data.name);
  },

  iName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})