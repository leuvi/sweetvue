<template>
	<layout title="无限滚动">
		<div class="i-demo" id="scroll-infinite">
			<div class="i-scroll-inner">
				<ul>
					<li class="row" v-for="row in 30"></li>
				</ul>
			</div>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import IScroll_infinite from '../plugins/iscroll-infinite.js'
	import {getJSON} from '../util'

	export default {
		components: {
			Layout
		},
		mounted() {
			let infinitescroll = new IScroll_infinite('#scroll-infinite', {
				infiniteElements: '#scroll-infinite .row',
				dataFiller: function(el, data) {
					el.innerHTML = data
				},
				dataset: function(start, count) {
					getJSON('http://www.sweetui.com/demo/api/dataset.php?start=' + +start + '&count=' + +count)
					.then(data => {
						infinitescroll.updateCache(start, data)
						//console.log(infinitescroll.infiniteCache)
					})
				},
				cacheSize: 1000
			})
		}
	}
</script>

<style lang="stylus">
	.i-demo
		width 100%
		height calc(100% - 44px)
		position absolute
		left 0
		top 44px
		overflow hidden
		.i-scroll-inner
			width 100%
			position absolute
			z-index 1
			touch-action none
			transform translateZ(0)
			ul
				width 100%
				position relative
				li
					width 100%
					height 40px
					line-height @height
					padding 0 15px
					border-top 1px solid #fff
					border-bottom 1px solid #eee
					background-color #fff
					position absolute
					top 0
					left 0
					transform translateZ(0)
</style>