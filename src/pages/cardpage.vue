<template>
	<layout title="刮刮卡">
		<div class="des">
			<p>{{des}}</p>
			<p>url: 刮奖接口</p>
		</div>
		<Card />
	</layout>
</template>

<script>
	import Layout from './main'
	import Card from '../components/Card'

	export default {
		data() {
			return {
				des: '<Card :api="url" />'
			}
		},
		components: {
			Layout,
			Card
		}
	}
</script>
