<template>
	<layout title="DatePicker">
		<div class="des">
			<p>{{des}}</p>
			<p>callback: 回调操作，months: 可选择的月数，ref: 子组件，rid: 关联ID和子组件名称一样即可</p>
		</div>
		<div class="des">
			<p @click="select1">你选择的是：<span class="btn">{{initDate1}}</span></p>
		</div>
		<DatePicker @callback="showdate1" :months="6" ref="start1" rid="start1" />
		<div class="des">
			<p @click="select2">你选择的是：<span class="btn">{{initDate2}}</span></p>
		</div>
		<DatePicker @callback="showdate2" :months="12" ref="start2" rid="start2" />
		<div class="des">
			<p><p>该时间插件适合未来短时间内的日期选择，比如机票预定、车票预定、保险投保、酒店预定等特殊场合</p></p>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import DatePicker from '../components/DatePicker'

	export default {
		data() {
			return {
				initDate1: '选择日期',
				initDate2: '选择日期',
				des: '<DatePicker @callback="showdate" months="12" ref="start" rid="start" />'
			}
		},
		components: {
			Layout,
			DatePicker
		},
		methods: {
			select1() {
				this.$refs.start1.enter()
			},
			showdate1(date) {
				this.initDate1 = date
			},
			select2() {
				this.$refs.start2.enter()
			},
			showdate2(date) {
				this.initDate2 = date
			}
		}
	}
</script>