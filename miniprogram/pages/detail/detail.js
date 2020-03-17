// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id:id
    })
    wx.cloud.callFunction({
      name: 'search',
      data: {
        $url: 'detail',
        id
      }
    }).then((res) => {
      console.log(res);
      this.setData({
        data: res.result.data
      })
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
      // 页面卸载清除计时器
    wx.hideToast()

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

  formSubmit: function (e) {
   var id=this.data.id
    console.log("提交时的id",id)

    let data = e.detail.value
    wx.showLoading({
      title: '信息提交中',
    })
    console.log(data)
    for (let key in data) {
      if (!data[key]) {
        wx.showToast({
          title: '请将表格填写完整',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }

    wx.cloud.callFunction({
      name:'updata',
      data: {
        id:id,
        data:{
          name:data.name,
          workplace:data.workplace,
          date:data.date,
          floor:data.floor,
          price:data.price,
          total:data.total,
          income:data.income,
          isall: data.isall
        }
      },
      success:function(res){
        // wx.showToast({
        //   title:'修改记录成功'
        // })
        // wx.hideToast()
        wx.reLaunch({
          url: '/pages/manager/manager',
        })
       
      },
      fail:console.error

    }) 
  },

  /**
  * 删除?
  */

  deletethis: function (e) {
  
    var id = this.data.id
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定要删除该条记录？',
      success: function (res) {
        if (res.confirm) {
         
          //云函数删除
          wx.cloud.callFunction({
            name: "deletethis",
            data: {
              _id: id,
            },
            success: res => {
              console.log(id)
              wx.showToast({
                title: '[云函数]数据删除成功',
              })
              console.log('[云函数] [deletethis] 删除成功！！ ', res)

              wx.hideLoading();
              wx.reLaunch({
                url: '/pages/manager/manager',
              })
            },
            fail: err => {
              wx.showToast({
                title: '[云函数] [deletethis] 调用失败' + err,
              })
              console.error('[云函数] [deletethis] 调用失败', err)
            }
          })
          //原生删除
          // const db = wx.cloud.database();
          // db.collection('bookInfo').doc(id).remove({
          //   success(res) {
          //     console.log(res.data)
          //   }
          // })

        } else if (res.cancel) {
          return false;
        }
      
      }
    })

  },


})