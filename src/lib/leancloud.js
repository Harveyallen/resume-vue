//配置leancloud
import AV from 'leancloud-storage'

const appId = 'k2S0DOhYMPe2ha4LlBaCKnvI-gzGzoHsz'
const appKey = 'wnKB98C7yyTA46YOGi3l4dtE'

AV.init({
  appId,
  appKey
})

export default AV
