<template>
	<div class="upload">
		<textarea placeholder="这一刻的想法..."></textarea>
		<div class="pics">
			<ul>
				<li v-for="(value, key) in piclist">
					<div class="img" @click="showDelete = !showDelete">
						<img :src="value" />
					</div>
					<div v-show="showDelete" @click="delImg(key)" class="del"><i class="iconfont icon-close"></div>
				</li>
				<li class="addpic">
					<label for="file"></label>
					<input type="file" id="file" @change="fileChange" class="fileinput">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['length', 'size'],
		data() {
			return {
				piclist: [],
				showDelete: false
			}
		},
		methods: {
			fileChange(e) {
				if(this.piclist.length == this.length) {
					alert('最多只能上传' + this.length + '张~')
					return
				}
				let file = e.target.files[0]
				if(!file) {
					return
				}
				if(!/image/.test(file.type)) {
					alert('只能上传图片哦~')
					return
				}
				if(file.size / 1024 > this.size) {
					alert('图片尺寸太大啦~')
					return
				}
				let $fileData = new FileReader()
				$fileData.readAsDataURL(file)
				$fileData.onload = data => {
					this.piclist.push(data.target.result)
					this.$emit('callback', this.piclist)
				}
			},
			delImg(key) {
				this.piclist.splice(key, 1)
				this.$emit('callback', this.piclist)
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';

	.upload
		background-color #fff
		padding 15px 10px 5px
		textarea
			width 100%
			min-height 80px
			border 0
			resize none
		.pics
			width 100%
			ul
				width 100%
				display flex
				flex-wrap wrap
				li
					width 23%
					height 90.61px
					margin-right 2.65%
					margin-bottom 8px
					position relative
					background-color #ccc
					&:nth-child(4n)
						margin-right 0
					.img
						width 100%
						height 100%
						overflow hidden
					img
						width 100%
						height @width
						object-fit cover
					.del
						position absolute
						right -7px
						top -7px
						width 20px
						height 20px
						text-align center
						border-radius 50%
						color #fff
						background-color $basebg
						.iconfont
							font-size 12px
					input
						width 100%
						height 100%
						opacity 0
					label
						position absolute
						width 100%
						height 100%
						box-sizing border-box
						border 2px solid #eee
						background-color #fff
						&:before
							content ''
							position absolute
							left 50%
							top 30%
							width 3px
							height 45%
							background #ddd
						&:after
							content ''
							position absolute
							left 28%
							top 50%
							width 45%
							height 3px
							background #ddd
						
	@media only screen and (max-width: 414px)
		.upload .pics ul li
			height 90.61px
	@media only screen and (max-width: 375px)
		.upload .pics ul li
			height 81.64px
	@media only screen and (max-width: 360px)
		.upload .pics ul li
			height 78.19px
	@media only screen and (max-width: 320px)
		.upload .pics ul li
			height 69px

</style>