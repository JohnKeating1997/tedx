/*
 * @Author: your name
 * @Date: 2021-04-12 21:16:36
 * @LastEditTime: 2021-04-30 17:29:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\api.js
 */
const envs = {
  local: 'http://localhost:443',
  online: 'https://www.tedxhangzhou.com.cn'
}

const env = 'online'
export default {
  commitUrl: envs[env]+'/api/voice/submit'
}
