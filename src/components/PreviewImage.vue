<template>
    <div class="preview-img" v-show="previewShow" @click="closePreview">
		<img class="preview-img-main" :src="previewUrl"/>	
	</div>
</template>
<script lang='ts'>
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { Getter, Action} from 'vuex-class'
    @Component
    export default class PreviewImage extends Vue {
        @Prop(String) previewUrl: string;
        @Getter getPreviewShow: boolean;
        @Action changePreviewShow: any;
        get previewShow(): boolean {
            return this.getPreviewShow
        }
        closePreview():void {
            this.changePreviewShow(false)
        }
    }
</script>
    
   
<style lang="less" scoped>
.preview-img{
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.5);
	.preview-img-main{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>