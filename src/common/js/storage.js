/*
 * @Author: Rainy
 * @Date: 2018-03-01 20:38:35
 * @Last Modified by: Rainy
 * @Last Modified time: 2018-03-01 20:44:54
 */
export function saveToLacal (key, value) {
  let news = window.localStorage.__zhihu_daily_news__
  if (!news) {
    news = {}
  } else {
    news = JSON.parse(news)
  }

  news[key] = value
  window.localStorage.__zhihu_daily_news__ = JSON.stringify(news)
}

export function loadFromLocal (key, def) {
  let news = window.localStorage.__zhihu_daily_news__
  if (!news) {
    return def
  }
  news = JSON.parse(news)

  let ret = news[key]
  return (ret != null ? ret : def)
}
