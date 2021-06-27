/**
 * @description 判断参数是否是须检验数组中的项
 * @param {String} value 参数
 * @param {Array} validArray 检验数组
 * @returns {Boolean}
 */
export const oneof = (value, validArray) => {
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
