<template>
    <div class="book-detail">
        <Navigator></Navigator>
        <Book-Detail-Title :bookId="bookId"></Book-Detail-Title>
        <Book-Detail-Search :bookId="bookId" @on-update="listLibCourse" :courses="courses" @on-search-result="onSearchResult"></Book-Detail-Search>
        <div class="book-detail-table">
            <el-table
                :data="courseLists"
                :height="height"
                border 
                style="width: 100%"
                :row-style="rowStyle"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55"
                    align="center">
                </el-table-column>
                <el-table-column
                    v-for="(item, index) in detailCoumns"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                    v-if="!pathArray.includes(item.prop)">
                </el-table-column>
                <el-table-column
                    v-else-if="item.prop === 'videoFilePath'"
                    align="center"
                    :key="index" 
                    :prop="item.prop" 
                    :label="item.label"
                >
                    <template slot-scope="scope">
                        <div class="book-detail-table-play">
                            <i v-if="scope.row.videoFilePath && scope.row.videoCompressStatus" @click="playVideo(scope.row.coursesId, scope.row.videoFilePath)" class="el-icon-caret-right book-detail-table-play-btn"></i>
                            <span v-else-if="scope.row.videoFilePath && !scope.row.videoCompressStatus" class="el-icon-caret-right book-detail-table-play-btn">转码中</span>
                            <span v-else>-</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else-if="item.prop === 'musicFilePath'"
                    align="center"
                    :key="index" 
                    :prop="item.prop" 
                    :label="item.label"
                >
                    <template slot-scope="scope">
                        <div class="book-detail-table-play">
                            <i v-if="scope.row.musicFilePath" @click="playMusic(scope.row.musicFilePath)" class="el-icon-caret-right book-detail-table-play-btn"></i>
                            <span v-else>-</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                </el-table-column>
            </el-table>
        </div>
        <div class="book-detail-pagination fr">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[20, 30, 50, 100]"
				:page-size="20"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
        <div class="book-detail-play" v-show="isPlayShow">
            <div class="book-detail-play-main">
                <i class="el-icon-close book-detail-play-close" @click="closeDetailPlay"></i>
                <video v-if="videoPath" class="book-detail-play-video" :src="videoPath" autoplay controls></video> 
                <audio v-else class="book-detail-play-audio" :src="audioPath" autoplay controls></audio>  
            </div>
        </div> 
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import BookDetailTitle from './../components/BookDetailTitle.vue'
    import Navigator from "./../components/Navigator.vue";
    import BookDetailSearch from "./../components/BookDetailSearch.vue";
    import { httpBookDetail } from './../config/api'
    import { detailCoumns } from './../until/initData'
    import { Table, TableColumn, Pagination, Message } from 'element-ui'
    import { Getter, Action } from 'vuex-class'
    @Component({
        components: {
            Navigator,
            'Book-Detail-Title': BookDetailTitle,
            'Book-Detail-Search': BookDetailSearch,
            'el-table': Table,
            'el-table-column': TableColumn,
            'el-pagination': Pagination
        }
    })
    export default class BookDetail extends Vue {
        bookId: number = 0;
        height: number = 0;
        currentPage: number = 1;
        pageSize: number = 20;
        pageNo: number = 1;
        coursesId: number | string = '';
        coursesName: string = '';
        courseLists: Array<any> = []
        pathArray: Array<string> = ["videoFilePath", "imageUrl", "musicFilePath", "imageFilePath"];
        detailCoumns: Array<object> = []
        total: number = 0;
        isPlayShow: boolean = false;
        videoPath: string = '';
        audioPath: string = '';
        courses: object[] = [];
        @Getter getDetailStatusType
        @Getter getDetailCheckType
        get isDelete(): number | string {
            return this.getDetailStatusType
        }
        get isUnCheckVideo(): number | string {
            return this.getDetailCheckType
        }
        public created(){
            this.bookId = Number(this.$route.query.bookId);
            this.height = window.innerHeight * 0.65;
            this.detailCoumns = detailCoumns;
            this.listLibCourse()
        }
        async playVideo(id: number, path: string) {
            let { data } = await httpBookDetail.findVideoCompressStatus({
                coursesId: id
            })
            let videoPath = `${this.$store.state.loginData.bookVideoPath}${data.url}`
            this.videoPath = videoPath;
            this.isPlayShow = true
        }
        playMusic(path: string) {
            let audioPath = `${this.$store.state.loginData.preBookAudioPath}${path}`
            this.audioPath = audioPath;
            this.isPlayShow = true
        }
        async listLibCourse () {
            let { data } = await httpBookDetail.listLibCourse({
                bookId: this.bookId,
                coursesId: this.coursesId,
                coursesName: this.coursesName,
                isDelete: this.isDelete,
                isUnCheckVideo: this.isUnCheckVideo,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }) 
            this.total = data.count;
            this.courseLists = data.rows;
            // this.courseLists = this.courseLists.map((item) => ({
            //     ...item,
            //     videoFilePath: `${this.$store.state.loginData.bookVideoPath}${item.videoFilePath}`
            // }))
        }
        closeDetailPlay() {
            this.isPlayShow = false
            this.videoPath = ''
            this.audioPath  = ''
        }
        @Watch('isDelete')
        onChangeIsDelete(): void {
            this.pageNo = 1
            this.currentPage = 1
            this.listLibCourse()
        }
        @Watch('isUnCheckVideo')
        onChanegIsUnCheckVideo(): void {
            this.pageNo = 1
            this.currentPage = 1
            this.listLibCourse()
        } 
        rowStyle({ row }: { row: any }): any {
            if(row.hasOnTheShelves === 1 ) {
                return {
                    color: '#e9e9e9'
                }
            }
        }
        onSearchResult(obj: any): void {
            let searchType: number = obj.searchType;
            let searchVal: string = obj.searchVal;
            if(searchVal === '') {
                this.coursesName = ''
                this.coursesId = ''
                this.listLibCourse()
                return
            }
            if(searchVal !== '' && searchVal.length < 2) {
                Message({
                    message: '请至少输入两个字符',
                    type: 'error'
                })
                return
            }
            if(searchType === 0) {
                this.coursesName = searchVal
                this.coursesId = ''
                this.listLibCourse()
            } else if (searchType === 1) {
                this.coursesName = ''
                this.coursesId = Number(searchVal)
                this.listLibCourse()
            }
        }   
        handleSelectionChange(lists){
            this.courses = lists
        }
        handleSizeChange(num: number) {
            this.pageSize = num;
            this.listLibCourse()
        }
        handleCurrentChange(num: number) {
            this.currentPage = num
            this.pageNo = num;
            this.listLibCourse()
        }
    }
</script>
<style lang="less" scoped>
.book-detail{
    width: 100%;
    .book-detail-table{
        width: 100%;
        padding: 20px;
    }
}
.book-detail-table-play-btn{
    font-size: 20px;
    cursor: pointer;
}
.book-detail-pagination{
    padding-right: 20px;
    padding-bottom: 20px;
}
.book-detail-play{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
    .book-detail-play-main{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 40px;
        background: #fff;
        .book-detail-play-close{
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        }
        .book-detail-play-video{
            width: 800px;
        }
        .book-detail-play-audio{
        }
    }
    
}
</style>