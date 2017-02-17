<template>
	<layout title="404">
		<div class="errorpage" ontouchmove="return false">
			<div :class="{blur: blur}" class="codebg"></div>
			<p @click="blur = !blur">404</p>
		</div>
	</layout>
</template>
<script>
	import Layout from './main'
	export default {
		data() {
			return {
				blur: true
			}
		},
		components: {
			Layout
		}
	}
</script>
<style lang="stylus" scoped>
	@import '../vars.styl';
	.errorpage
		$fullpage(44px)
		$center()
		overflow hidden
		.codebg
			$transition()
			$fullpage()
			z-index 1
			background url(../assets/404.png) no-repeat
			&.blur
				will-change transform
				filter blur(3px)
				transform scale(1.05)
		p
			font-size 64px
			color #272822
			font-family 'AvenirNext-HeavyItalic'
			padding 10px 20px
			line-height 64px
			background-color rgba(255, 255, 255, .5)
			position relative
			z-index 10
			border-radius 50px
</style>