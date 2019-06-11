
export default {
  format_time(time_v){
    var tt = time_v.split(":")
    return this.format_num(parseInt(tt[0])) + ":" + this.format_num(parseInt(tt[1]))
  },
  format_num(num){
    if (num < 10){
      return "0" +num
    }else {
      return "" + num
    }
  },
  get_time_num(time_v, cur_num){
    var tt = time_v.split(":")
    var time_num = parseInt(tt[0])*60 +parseInt(tt[1])
    return time_num > cur_num ? time_num : time_num + 24*60
  }
}
