/*
 * @Author: Rainy
 * @Date: 2018-03-01 18:23:53
 * @Last Modified by: Rainy
 * @Last Modified time: 2018-03-10 15:33:27
 */
import axios from 'axios'

export function getThemeTitle () {
  return axios.get('api/themes').then((res) => {
    return Promise.resolve(res)
  })
}
export function getSlider () {
  return axios.get('api/news/latest').then((res) => {
    return Promise.resolve(res)
  })
}

export function getNews () {
  return axios.get('api/news/latest').then((res) => {
    return Promise.resolve(res)
  })
}
