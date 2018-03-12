export function changeImageUrl (srcUrl) {
  if (srcUrl !== undefined) {
    return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
  }
}

// export function changeImageUrl (url) {
//   if (url !== void 0) {
//     let reg = /http\w{0,1}:\/\/p/g
//     return url.replace(reg, 'https://images.weserv.nl/?url=p')
//   }
// }
