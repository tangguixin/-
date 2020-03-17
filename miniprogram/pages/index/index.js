//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    otherdata:{}
  },
  //转发
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  },

  onLoad: function () {
    var that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      data: {
      }
    }).then(res => {
      console.log("返回的数据",res)
      if (res.result.dbResult.data[0].name != null) {
        that.setData({
          name: res.result.dbResult.data[0].name,
          hiddenmodalput: true
        })
        this.data.id = res.result.dbResult.data[0]._id
        
      }else{
        that.setData({
          hiddenmodalput:false
        })

      }
    })
  
  },
  onShow: function(){

  },

  //确认
  confirm: function () {

    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return
    }else{
      wx.showLoading({
        title: '正在提交！',
      })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'register',
      data: {
        name:this.data.name
      }
    }).then(res => {
      console.log("返回的数据", res)
     
    })
    success:{
      wx.hideLoading()
    }
    
    this.setData({
      hiddenmodalput: true
    })
    }
  },
  onnameinput:function(e){
    console.log("输入的姓名：",e.detail.value)
    this.setData({
      name:e.detail.value
    })
  },
  onnameinput2: function (e) {
    console.log("修改的名字",e.detail.value)
    this.setData({
      name: e.detail.value
    })
    this.data.name2=e.detail.value
  },
  namechange:function(){
    this.setData({
      hiddenmodalput1:true
    })
  },
  //修改
  confirm2: function () {
    var that=this

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
          id:this.data.id
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
  cancel:function(){
    this.setData({
      hiddenmodalput1: false
    })

  }


})
