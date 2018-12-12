import Axios from './axios'
import apiHost from '../config/config'
const http = (type:string, url:string, params:object) => {
    if(type === 'post') {
        url = `${apiHost}${url}`
        return new Promise((resolve, reject) => {
            Axios.post(url, params).then((response:any)=> {
                if(url.includes('/login/web-login')){
                    resolve(response)
                } else {
                    resolve(response.data)
                }
            }, (err:object) => {
                reject(err)
            }).catch((err:object) => {
                reject(err)
            })
        }) 
    }
    if(type === 'get') {
        url = `${apiHost}${url}`
        return new Promise((resolve, reject) => {
            Axios.get(url, params).then((response:any) => {
                resolve(response.data)
            }, (err:any) => {
                reject(err)
            }).catch((err:object) => {
                reject(err)
            })
        }) 
    }
} 

export default http;