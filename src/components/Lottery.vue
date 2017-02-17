<template>
	<div class="lottery">
		<div class="arrow" @click="start" :style="{transform: `rotate(${angle}deg)`}"></div>
	</div>
</template>

<script>
	export default {
		props: ['prizes', 'api'],
		data() {
			return {
				angle: 0,
				nums: 1,
				loaded: false
			}
		},
		methods: {
			start() {
				if(this.loaded) {
					return
				}
				if(this.nums > 3) {
					this.$emit('callback', 0, '没有次数了哦~')
					return
				}
				this.loaded = true
				const prizeLevel = ~~(Math.random() * 7)
				this.angle = 2880 * this.nums++ + this.prizes[prizeLevel][0]
				setTimeout(() => {
					this.$emit('callback', prizeLevel, this.prizes[prizeLevel][1])
					this.loaded = false
				}, 5000)
			}
		}
	}
</script>

<style lang="stylus">
	.lottery
		width 260px
		height @width
		margin 0 auto
		background url('../assets/lotterybg.png') no-repeat
		background-size cover
		display flex
		justify-content center
		align-items center
		.arrow
			width 60%
			height @width
			background url('../assets/lotteryarrow.png') no-repeat
			background-size cover
			transition transform 5s cubic-bezier(0, 0, 0.49, 1)
			transform rotate(0deg)
</style>