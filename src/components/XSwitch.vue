<template>
	<input type="checkbox" class="switch" @change="getValue" v-model="value">
</template>

<script>
	export default {
		props: ['open'],
		data() {
			return {
				value: this.open
			}
		},
		methods: {
			getValue() {
				this.$emit('callback', this.value)
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	.switch
		position relative
		width 52px
		height 30px
		border 1px solid #dfdfdf
		outline none
		border-radius 16px
		box-sizing border-box
		background-color #dfdfdf
		transition background-color .1s, border .1s
		&:before
			content ''
			position absolute
			top 0
			left 0
			width 50px
			height 28px
			border-radius 15px
			background-color #fdfdfd
			transition transform .35s cubic-bezier(0.45, 1, 0.4, 1)
		&:after
			content ''
			position absolute
			top 0
			left 0
			width 28px
			height 28px
			border-radius 15px
			background-color #fff
			box-shadow 0 1px 3px rgba(0, 0, 0, 0.4)
			transition transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35)
		&:checked
			border-color $basebg
			background-color $basebg
			&:before
				transform scale(0)
			&:after
				content ''
				transform translateX(21px)
</style>