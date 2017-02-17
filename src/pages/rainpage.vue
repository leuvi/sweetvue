<template>
	<layout title="下雨啦">
		<div class="rebg">
			<Rain />
		</div>
		<div class="des deseffect">
			<p>调用方法：{{des}}</p>
			<p>strength: 强度(large, medium, small)</p>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import Rain from '../components/Rain'

	export default {
		data() {
			return {
				des: '<Rain strength="small" />'
			}
		},
		components: {
			Layout,
			Rain
		}
	}
</script>

<style lang="stylus">
	.rebg
		width 100%
		height calc(100% - 44px) 
		overflow hidden
		position absolute
		background url('../assets/rainbg.jpg') no-repeat
		background-size cover
	.deseffect
		position absolute
		left 0
		right 0
</style>