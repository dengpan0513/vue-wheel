/**
 * @description 判断参数是否是须检验数组中的项
 * @param {String} value 参数
 * @param {Array} validArray 检验数组
 * @returns {Boolean}
 */
export const oneOf = (value, validArray) => {
  return validArray.includes(value)
}

/**
 * @description 将 classList 生成对应组件的 class
 * @param {String} arguments 参数
 * @returns {String}
 */
export const generateClass = function genearteClassName() {
  const classList = Array.from(arguments)
  return classList.join('')
}

/**
 * @description 单词首字母大写
 * @param {String} str
 * @param {String} separator
 * @returns {String}
 */
export const upperCaseFirstLetter = (str, separator) => {
  return str.split(separator).map(item => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join('')
}
