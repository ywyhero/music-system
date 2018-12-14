<template>
    <div class="book-detail-search">
        <div class="book-detail-search-type">
            <div class="book-lists-search-music-type">
                <span class="book-lists-search-music-type-val">状态</span>
                <el-select class="book-lists-search-music-select" clearable v-model="statusType" placeholder="状态类型" @clear="statusClear" @change="statusChange">
                    <el-option
                        v-for="item in statusTypes"
                        :key="item.id"
                        :label="item.statusName"
                        :value="item.number"
                    ></el-option>
                </el-select>
            </div>
            <div class="book-lists-search-music-type">
                <span class="book-lists-search-music-type-val">审核</span>
                <el-select class="book-lists-search-music-select" clearable v-model="checkType" placeholder="审核类型" @clear="checkClear" @change="checkChange">
                    <el-option
                        v-for="item in checkTypes"
                        :key="item.id"
                        :label="item.checkName"
                        :value="item.number"
                    ></el-option>
                </el-select>
            </div>
            <div class="book-lists-search-music-type book-lists-search-music-search">
                <el-input placeholder="请输入内容" v-model="searchVal" @input="searchValChange" minlength="2" @keyup.enter.native="onSearchResult">
                    <el-select class="book-lists-search-music-search-select" @change="searchChange" v-model="searchType" slot="prepend">
                        <el-option  
                            v-for="item in detailSearchTypes"
                            :key="item.id"
                            :label="item.searchName"
                            :value="item.number"
                        ></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="onSearchResult"></el-button>
                </el-input>
            </div>
        </div>
        <div class="book-detail-search-btns">
            <el-button class="book-detail-search-download" @click="downloadBook" type="primary">下载书本文件夹</el-button>
            <el-dropdown @command="batchProcess">
                <el-button type="primary">
                    批量处理<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="checkVideo">审核所选视频</el-dropdown-item>
                    <el-dropdown-item command="deleteVideo">删除所选视频</el-dropdown-item>
                    <el-dropdown-item command="deleteCourse">删除所选乐谱</el-dropdown-item>
                    <el-dropdown-item command="putOnCourse">上架所选乐谱</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
    import { statusTypes, checkTypes, detailSearchTypes } from "./../until/initData";
    import { Select, Option, Input, Button, Dropdown, DropdownMenu, DropdownItem, MessageBox, Message } from "element-ui";
    import { Getter, Action } from 'vuex-class'
    import apiHost from './../config/config'
    import { httpBookDetail } from './../config/api'
    import { CommonMessageBox } from './../until/commonComponents'
    @Component({
        components: {
            'el-select': Select,
            'el-option': Option,
            'el-input': Input,
            'el-button': Button,
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem
        }
    })
    export default class BookDeatilSearch extends Vue {
        @Prop(Number) bookId;
        @Prop(Array) courses;
        statusType: string =  ''
        checkType: string = ''
        searchVal: string = ''
        searchType: number | string = 0
        statusTypes: Array<object> = []
        checkTypes: Array<object> = []
        detailSearchTypes: Array<object> = []
        @Action changeDetailStatusType
        @Action changeDetailCheckType
        // 1）public声明的属性和方法在类的内部和外部均能访问到。 
        // 2）protected声明的方法和属性只能在类的内部和其子类能访问。 
        // 3）private声明的方法和属性只能在其类的内部访问。
        public created() {
            this.statusTypes = statusTypes
            this.checkTypes = checkTypes
            this.detailSearchTypes = detailSearchTypes
        }
        private statusClear():void {
            this.changeDetailStatusType('')
        }
        private statusChange(id: number):void {
            this.changeDetailStatusType(id)
        }
        private checkClear(): void {
            this.changeDetailCheckType('')
        }
        private checkChange(id: number): void {
            this.changeDetailCheckType(id)
        }
        @Emit()
        onUpdate(): void {}
        @Emit()
        onSearchResult(): object {
            return {
                searchType: this.searchType,
                searchVal: this.searchVal
            }
        }
        private searchValChange(val: string) {
           this.searchVal = val
        }
        private searchChange(id: number) {
            this.searchType = id
        }
        private downloadBook(): void {
            let jwtToken = window.sessionStorage.getItem('jwtToken')
            let url =`${apiHost}/download/stream/zip?bookId=${this.bookId}&jwtToken=${jwtToken}`;
            window.open(url);
        }
        private async batchProcess(val: string) {
            let coursesIds: number[] = [];
            let videoPaths: number[] = [];
            
            this.courses.forEach((item: any) => {
                coursesIds.push(item.coursesId)
                videoPaths.push(item.videoFilePath)
            });
            if(val === 'checkVideo') {
                CommonMessageBox({
                    message:  '确认审核所选视频吗? ',
                    confirm: async () => {
                        let { data } = await httpBookDetail.auditIsCheckVideo({
                            coursesIds:  coursesIds
                        })
                        this.onUpdate()
                    }
                })
                
            } else if (val === 'deleteVideo') {
                CommonMessageBox({
                    message:  '确认删除所选视频吗? ',
                    confirm: async () => {
                        let isVideoPaths = videoPaths.every((item: any) => {
                            return item === ''
                        })
                        if(isVideoPaths) {
                            Message({
                                message: '您所选乐谱没有视频。',
                                type: 'error'
                            })
                            return
                        }
                        let { data } = await httpBookDetail.clearPublicCourseVideo({
                            courseIds:  coursesIds
                        })
                        this.onUpdate()
                    }
                })
            } else if (val === 'deleteCourse') {
                CommonMessageBox({
                    message:  '确认删除所选乐谱吗? ',
                    confirm: async () => {
                        let { data } = await httpBookDetail.deleteCoures({
                            coursesIds:  coursesIds
                        })
                        this.onUpdate()
                    }
                })
            } else if (val === 'putOnCourse') {
                CommonMessageBox({
                    message:  '确认上架所选乐谱吗? ',
                    confirm: async () => {
                        let { data } = await httpBookDetail.auditIsDeletes({
                            coursesIds:  coursesIds
                        })
                        this.onUpdate()
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.book-detail-search{
    display:flex;
    flex-direction: column;
    .book-detail-search-type{
        display:flex;
        margin-bottom: 20px;
        .book-lists-search-music-type{
            display: flex;
            align-items: center;
            margin-left: 20px;
            margin-top: 20px;
            .book-lists-search-music-select{
                // width: 150px;
            }
            .book-lists-search-music-search-select{
                width: 100px;
            }
            .book-lists-search-music-type-val{
                margin-right: 10px;
                color: #4a4a4a;
            }
        }
    }
    .book-detail-search-btns{
        padding-left: 20px;
        .book-detail-search-download{
            margin-right: 10px;
        }
    }
    
}
    
</style>