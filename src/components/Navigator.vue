<template>
    <div class="nav flex">
        <div class="nav-menu">
            <el-menu :default-active="active"  mode="horizontal" @select="select">
                <el-menu-item index="1">乐谱列表</el-menu-item>
                <el-menu-item index="2">乐谱制定项查询</el-menu-item>
                <el-menu-item index="3">乐谱使用量查询</el-menu-item>
                <el-submenu index="4">
                    <template slot="title">其他</template>
                    <el-menu-item index="4-1">统计数据</el-menu-item>
                    <el-menu-item index="4-2">操作记录</el-menu-item>
                    <el-menu-item index="4-3">基础配置</el-menu-item>
                    <el-menu-item index="4-4">数据运维工具</el-menu-item>
                    <el-menu-item index="4-5">ICON配置</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
         <div class="nav-user flex-align-center">
            <span class="nav-user-name">{{username}}</span>
        </div>
        <div class="nav-loginout" @click="loginout">退出</div>
    </div>   
    
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {Menu, MenuItem, Submenu, Message, MessageBox} from 'element-ui'
import { httpLogin } from './../config/api'
@Component({
    components: {
        'el-menu': Menu,
        'el-menu-item': MenuItem,
        'el-submenu': Submenu

    }
})
export default class Nav extends Vue {
    active: string = "1";
    username: string = 'admin';
    public created () {
        let loginData = JSON.parse(window.sessionStorage.getItem('loginData'))
        if(loginData) {
            this.$store.state.loginData = loginData;
        }
    }
    public mounted() {
        this.username = this.$store.state.loginData.name;
    }
    select(name: string) {
        switch (name) {
        case "1":
            this.$router.push("/booklists");
            break;
        case "2":
            this.$router.push("/booklists");
            break;
        case "3":
            this.$router.push("/booklists");
            break;
        case "4":
        this.$router.push("/booklists");
        break;
        case "4-1":
            this.$router.push("/booklists");
            break;
        case "4-2":
            this.$router.push("/booklists");
            break;
        case "4-3":
            this.$router.push("/booklists");
            break;
        case "4-4":
            this.$router.push("/booklists");
            break;
        case "4-5":
            this.$router.push("/booklists");
            break;
        default:
            break;
        }
    }
    loginout(){
        MessageBox({
            title: '提示',
            message: '您确定要退出登陆吗?',
            confirmButtonText: '确定',
            showCancelButton: true,
            callback: (action, instance) => {
                if(action === 'confirm') {
                    this.modalSure()
                }
            }
        })
    }
    async modalSure() {
        let {data, code, msg} = await httpLogin.loginout();
        window.sessionStorage.removeItem('loginData');
        window.sessionStorage.removeItem('jwtToken');
            Message({
            message: '退出成功',
            type: 'success'
        })
        setTimeout(() => {
            window.location.href = '/'
        }, 3000)
    }
}
</script>
<style lang="less" scoped>
.nav{
    .nav-menu {
        flex: 1;
    }
    .nav-user{
        height: 60px;
        color: #515a6e;
        padding: 0 40px;
        border-bottom: 1px solid #dcdee2;
        .nav-user-name{
            color: #515a6e;
            font-size: 16px;
            margin-left: 5px;
        }
    }
    .nav-loginout{
        height: 60px;
        color: #515a6e;
        padding: 0 20px;
        cursor: pointer;
        line-height: 60px;
        font-size: 16px;
        border-bottom: 1px solid #dcdee2;
    }
    .nav-loginout:hover{
        color: #2d8cf0;
    }
    
}
.modal-title{
    .modal-val{
        margin-left: 5px;
    }
}
</style>
