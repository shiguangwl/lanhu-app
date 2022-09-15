import axios from 'axios'
// axios.defaults.baseURL = 'http://y409505.kmdns.net:24301/zhst/'
axios.defaults.baseURL = 'http://tunnel.xxhoz.com:9080/zhst/'
// axios.defaults.baseURL=window.g.baseURL

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}







