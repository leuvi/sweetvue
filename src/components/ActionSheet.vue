<template>
	<div class="actionsheet">
		<div class="actionbox" :class="{show: isShow, trans: isTrans}">
			<ul>
				<li v-for="list in actiondata" @click="callback(list.id, list.name)">
					<i class="iconfont icon-selected"></i>{{list.name}}
				</li>
			</ul>
		</div>
		<div class="mask" :class="{show: isShow}" @click="leave"></div>
	</div>
</template>

<script>
	export default {
		props: ['actiondata'],
		data() {
			return {
				isShow: false,
				isTrans: false
			}
		},
		methods: {
			callback(id, name) {
				this.leave()
				this.$emit('callback', id, name)
			},
			enter() {
				this.isShow = !this.isShow
				setTimeout(() => this.isTrans = !this.isTrans, 100)
			},
			leave() {
				this.isTrans = !this.isTrans
				setTimeout(() => this.isShow = !this.isShow, 200)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../vars.styl';

	.actionbox
		position absolute
		left 0
		bottom 0
		width 100%
		z-index 100
		min-height 200px
		background #fff
		transition transform .2s ease-out
		transform translate3d(0, 100%, 0)
		display none
		&.trans
			transform translate3d(0, 0, 0)
			min-height initial
		&.show
			display block
			
		li
			width 100%
			height 44px
			line-height @height
			font-size 15px
			border-bottom 1px solid #eee
			box-sizing border-box
			padding-left 1em
			position relative
			color #666
			$transition()
			&:last-child 
				border 0
			&.on,&:active
				color $basebg
			.iconfont
				font-size 18px
				vertical-align middle
				margin-right 10px
	.mask
		background rgba(0, 0, 0, 0.5)
		position fixed
		top 0
		left 0
		z-index 99
		width 100%
		height 100%
		opacity 0
		visibility hidden
		$transition()
		&.show
			opacity 1
			visibility visible
	
</style>