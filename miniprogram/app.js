//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'test-m8j9a',
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'loginname',
      data: {
      }
    }).then(res => {
      console.log("返回的数据", res)
      if (res.result.data.length==0) {
        this.globalData.islogined =false
        wx.showModal({
          title: '绑定姓名',
          content: '不绑定姓名小程序无法正常使用',
          showCancel: false,//是否显示取消按钮
          cancelText: "否",//默认是“取消”
          cancelColor: 'skyblue',//取消文字的颜色
          confirmText: "去绑定",//默认是“确定”
          confirmColor: 'skyblue',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
              //点击取消,默认隐藏弹框

            } else {
              //点击确定
              wx.reLaunch({
                url: '/pages/my/my',
              })
              
            }
          },
          fail: function (res) { },//接口调用失败的回调函数
          complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
        })
       

      } else {
        this.globalData.systemname=res.result.data[0].name
        this.globalData.systemid= res.result.data[0]._id
        this.globalData.islogined = true
        console.log("赋值的姓名全局变量", this.globalData.systemname)
        console.log("赋值的id全局变量", this.globalData.systemid)
        console.log("赋值的登陆状态全局变量", this.globalData.islogined)
      }
    })


    this.globalData = {
    }
  }
})
