import { MessageBox } from 'element-ui'

export const CommonMessageBox = ({message, confirm}: {message:string, confirm: Function}) => {
    MessageBox({
        title: '提示',
        message: message,
        confirmButtonText: '确定',
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        callback: async (action, instance) => {
            if(action === 'confirm') {
                confirm()
            }
        }
    })
}
