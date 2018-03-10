/**
 * [addClass description] 通过DOM添加class
 * @param {[type]} el        [DOM对象]
 * @param {[type]} className [className]
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
/**
 * [hasClass description] 是否存在这个className
 * @param  {[type]}  el        [DOM对象]
 * @param  {[type]}  className [description]
 * @return {Boolean}           [description]
 */
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function attachImageUrl (url) {
  if (url !== void 0) {
    let reg = /http\w{0,1}:\/\/p/g
    return url.replace(reg, 'https://images.weserv.nl/?url=p')
  }
}
