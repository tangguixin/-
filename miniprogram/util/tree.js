let translatedate = function (list) {
  var total=[],workplace=[]
  for(var i=0;i<list.length;i++){
  total[i] = list[i].result
  workplace[i] = String(list[i]._id.workplace)
  }
  return ([workplace, total])
}


module.exports = {
  
  translatedate,
}