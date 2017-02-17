<template>
	<div class="sliderwrap">
		<div class="slider">
			<div class="slidertrack" :style="{width: width + '%'}"></div>
			<div class="sliderhandler" 
				@touchstart="start($event)" 
				@touchmove.prevent="move($event)"
				:style="{left: left + '%'}"
			>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['min', 'max', 'step', 'value'],
		data() {
			return {
				width: 0,
				left: 0,
				MIN: parseInt(this.min) || 0,
				MAX: parseInt(this.max) || 100,
				STEP: parseInt(this.step) || 1,
				VALUE: parseInt(this.value) || 0,
				startLeft: 0,
				startX: 0
			}
		},
		created() {
			let values = []
			for(let i = 0; i <= this.MAX - this.MIN, this.VALUE - i >= this.MIN; i += this.STEP) {
				values.push(this.VALUE - i)
			}
			for(let i = 0; i <= this.MAX - this.MIN, this.VALUE + i <= this.MAX; i += this.STEP) {
				values.push(this.VALUE + i)
			}
			this.result = this.VALUE
			this.values = Array.from(new Set(values.sort((a, b) => a - b)))
		},
		mounted() {	
			this.sliderWidth = document.querySelector('.slider').offsetWidth
			this.width = this.left = Math.ceil(100 / (this.MAX - this.MIN) * (this.VALUE - this.MIN))
		},
		methods: {
			start(e) {
				this.startLeft = this.left * this.sliderWidth / 100
				this.startX = e.changedTouches[0].pageX
			},
			move(e) {
				let dist = this.startLeft + e.changedTouches[0].pageX - this.startX, value

				dist = dist < 0 ? 0 : dist > this.sliderWidth ? this.sliderWidth : dist
				this.left = this.width = Math.ceil(dist / this.sliderWidth * 100)
				value = Math.ceil(dist / this.sliderWidth * (this.MAX - this.MIN)) + this.MIN
				this.result = this.values.includes(value) ? value : this.result
				this.$emit('callback', this.result)
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	.sliderwrap
		margin 0 15px
		height 28px
		user-select none
		.slider
			position relative
			height 2px
			background-color #eee
			.slidertrack
				height 2px
				background-color $basebg
				width 0
			.sliderhandler
				position absolute
				left 0
				top 50%
				width 28px
				height @width
				margin-left -(@width/2)
				margin-top -(@width/2)
				border-radius 50%
				background-color #fff
				box-shadow 0 0 4px rgba(0, 0, 0, .4)
</style>