import AV from '../lib/leancloud'

//获取id和用户名
export default function(user) {
  let { id, attributes: { username } } = user ||
  AV.User.current() || { attributes: {} };
  return { id:id||'', username:username||'' }
}
