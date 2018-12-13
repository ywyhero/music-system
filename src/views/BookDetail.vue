<template>
    <div class="book-detail">
        <Navigator></Navigator>
        <Book-Detail-Title :bookId="bookId"></Book-Detail-Title>
        <Book-Detail-Search :bookId="bookId"></Book-Detail-Search>
    </div>
</template>
<script lang="ts">
    import { Component, Vue} from 'vue-property-decorator'
    import BookDetailTitle from './../components/BookDetailTitle.vue'
    import Navigator from "./../components/Navigator.vue";
    import BookDetailSearch from "./../components/BookDetailSearch.vue";
    @Component({
        components: {
            Navigator,
            'Book-Detail-Title': BookDetailTitle,
            'Book-Detail-Search': BookDetailSearch
        }
    })
    export default class BookDetail extends Vue {
        bookId: number = 0;
        public created(){
            this.bookId = Number(this.$route.query.bookId);
        }
        
    }
</script>
<style lang="less">
</style>