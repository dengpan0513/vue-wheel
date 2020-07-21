// 判断参数是否是其中之一
export function oneof (value, validArray) {
  return validArray.includes(value)
}