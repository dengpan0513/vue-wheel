/**
 * @description 判断参数是否是须检验数组中的项
 * @param {String} value 参数
 * @param {Array} validArray 检验数组
 * @return {Boolean}
 */
export const oneof = (value, validArray) => {
  return validArray.includes(value)
}
