<template>
	<layout title="倒计时">
		<div class="des">
			<p>距离劳动节还有</p>
		</div>
		<div class="des">
			<p>{{des}}</p>
		</div>
		<Countdown endtime="2017-04-30 23:59:59" @callback="callback" />
		<dialog-component />
	</layout>
</template>

<script>
	import Layout from './main'
	import Countdown from '../components/Countdown'
	import DialogComponent from '../components/Dialog'

	export default {
		data() {
			return {
				des: '<Countdown endtime="2017-04-30 23:59:59" @callback="callback" />'
			}
		},
		components: {
			Layout,
			Countdown,
			DialogComponent
		},
		methods: {
			callback() {
				alert({
					title: '(⊙ｏ⊙)',
					content: '倒计时完成！'
				})
			}
		}
	}
</script>