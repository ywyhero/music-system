<template>
    <div class="detail-title">
        <div class="detail-title-info">
            <div class="detail-title-info-left">
                <img class="detail-title-info-img" :src="detailImageUrl"/> 
            </div>
            
            <div class="detail-title-info-detail">
                <div class="detail-title-info-item">
                    <span>书本ID: {{detailInfo.bookId}}</span>   
                    <span>书名: {{detailInfo.bookName}}</span> 
                    <span>作者: {{detailInfo.author}}</span> 
                </div> 
                <div class="detail-title-info-item">
                    <span>乐器: {{detailInfo.instrumentName}}</span> 
                    <span>系列: {{detailInfo.seriesName}}</span>    
                    <span>出版社: {{detailInfo.publishHouse}}</span>    
                </div> 
                <div class="detail-title-info-item">
                    <span>乐谱数: {{detailInfo.coursesNum}}</span>    
                    <span>乐谱总页数: {{detailInfo.musicScorePageNum}}</span> 
                    <span>标签: {{detailInfo.label}}</span> 
                </div> 
            </div> 
        </div> 
        <div class="detail-title-action">
            <div class="detail-title-switch">
                <div class="detail-title-switch-tab">
                    <span class="detail-title-switch-val">ICON配置</span>
                    <el-switch
                        v-model="switchType"
                        active-color="#409EFF"
                        inactive-color="#e6e6e6"
                        @change="switchChange"
                        >
                    </el-switch>
                </div>
                <div class="detail-title-switch-main" v-show="iconShow">
                    <el-radio-group v-model="radioType" class="detail-title-switch-radios" @change="radioChange">
                        <el-radio v-for="(item, index) in radiosTypes" :key="index" :disabled="item.disabled" :label="item.id">{{item.type}}</el-radio>
                    </el-radio-group>
                </div>
            </div> 
            <el-button type="primary">添加乐谱</el-button>
        </div> 
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop} from 'vue-property-decorator'
    import { Button, Switch, RadioGroup, Radio, MessageBox } from 'element-ui'
    import { httpBookDetail } from './../config/api';
    @Component({
        components: {
            'el-button': Button,
            'el-switch': Switch,
            'el-radio-group': RadioGroup,
            'el-radio': Radio
        }
    })
    export default class BookDetailTitle extends Vue {
        @Prop(Number) bookId;
        switchType: boolean = false;
        radioType: number | null = null;
        radiosTypes: Array<object> = [];
        iconShow: boolean = false;
        preBookPath: string = '';
        endBookPath: string = '';
        detailImageUrl: string = '';
        detailInfo: any = {};
        public created() {
            this.preBookPath = this.$store.state.loginData.preBookPath
            this.endBookPath = this.$store.state.loginData.endBookPath
            this.getSwitchLists()
            this.getBookDetailInfo()
        }
        async getBookDetailInfo() {
            let { data, code } = await httpBookDetail.bookDetailInfo({
                bookId: this.bookId
            })
            this.detailInfo = data.rows[0];
            this.detailImageUrl = `${this.preBookPath}${ data.rows[0].imageUrl}${this.endBookPath}`
            this.switchType = !!this.detailInfo.isExistIcon;
            this.iconShow = !!this.detailInfo.isExistIcon;
            this.radioType = this.detailInfo.iconId;
            this.radiosTypes = this.radiosTypes.map((item) => ({
                ...item,
                disabled: false
            }))
        }
        async getSwitchLists() {
            let { data } = await httpBookDetail.getSwitchLists() 
            this.radiosTypes = data.rows
            this.radiosTypes = this.radiosTypes.map((item) => ({
                ...item,
                disabled: false
            }))
        }
        switchChange(flag: boolean) {
            if(!flag && this.detailInfo.isExistIcon) {
                MessageBox({
                    title: '提示',
                    message: '请问确定关闭ICON配置吗？',
                    confirmButtonText: '确定',
                    showCancelButton: true,
                    callback: async (action, instance) => {
                        if(action === 'confirm') {
                            this.modifyIcon(0)
                        } else if (action === 'cancel') {
                            this.switchType = true
                            this.iconShow = true
                        }
                    }
                })
            } else {
                this.iconShow = flag
            }
           
        }
        async modifyIcon(id: number) {
            let { data } = await httpBookDetail.modifyIcon({
                bookId: this.bookId,
                iconId: id
            })
            this.getBookDetailInfo()
        }
        radioChange(id: number) {
            MessageBox({
                title: '提示',
                message: '请问确定切换ICON配置吗？',
                confirmButtonText: '确定',
                showCancelButton: true,
                callback: async (action, instance) => {
                    if(action === 'confirm') {
                        this.radiosTypes = this.radiosTypes.map((item) => ({
                            ...item,
                            disabled: true
                        }))
                        this.radioType = id
                        this.modifyIcon(id)
                    } else if (action === 'cancel') {
                        this.radioType = this.detailInfo.iconId;
                    }
                }
            })
        }
    }
</script>
<style lang="less">
.detail-title{
    padding: 20px;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    .detail-title-info{
        display: flex;
        width: 70%;
        .detail-title-info-left{
            .detail-title-info-img{
                width: 120px;
                height: 150px;
                // border: 2px solid #409EFF;
                border-radius: 6px;
                margin-right: 20px;
                background: url('http://test001.pnlyy.com/bookicon.png') no-repeat center center;
                background-size: contain;
            }
        }   
        .detail-title-info-detail{
            flex: 1;
            display: flex;
            justify-content: space-between;
            .detail-title-info-item{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
        
    }
    .detail-title-action{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .detail-title-switch{
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            .detail-title-switch-tab{
                width: 150px;
                display: flex;
                justify-content: space-between;
                .detail-title-switch-val{
                    color: #4a4a4a;
                }
            }
            .detail-title-switch-main{
                flex: 1;
                display: flex;
                .detail-title-switch-radios{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    .el-radio+.el-radio{
                        margin-left: 0;
                    }
                }
            }
            
            
        }
    }
}
    
</style>