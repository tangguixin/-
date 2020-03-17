const util = require('../../util/tree.js')
var app = getApp();

Page({
    data: {
    },
    onLoad:function(){
 

    },
    onShow:function(){

    },
  switchchange: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  authMsg(event) {

    wx.requestSubscribeMessage({

      tmplIds: ['PSdoCDI5-EiSHVHI7RXOZyNN_7RG24FMAoYxCbhlcWM'],

      success: function (res) {

        console.log(res)

      },

      fail: function (err) {

        console.log(err)

      }

    })

  },
    dianji:function(){
      // var shuzi = util.translatedate(this.data.list)
      // console.log("再一次返回",shuzi)

    
   
    }
    

});