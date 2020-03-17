Page({
  /** 
   * 页面的初始数据 
   */
  data: {

    Value: "",    //输入的内容  
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

  formSubmit(e) {

    console.log(e.detail.value);
    let value = e.detail.value.input
    console.log('value的值为', value);
    if (parseInt(value) != '888899999') {
      wx.showToast({
        title: '密码错误',
        icon:'none',
        duration: 2000
      })
    } else {
      wx.reLaunch({
        url: '../guide/guide',
      })

    }

  },
})


