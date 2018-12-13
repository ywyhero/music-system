import http from './../plugins/http'

export const httpLogin = {
    login: (params: object = {}): any => {
        return http('post', '/login/web-login', params)
    },
    loginout: (params:object={}): any => {
        return http('post', '/login/web-out', params)
    }
}

export const httpBookLists = {
    bookLists: (params: object = {}): any => {
        return http('post', '/book/listLibBook', params)
    },
    getBaseNames: (params: object = {}): any=> {
        return http('get', '/base/getBaseNames', params)
    },
    auditIsDelete: (params: object = {}) : any => {
        return http('post', '/book/auditIsDelete', params)
    },
    deleteBook: (params: object = {}) : any => {
        return http('post', '/book/delete', params)
    }
   
}
export const httpBookDetail = {
    bookDetailInfo: (params: object = {}) : any => {
        return http('post', '/book/listLibBook', params)
    },
    getSwitchLists: (params: object = {}) : any => {
        return http('post', '/bdicon/dropDownList', params)
    },
    modifyIcon: (params: object = {}) : any => {
        return http('post', '/book/modifyIcon', params)
    },
   
    
    
}