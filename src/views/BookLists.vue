<template>
	<div class="book-lists">
		<Navigator></Navigator>
		<Book-Lists-Search @search-result="searchResult"></Book-Lists-Search>
		<el-table :data="bookLists" border style="width: 100%" :height="height" :row-style="bookListStyle">
			<el-table-column  v-for="(item, index) in columns" align='center' v-if="!pathArray.includes(item.prop)" :key="index" :fixed="item.fixed" :prop="item.prop" :label="item.label"></el-table-column>
			<el-table-column v-else align="center" :key="index" :prop="item.prop" :label="item.label">
				<template slot-scope="scope">
					<div :key="index" >
						<img class="book-list-img" :src="scope.row.imageUrl" @click="priveiwImg(scope.row.imageUrl)" alt="">
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align='center'>
				<template slot-scope="scope">
					<div class="book-lists-actions">
						<el-button class="book-lists-actions-btn" @click="toBookDetail(scope.row.bookId)" type="primary" size="small">查看</el-button>
						<el-button class="book-lists-actions-btn" type="primary" @click="putBook(scope.$index, scope.row.bookId, 0)" :disabled="scope.row.isPutClick" v-show="scope.row.hasOnTheShelves === 1" size="small">上架</el-button>
						<el-button class="book-lists-actions-btn" type="primary" @click="putBook(scope.$index, scope.row.bookId, 1)" :disabled="scope.row.isPutClick" v-show="scope.row.hasOnTheShelves === 0" size="small">下架</el-button>
						<el-button class="book-lists-actions-btn" type="primary" @click="deleteClick(scope.$index, scope.row.bookId)" :disabled="scope.row.isDeleteClick" v-show="scope.row.hasOnTheShelves === 1" size="small">删除</el-button>						
						<el-dropdown @command="download(scope.row.bookId, $event)">
							<el-button class="book-lists-actions-dropdown-btn"  type="primary">
								更多<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="edit">编辑</el-dropdown-item>
								<el-dropdown-item command="image">下载图片</el-dropdown-item>
								<el-dropdown-item command="audio">下载音频</el-dropdown-item>
								<el-dropdown-item command="video">下载视频</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>	
					
				</template>
			</el-table-column>
		</el-table>
		<div class="book-lists-pagination fr">
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
		<Preview-Image :previewUrl="previewUrl"></Preview-Image>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Navigator from "./../components/Navigator.vue";
import PreviewImage from "./../components/PreviewImage.vue";
import BookListsSearch from "./../components/BookListsSearch.vue";
import { columns } from "./../until/initData";
import { httpBookLists } from "./../config/api";
import { Table, TableColumn, Select, Option, Pagination, Button, Dropdown, DropdownMenu, DropdownItem, Message, MessageBox} from "element-ui";
import {Getter, Action} from 'vuex-class'
import apiHost from './../config/config'
@Component({
	components: {
		Navigator,
		'Book-Lists-Search': BookListsSearch,
		'Preview-Image': PreviewImage,
		'el-table': Table,
		'el-table-column':TableColumn,
		'el-pagination': Pagination,
		'el-button': Button,
		'el-dropdown': Dropdown,
		'el-dropdown-item': DropdownItem,
		'el-dropdown-menu': DropdownMenu
	}
})
export default class BookLists extends Vue {
	columns: Array<object> = [];
	height: number = 600;
	currentPage: number = 1;
	total: number = 0;
	pageNum: number = 1;
	pageSize: number = 20;
	bookLists: Array<any> = [];
	pathArray: Array<string> = ["videoFilePath", "imageUrl", "musicFilePath", "imageFilePath"];
	previewUrl: string = '';
	bookId: string = '';
	bookName: string = '';
	coursesName: string = '';
	hasOnTheShelves: number = 0; // 上架还是下架   0 上架 1 下架
	@Getter getInstrumentType: number | string;
	@Getter getSeriesType: number | string;
	@Getter getStatusType: number | string;
	@Getter getVideoType: number | string;
	@Getter getAudioType: number | string;
	@Getter getCheckType: number | string;
	@Getter getIconType: number | string;
	@Action changePreviewShow: any;
	get instrumentType(): number | string {
		return this.getInstrumentType
	}	
	get seriesType(): number | string {
		return this.getSeriesType
	}	
	get statusType(): number | string {
		return this.getStatusType
	}	
	get videoType(): number | string {
		return this.getVideoType
	}
	get audioType(): number | string {
		return this.getAudioType
	}	
	get checkType(): number | string {
		return this.getCheckType
	}	
	get iconType(): number | string {
		return this.getIconType
	}	
	public created() {
		this.columns = columns;
		this.height = window.innerHeight * 0.78;
		this.getBookLists()
	}
	bookListStyle({ row }: { row: any }): any {
		if (row.hasOnTheShelves === 1) {
			return { color: "#c9c9c9" };
		}
	}
	async getBookLists() {
		let { data, code, msg } = await httpBookLists.bookLists({
			isDesc: 1,
			pageNo: this.pageNum,
			pageSize: this.pageSize,
			sortColumn: "ID",
			instrumentType: this.instrumentType,
			seriesType: this.seriesType,
			isDelete: this.statusType,
			hasVideoUplow: this.videoType,
			hasAudioUplow: this.audioType,
			isUnCheckVideo: this.checkType,
			isExistIcon: this.iconType,
			bookId: this.bookId,
			bookName: this.bookName,
			coursesName: this.coursesName,
		});
		this.total = data.count;
		this.bookLists = data.rows;
		if(this.bookLists && this.bookLists.length > 0) {
			this.bookLists = this.bookLists.map((item: any) => ({
				...item,
				isPutClick: false,
				isDeleteClick: false,
				imageUrl: `${this.$store.state.loginData.preBookPath}${item.imageUrl}${this.$store.state.loginData.endBookPath}`
			}));
		}
		
	}
	@Watch('instrumentType')
	instrumentTypeChange(newVal: number | string, oldVal: string | number) {
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('seriesType')
	seriesTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('statusType')
	statusTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('videoType')
	videoTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('audioType')
	audioTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('checkType')
	checkTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	@Watch('iconType')
	iconTypeChange(newVal: number | string, oldVal: string | number){
		this.pageNum = 1
		this.currentPage = 1
		this.getBookLists()
	}
	priveiwImg (url: string): void {
		this.previewUrl = url
		this.changePreviewShow(true)
	}
	handleSizeChange (num: number): void {
		this.pageSize = num;
		this.getBookLists();
	}
	handleCurrentChange (num: number): void {
		this.currentPage = num
		this.pageNum = num;
		this.getBookLists();
	}
	searchResult(e:any) {
		let searchType:number = e.searchType;
		let searchVal:string = e.searchVal;
		if(searchVal.length < 2) {
			Message({
				message: '请至少输入两个字符',
				type: 'error'
			})
			return
		}
		if(searchType === 0) {
			this.bookName = searchVal
			this.bookId = ''
			this.coursesName = ''
		} else if (searchType === 1) {
			this.bookName = ''
			this.bookId = searchVal
			this.coursesName = ''
		} else if (searchType === 2) {
			this.bookName = ''
			this.bookId = ''
			this.coursesName = searchVal
		}
		this.pageNum = 1
		this.getBookLists()
	}
	async putBook(index: number, id: number, isDelete: number) {
		this.bookLists[index].isPutClick = true
		let { data, code } = await httpBookLists.auditIsDelete({
			bookId: id,
			isDelete: isDelete
		}) 
		if(code === 200) {
			this.getBookLists()
		}
	}
	async deleteBook(id: number){
		let { data, code } = await httpBookLists.deleteBook({
			bookId: id
		}) 
		if(code === 200) {
			this.getBookLists()
		}
	}
	deleteClick(index: number, id: number): void {
		MessageBox({
			title: '提示',
            message: '<span>确认删除当前书本吗? </br> 提示：书本中乐谱及乐谱页的所有资料也将一并删除！</span>',
            confirmButtonText: '确定',
			showCancelButton: true,
			dangerouslyUseHTMLString: true,
            callback: (action, instance) => {
                if(action === 'confirm') {
					this.bookLists[index].isDeleteClick = true
					this.deleteBook(id)
                }
            }
		})
	}
	toBookDetail(id: string): void {
		this.$router.push({path: '/bookdetail', query: {bookId: id}});
	}
	download(bookId: number, type: string) {
		if (type === 'edit') {

		} else if (type === 'image' || type === 'audio' || type === 'video') {
			let jwtToken = window.sessionStorage.getItem('jwtToken');
			let url = `${apiHost}/download/stream/fileZip?bookId=${bookId}&status=${type}&jwtToken=${jwtToken}`;
			window.open(url);
		} 
	}
}
</script>
<style scoped lang="less">
.book-lists {
	height: 100%;
	.book-lists-pagination {
		margin: 20px 20px 20px 0;
	}
}
.book-list-color{
	color: #c9c9c9;
}
.book-list-img{
	display: inline-block;
	width: 60px;
	height: 60px;
	background: url('http://test001.pnlyy.com/bookicon.png') no-repeat center center;
	background-size: contain;
	cursor: pointer;
}
.book-lists-actions{
	display: flex;
	flex-direction: column;
	.book-lists-actions-dropdown-btn{
		width: 100%;
	}
	.book-lists-actions-dropdown-menu{
		width: 100%;
	}
	.book-lists-actions-btn{
		margin-left: 0;
		margin-bottom: 10px;
	}
}

</style>

