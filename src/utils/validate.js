/*
 * @Author: your name
 * @Date: 2021-04-12 16:41:52
 * @LastEditTime: 2021-05-13 19:04:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\validate.js
 */
// 校验验证码
function validateForm (options) {
  // const emailReg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')
  const ret = {
    title: true,
    nickName: true,
    email: true
  }
  if (!options.title || options.title.length === 0) {
    ret.title = false
  }
  if (!options.nickName || options.nickName.length === 0) {
    ret.nickName = false
  }
  if (!options.email || options.email.length === 0) {
    ret.email = false
  } else {
    ret.email = true
  }
  return ret
}

export default validateForm
