import Axios from 'axios'
import { Message } from 'element-ui'
Axios.defaults.timeout = 5000;
Axios.defaults.headers['Content-Type'] = 'application/json';
// 添加请求拦截器
Axios.interceptors.request.use((config: any) => {
    let jwtToken: string | null = window.sessionStorage.getItem('jwtToken') || '';
    if (jwtToken) {
        config.headers['Jwt-Token'] = jwtToken;
    }
    return config
}, error => {
    return Promise.reject(error);
})

// 添加响应拦截器
Axios.interceptors.response.use((response: any) => {
    if (response.data.code === 200) {
        return response
    } else {
        Message({
            message: response.data.msg,
            type: 'error'
        });
        return Promise.reject(response);
    }

}, error => {
    if (error.response.status === 401) {
        Message({
            message: '登陆已过期，请重新登陆。',
            type: 'error'
        });
        setTimeout(() => window.location.href = `${window.location.origin}`, 3000)
        return
    }
    return Promise.reject(error);
})

export default Axios