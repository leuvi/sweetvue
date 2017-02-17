<template>
	<layout title="图片上传">
		<div slot="post" class="post" :class="{disabled: disabled}" @click="postImg" >发送</div>
		<Upload ref="upload" :length="9" :size="3000" @callback="callback" />
		<div class="progress">
			<p class="bar" :style="{width: width, transition: transition}"></p>
			<p>成功上传{{aninums}}张</p>
		</div>
		<div class="des">
			<p>{{des}}</p>
			<p>length: 上传最大图片数，size: 最大图片尺寸，callback: 回调</p>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import Upload from '../components/Upload'
	let TWEEN = require('../plugins/tween')

	export default {
		data() {
			return {
				disabled: true,
				imgs: [],
				nums: 0,
				aninums: 0,
				width: 0,
				transition: '',
				des: '<Upload ref="upload" :length="2" :size="500" @callback="callback" />'
			}
		},
		components: {
			Layout,
			Upload
		},
		methods: {
			postImg() {
				if(this.disabled) {
					return
				}
				let len = this.imgs.length
				this.width = '100%'
				this.transition = `width ${len}s linear`
				this.nums = len
				//setTimeout(() => this.nums = len, len * 1000)
			},
			callback(piclist) {
				this.disabled = false
				this.imgs = piclist
				this.width = this.nums = 0
				this.transition = ''
				if(piclist.length == 0) {
					this.disabled = true
				}
			}
		},
		watch: {
			nums: function(newValue, oldValue) {
		    	let vm = this
		      	function animate (time) {
		        	requestAnimationFrame(animate)
		     		TWEEN.update(time)
		    	}
		      	new TWEEN.Tween({ tweeningNumber: oldValue })
		        	.easing(TWEEN.Easing.Quadratic.Out)
		        	.to({ tweeningNumber: newValue }, vm.imgs.length * 1500)
		        	.onUpdate(function () {
		        		vm.aninums = this.tweeningNumber.toFixed(0)
		        	})
		        	.start()
		    	animate()
		    }
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	.post
		position absolute
		right 8px
		top 7px
		padding 5px 10px
		color #fff
		font-size 16px
		&.disabled
			color rgba(255, 255, 255, .6)
	
	.progress
		background-color #fff
		margin-top 20px
		padding 10px
		.bar
			height 3px
			background-color $basebg
			margin-bottom 10px

</style>