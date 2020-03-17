let getDateStr = function() {
  var dd = new Date()

  var year =dd.getFullYear()
  var month = dd.getMonth() + 1
  var day = dd.getDate()
  return [year, month, day].map(formatNumber).join('-')
  }

let translateDate = function(ds) {
  if(ds!=""){
  const date = ds.split('-')
  let items = []
  items.push(date[0])
  date[1][0] === '0' ? items.push(date[1].slice(1)) : items.push(date[1])
  date[2][0] === '0' ? items.push(date[2].slice(1)) : items.push(date[2])
  return items.join('-')
}else{
  return
}
}



module.exports = {
  getDateStr,
  translateDate,
}
