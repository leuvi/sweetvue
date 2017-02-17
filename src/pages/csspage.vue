<template>
	<layout title="CSS特效集合">
		<div class="des">滚动提示</div>
		<div class="exhibition">
			<ul class="scrollarea">
				<li v-for="num in 20">{{num}}</li>
			</ul>
		</div>
		<div class="des">范围控制</div>
		<div class="exhibition">
			<div class="imgslider">
				<div>
					<img :style="{webkitClipPath: clip}" src="../assets/s2.png">
				</div>
				<img src="../assets/s2.png">
			</div>
			<x-slider min="0" max="100" step="1" :value="silerWidth" @callback="getSlider">
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import XSlider from '@/XSlider'

	export default {
		data() {
			return {
				silerWidth: 50,
				clip: `inset(0 50% 0 0)`
			}
		},
		components: {
			Layout,
			XSlider
		},
		methods: {
			getSlider(value) {
				this.silerWidth = value
				this.clip = `inset(0 ${100 - value}% 0 0)`
			}
		}
	}
</script>

<style lang="stylus">
	.exhibition
		padding .8em 1em
		background-color #fff
		.sliderwrap
			margin -25px auto 0
	.scrollarea {
		overflow: hidden;
    	overflow-y: auto;
		//-webkit-overflow-scrolling: touch;
		height: 10em;
		padding: .3em .5em;
		border: 1px solid #ddd;
		background: linear-gradient(white 10px, hsla(0,0%,100%,0)) 0 0 / 100% 50px,
		            radial-gradient(at top, rgba(0,0,0,.2), transparent 70%) 0 0 / 100% 10px,
		            linear-gradient(to top, white 10px, hsla(0,0%,100%,0)) bottom / 100% 50px,
		            radial-gradient(at bottom, rgba(0,0,0,.2), transparent 70%) bottom / 100% 10px;
		background-repeat: no-repeat;
		background-attachment: local, scroll, local, scroll;
	}
	.imgslider
		position relative
		display inline-block
		div
			position absolute
			left 0
			top 0
			bottom 0
			width 100%
			overflow hidden
			img
				position absolute
				height 100%
				filter sepia(.8)
		img
			display block
</style>