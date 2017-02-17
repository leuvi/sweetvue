<template>
	<div class="totop" @click="_moveTo(top)" :class="{show: isShow}"><i class="iconfont icon-less"></div>
</template>

<script>
	export default {
		props: ['pos', 'time'],
		data() {
			return {
				top: 0,
				isShow: false
			}
		},
		mounted() {
			window.addEventListener('scroll', () => {
				this.top = Math.max(window.pageYOffset, document.body.scrollTop)
				this.top > this.pos ? this.isShow = true : this.isShow = false
			})
		},
		methods: {
			_moveTo(top) {
				const start = Date.now()
				let _animate = () => {
					let now = +new Date
					let fraction = (now - start) / this.time
					if(fraction < 1){
						window.scrollTo(0, top * (1 - fraction))
						setTimeout(_animate, 5)
					}else{
						window.scrollTo(0, 0)
					}
				}
				_animate()
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	.totop
		position fixed
		right 15px
		bottom 40px
		z-index 1000
		width 40px
		height 40px
		line-height @height
		border-radius 5px
		color #ccc
		text-align center
		background $basebg
		color #fff
		opacity 0
		visibility hidden
		$transition()
		&.show
			opacity 1
			visibility visible
		.iconfont
			font-size 26px
		
</style>