<template>
  <div class="login flex">
        <div class="login-main flex-center">
            <img src="./../assets/images/logo.png" class="login-logo"/>
            <span class="login-title">乐谱管理系统</span>
			<el-input
			 	class="login-input"
				placeholder="请输入姓名"
				v-model="userName"
				clearable>
			</el-input>
			<el-input
			 	class="login-input"
				placeholder="请输入密码"
				type="password"
				v-model="userPassword"
				clearable>
			</el-input>
			<el-button :disabled="btnDisabled" type="primary" @click="login" class="login-btn" :loading="loading">{{loginVal}}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Input, Button, Message} from 'element-ui';
import { httpLogin } from "./../config/api";
@Component({
	components: {
		'el-input': Input,
		'el-button': Button
	}
})
export default class Login extends Vue {
	loginVal:string = "登陆"
	loading:boolean = false
	btnDisabled:boolean = false
	userName: string = '';
    userPassword: string = '';
	async login() {
        try {
            if(this.userName === '') {
                Message({
                    message: '用户名不能为空',
          			type: 'warning'
                });
                return
            }
            if(this.userPassword === '') {
                Message({
                    message: '密码不能为空',
                    type: 'warning'
                });
                return
            }
			this.loading = true
			this.loginVal = '登陆中...'
            let {data, headers} = await httpLogin.login({
                username: this.userName,
                password: this.userPassword
            })
			this.loading = false
			this.loginVal = '登陆'
			this.btnDisabled = true
            let jwtToken = headers['Jwt-Token'] || headers['jwt-token'];
            window.sessionStorage.setItem('loginData', JSON.stringify(data.data));
            window.sessionStorage.setItem('jwtToken', jwtToken);
            Message({
                message: '登陆成功',
				type: 'success',
				onClose: () => {
					this.btnDisabled = false
					this.$router.replace('/booklists')
				}
            })
           
        } catch (err) {
            this.loading = false
        }
       
    }
}
</script>

<style lang="less">
.login {
    width: 100%;
    height: 100%;
    background: #3e4454;
    justify-content: center;
    align-items: flex-start;
    padding-top: 300px;
    .login-main{
        flex-direction: column;
        .login-logo {
            width: 110px;
            height: 110px;
        }
        .login-title{
            font-size: 24px;
            color: #fff;
            margin-top: 20px;
        }
        .login-input{
            margin-top: 20px;
            width: 350px;
            height: 40px;
            line-height: 40px;
        }
        .login-btn{
            background: #fd5e02;
            width: 350px;
            height: 48px;
            color: #fff;
            font-size: 20px;
            border-color: transparent;
            margin-top: 40px;
        }
    }
    
}
</style>
