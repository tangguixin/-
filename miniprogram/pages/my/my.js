// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    hiddenmodalput: false,
    hiddenmodalput1: false,
    name: "",

  },
  //修改
  confirm2: function () {
    var that = this

    if (!this.data.name2) {
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
        name: 'namechange',
        data: {
          name: this.data.name2,
          id: app.globalData.systemid
        }
      }).then(res => {
        console.log("返回的数据", res)

      })
      success: {
        wx.hideLoading()
      }

      this.setData({
        hiddenmodalput1: false
      })
    }
  },
  cancel: function () {
    this.setData({
      hiddenmodalput1: false
    })

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
  onnameinput2: function (e) {
    console.log("修改的名字", e.detail.value)
    this.setData({
      name: e.detail.value
    })
    this.data.name2 = e.detail.value
  },
  namechange:function(){
    this.setData({
      hiddenmodalput1: true,
    })
  },
  /**
  * 打开意见反馈
  */
  bindOpenFeedback: function () {
    wx.showModal({
      title: '意见反馈',
      content: '请联系：15823281055',
      confirmText: '复制号码',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          var url = '15823281055';
          wx.setClipboardData({
            data: url,
            success: function () {
              wx.showToast({
                title: '复制成功',
                icon: 'success'
              });
              console.log('复制成功：', url);
            }
          })
        }
      }
    })
  },

  /**
   * 退出按钮事件
   */
  btnLogout: function () {
    wx.showModal({
      title: "退出登陆",
      content: "你确定要退出当前登陆的帐号？",
      confirmText: "退出",
      confirmColor: "#FF0000",
      success: function (res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("全局data", app.globalData.islogined)
    if (app.globalData.islogined){
      this.setData({
        hiddenmodalput: true,
        name: app.globalData.systemname
      })
  
    }
    else{
     

    }

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