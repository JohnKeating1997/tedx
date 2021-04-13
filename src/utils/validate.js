/*
 * @Author: your name
 * @Date: 2021-04-12 16:41:52
 * @LastEditTime: 2021-04-13 14:04:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tedx\src\utils\validate.js
 */
function validateForm (options) {
  const emailReg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')
  const ret = {
    title: true,
    name: true,
    email: true
  }
  if (!options.title || options.title.length === 0) {
    ret.title = false
  }
  if (!options.name || options.name.length === 0) {
    ret.name = false
  }
  if (!options.email || options.email.length === 0) {
    ret.email = false
  } else {
    ret.email = emailReg.test(options.email)
  }
  return ret
}

export default validateForm
