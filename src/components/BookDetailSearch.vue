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
                <el-input placeholder="请输入内容" v-model="searchVal" @input="searchValChange" minlength="2" @keyup.enter.native="searchResult">
                    <el-select class="book-lists-search-music-search-select" @change="searchChange" v-model="searchType" slot="prepend">
                        <el-option  
                            v-for="item in searchTypes"
                            :key="item.id"
                            :label="item.searchName"
                            :value="item.number"
                        ></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchResult"></el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue} from 'vue-property-decorator'
    import { statusTypes, checkTypes, searchTypes } from "./../until/initData";
    import { Select, Option, Input, Button } from "element-ui";
    @Component({
        components: {
            'el-select': Select,
            'el-option': Option,
            'el-input': Input,
            'el-button': Button
        }
    })
    export default class BookDeatilSearch extends Vue {
        statusType: string =  ''
        checkType: string = ''
        searchVal: string = ''
        searchType: number | string = 0
        statusTypes: Array<object> = []
        checkTypes: Array<object> = []
        searchTypes: Array<object> = []
        public created() {
            this.statusTypes = statusTypes
            this.checkTypes = checkTypes
            this.searchTypes = searchTypes
        }
        statusClear() {}
        statusChange() {}
        checkClear() {}
        checkChange() {}
        searchValChange() {}
        searchResult() {}
        searchChange() {}
    }
</script>
<style lang="less">
.book-detail-search{
    display:flex;
    .book-detail-search-type{
        display:flex;
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
    
}
    
</style>