const map = {
  202: '用户名已被占用',
  210: '用户名和密码不匹配',
  211: '找不到该用户',
  217: '无效的用户名',
  unknow: '请求失败，请稍后再试'
}
//运用解构赋值传递错误码
export default function({ code }) {
  return map[code] || map.unknow
}
