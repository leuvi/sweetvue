<template>
	<layout title="rem解决方案">
		<div class="des">图片</div>
		<div class="rempic"><img src="../assets/rainbg.jpg" alt=""></div>
		<div class="des">文字</div>
		<div class="des">
			<p class="remtext">我是文字</p>
			<p class="remtext">I am the text</p>
			<p class="remtext">私が書いています</p>
			<p class="remtext">내가 쓰고 있어요</p>
			<p class="remtext">Я пишу</p>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import {rem} from '../util'

	export default {
		components: {
			Layout
		},
		created() {
			rem()
		}
	}
</script>

<style lang="stylus">
	.rempic 
		width 10rem
		height @width
		overflow hidden
		margin 1rem auto
	.remtext
		font-size .8rem
		text-align center
</style>