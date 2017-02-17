<template>
	<layout title="视差滚动" class="parallaxbox">
		<div class="scrollwrap" id="wrapper">
			<div id="scroller"></div>
		</div>
		<div class="starfield" id="starfield1">
			<div id="stars1"></div>
		</div>

		<div class="starfield" id="starfield2">
			<div id="stars2"></div>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import IScroll from '../plugins/iscroll.js'

	export default {
		components: {
			Layout
		},
		mounted() {
			let scroll = new IScroll('#wrapper', {
				mouseWheel: true,
				indicators: [{
					el: document.getElementById('starfield1'),
					resize: false,
					ignoreBoundaries: true,
					speedRatioY: 0.4
				}, {
					el: document.getElementById('starfield2'),
					resize: false,
					ignoreBoundaries: true,
					speedRatioY: 0.2
				}]
			})
		}
	}

</script>

<style lang="stylus">
	.scrollwrap
		position absolute
		z-index 3
		width 100%
		top 44px
		left 0
		bottom 0
		overflow hidden
		#scroller
			position absolute
			z-index 3
			width 100%
			height 4000px
			overflow hidden
			transform translateZ(0)
			background url(../assets/galaxies1.png)
	.starfield
		position absolute
		width 100%
		top 44px
		left 0
		bottom 0
		overflow hidden
		div
			position absolute
			width 100%
			overflow hidden
			transform translateZ(0)
	#starfield1
		z-index 2
	#stars1
		z-index 2
		height 3000px
		background url(../assets/galaxies2.png)
	#starfield2
		z-index 1
	#stars2
		z-index 1
		height 2000px
		background url(../assets/stars.jpg) #000
</style>