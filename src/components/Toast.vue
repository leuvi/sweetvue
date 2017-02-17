<template>
	<transition :name="name">
		<div v-if="config.pos == 'top'" class="toptoast" ontouchmove="return false">
			<div class="inner" :class="config.type">
				<span v-if="config.type == 'load'" class="load"></span>{{config.text}}
			</div>
		</div>
		<div v-if="config.pos == 'bottom'" class="bottomtoast" ontouchmove="return false">
			<div class="inner" :class="config.type">
				<span v-if="config.type == 'load'" class="load"></span>{{config.text}}
			</div>
		</div>
		<div v-if="!config.pos" class="centertoast" :class="{top: top}" ontouchmove="return false">
			<div class="inner">
				<span v-if="config.type == 'load'" class="loading"></span>
				<span v-if="config.type == 'success'" class="success">
					<i class="iconfont icon-success">
				</span>
				<span v-if="config.type == 'error'" class="error">
					<i class="iconfont icon-wrong">
				</span>
				<p>{{config.text}}</p>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['config'],
		data() {
			return {
				name: this.config.pos ? this.config.pos : 'fade',
				top: this.config.top ? true : false
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../vars.styl';
	
	.centertoast
		position fixed
		left 0
		top 0
		width 100%
		height 100%
		display flex
		justify-content center
		align-items center
		&.top
			align-items flex-start
			padding-top 25%
		.inner
			background-color rgba(0, 0, 0, .7)
			color #fff
			padding 10px 15px
			border-radius 5px
			text-align center
			span
				height 40px
				display block
				margin-bottom 5px
				overflow hidden
				.iconfont
					font-size 36px
	.fade-enter-active,.fade-leave-active
		transition opacity .3s linear
	.fade-enter,.fade-active
		opacity 0
		
	.toptoast,.bottomtoast
		position fixed
		left 0
		top 0
		width 100%
		height 100%
		.inner
			width 100%
			height 22px
			line-height 22px
			text-indent .5em
			background-color #1eb500
			color #fff
			font-size 12px
			transform translate3d(0, 0, 0)
			&.error
				background-color #f30
			span
				width 12px
				height 12px
				display inline-block
				margin-right 5px
				position relative
				&:before
					content ''
					position absolute
					z-index 100
					top 50%
					left 50%
					width 10px
					height 10px
					margin-left -(@width / 2)
					margin-top -(@height / 2)
					pointer-events none
					border 1px solid #eee
					border-right-color $basebg
					border-radius 50%
					animation rotateCircle .8s linear infinite forwards
	@keyframes rotateCircle
		to
			transform rotate(360deg)
	.bottomtoast .inner
		position absolute
		bottom 0
	.top-enter-active
		animation topin .5s
	.top-leave-active
		animation topout .5s
	@keyframes topin
		0%
			transform translate3d(0, -22px, 0)
		100%
			transform translate3d(0, 0, 0)
	@keyframes topout
		0%
			transform translate3d(0, 0, 0)
		100%
			transform translate3d(0, -22px, 0)
	.bottom-enter-active
		animation bottomin .5s
	.bottom-leave-active
		animation bottomout .5s
	@keyframes bottomin
		0%
			transform translate3d(0, 22px, 0)
		100%
			transform translate3d(0, 0, 0)
	@keyframes bottomout
		0%
			transform translate3d(0, 0, 0)
		100%
			transform translate3d(0, 22px, 0)

</style>