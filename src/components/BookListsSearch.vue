<template>
    <div class="book-lists-search">
        <div class="book-lists-search-music-type">
            <span class="book-lists-search-music-type-val">乐器</span>
            <el-select class="book-lists-search-music-select" v-model="musicType" clearable placeholder="乐器类型" @clear="musicTypeClear" @change="musicTypeChange">
                <el-option
                    v-for="item in musicTypes"
                    :key="item.id"
                    :label="item.instrumentName"
                    :value="item.number"
                ></el-option>
            </el-select>
        </div>
        <div class="book-lists-search-music-type">
            <span class="book-lists-search-music-type-val">系列</span>
            <el-select class="book-lists-search-music-select" clearable v-model="seriesType" @clear="seriesClear" placeholder="系列类型" @change="seriesChange">
                <el-option
                    v-for="item in bookSeriesList"
                    :key="item.id"
                    :label="item.bookSeriesName"
                    :value="item.number"
                ></el-option>
            </el-select>
        </div>
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
            <span class="book-lists-search-music-type-val">视频</span>
            <el-select class="book-lists-search-music-select" clearable v-model="videoType" placeholder="视频类型" @clear="videoClear" @change="videoChange">
                <el-option
                    v-for="item in videoTypes"
                    :key="item.id"
                    :label="item.videoName"
                    :value="item.number"
                ></el-option>
            </el-select>
        </div>
        <div class="book-lists-search-music-type">
            <span class="book-lists-search-music-type-val">音频</span>
            <el-select class="book-lists-search-music-select" clearable v-model="audioType" placeholder="音频类型" @clear="audioClear" @change="audioChange">
                <el-option
                    v-for="item in audioTypes"
                    :key="item.id"
                    :label="item.audioName"
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
        <div class="book-lists-search-music-type">
            <span class="book-lists-search-music-type-val">配置</span>
            <el-select class="book-lists-search-music-select" clearable v-model="iconType" placeholder="ICON配置" @clear="iconClear" @change="iconChange">
                <el-option
                    v-for="item in iconTypes"
                    :key="item.id"
                    :label="item.iconName"
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
                        :value="item.number"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchResult"></el-button>
            </el-input>
        </div>
    </div>
   
</template>
<script lang="ts">
import { Component, Vue, Emit} from 'vue-property-decorator'
import { httpBookLists } from "./../config/api";
import { Select, Option, Input, Button } from "element-ui";
import { Getter, Action } from "vuex-class";
import { statusTypes, videoTypes, audioTypes, checkTypes, iconTypes, searchTypes } from "./../until/initData";

@Component({
    components: {
		'el-select': Select,
        'el-option': Option,
        'el-input': Input,
        'el-button': Button
	}
})
export default class BookListsSearch extends Vue {
    musicTypes: Array<object> = []
    bookSeriesList: Array<object> = []
    statusTypes: Array<object> = []
    videoTypes: Array<object> = []
    audioTypes: Array<object> = []
    checkTypes: Array<object> = []
    iconTypes: Array<object> = []
    searchTypes: Array<object> = []
    musicType: number | string = '';
    seriesType: number | string = '';
    statusType: number | string = '';
    videoType: number | string = '';
    audioType: number | string = '';
    checkType: number | string = '';
    iconType: number | string = '';
    searchType: number | string = 0;
    searchVal: string = '';
    @Action changeInstrumentType: any;
    @Action changeSeriesType: any;
    @Action changeStatusType: any;
    @Action changeVideoType: any;
    @Action changeAudioType: any;
    @Action changeCheckType: any;
    @Action changeIconType: any;
    public created() {
        this.statusTypes = statusTypes
        this.videoTypes = videoTypes
        this.audioTypes = audioTypes
        this.checkTypes = checkTypes
        this.iconTypes = iconTypes
        this.searchTypes = searchTypes
        this.getBaseNames()
    }
    async getBaseNames() {
		let {data, code , msg} = await httpBookLists.getBaseNames();
		this.musicTypes = data.instrumentList
		this.bookSeriesList = data.bookSeriesList
    }
    musicTypeChange(id: number) {
        this.changeInstrumentType(id)
    }
    musicTypeClear() {
        this.changeInstrumentType('')
    }
    seriesChange(id: number) {
        this.changeSeriesType(id)
    }
    seriesClear() {
        this.changeSeriesType('')
    }
    statusChange(id: number) {
        this.changeStatusType(id)
    }
    statusClear() {
        this.changeStatusType('')
    }
    videoChange(id: number){
        this.changeVideoType(id)
    }
    videoClear() {
        this.changeVideoType('')
    }
    audioChange(id: number){
        this.changeAudioType(id)
    }
    audioClear(){
        this.changeAudioType('')
    }
    checkChange(id: number){
        this.changeCheckType(id)
    }
    checkClear(){
        this.changeCheckType('')
    }
    iconChange(id: number){
        this.changeIconType(id)
    }
    iconClear(){
        this.changeIconType('')
    }
    searchValChange(val: string) {
        this.searchVal = val
    }
    searchChange(id: number) {
        this.searchType = id
    }
    @Emit()
    searchResult(searchType: number, searchVal: string): object {
        return {
            searchType: this.searchType,
            searchVal: this.searchVal
        }
    }
}
     
</script>
<style lang="less" scoped>
.book-lists-search{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 20px 0;
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
    .book-lists-search-music-search{
        width: 502px;
    }
}

</style>