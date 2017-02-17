<template>
	<layout title="下雪啦">
		<div class="sebg">
			<Snow />
		</div>
		<div class="des deseffect">
			<p>调用方法：{{des}}</p>
			<p>strength: 强度(large, medium, small)</p>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import Snow from '../components/Snow'

	export default {
		data() {
			return {
				des: '<Snow strength="small" />'
			}
		},
		components: {
			Layout,
			Snow
		}
	}
</script>

<style lang="stylus">
	.sebg
		width 100%
		height calc(100% - 44px) 
		overflow hidden
		position absolute
		background url('../assets/snowbg.jpg') no-repeat
		background-size cover
	.deseffect
		position absolute
		left 0
		right 0
</style>