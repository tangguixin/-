const cloud = require('wx-server-sdk')
//这里最好也初始化一下你的云开发环境
cloud.init({
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let { userdata } = event

    //1,定义excel表格名
    let dataCVS = 'test.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['时间','姓名', '工地','层数','条数','单价','收入']; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];
     
      arr.push(userdata[key].date);
      arr.push(userdata[key].name);
      arr.push(userdata[key].workplace);
      arr.push(userdata[key].floor);
      arr.push(userdata[key].total);
      arr.push(userdata[key].price);
      arr.push(userdata[key].income);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}

