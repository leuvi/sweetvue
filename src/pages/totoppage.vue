<template>
	<layout title="回到顶部">
		<div class="des">
			<p>滑动到某一位置出现回到顶部按钮</p>
			<p>{{des}}</p>
			<p>pos: 滚动条位置， time: 动画时间</p>
		</div>
		<div class="infocont"><div v-html="infos"></div></div>
		<totop pos="500" time="200"></totop>
	</layout>
</template>

<script>
	import Layout from './main'
	import Totop from '../components/Totop'
	import {list1} from '../api'
	import {getJSON} from '../util'

	export default {
		data() {
			return {
				infos: '',
				des: '<totop pos="500" time="200"></totop>'
			}
		},
		components: {
			Layout,
			Totop
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				getJSON(list1).then(data => {
					this.infos = data.content.repeat(8)
				})
			}
		}
	}
</script>

<style lang="stylus">
	@font-face
		font-family myfont
		src local('Impact')
		unicode-range U+56
	.infocont
		padding 15px
		font-family myfont
		hyphens auto
		p
			margin-bottom 10px
			line-height 30px
			font-size 16px
</style>