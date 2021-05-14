/*
 * @Author: your name
 * @Date: 2021-04-12 16:41:52
 * @LastEditTime: 2021-05-14 14:01:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\validate.js
 */
// 校验验证码
function validateForm (options) {
  // const emailReg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')
  const emailReg = /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/i
  const fileNameReg = new RegExp('[\\\\/:*?\"<>|]')
  const ret = {
    title: true,
    nickName: true,
    email: true
  }
  if (!options.title || options.title.length === 0) {
    ret.title = false
  } else {
    ret.title = !fileNameReg.test(options.title)
  }
  if (!options.nickName || options.nickName.length === 0) {
    ret.nickName = false
  } else {
    ret.nickName = !fileNameReg.test(options.nickName)
  }
  if (!options.email || options.email.length === 0) {
    ret.email = false
  } else {
    ret.email = emailReg.test(options.email)
  }
  return ret
}

export default validateForm
