<template>
	<layout title="CityPicker">
		<div class="des">
			<p>{{des}}</p>
			<p>ref: 子组件名称，api: 城市接口数据，可缓存到本地，callback: 回调</p>
		</div>
		<div class="des">
			<p class="btn" @click="select1">出发城市：{{city1}}</p>
		</div>
		<div class="des">
			<p class="btn" @click="select2">到达城市：{{city2}}</p>
		</div>
		<CityPicker ref="city1" api="/CityPicker" @callback="callback1" />
		<CityPicker ref="city2" api="/CityPicker" @callback="callback2" />
	</layout>
</template>

<script>
	import Layout from './main'
	import CityPicker from '../components/CityPicker'


	export default {
		data() {
			return {
				isshow: false,
				city1: '选择城市',
				city2: '选择城市',
				des: '<CityPicker ref="city" api="/CityPicker" @callback="callback" />'
			}
		},
		components: {
			Layout,
			CityPicker
		},
		methods: {
			select1() {
				this.$refs.city1.modalshow = true
			},
			select2() {
				this.$refs.city2.modalshow = true
			},
			callback1(city, id) {
				this.city1 = city
				console.log(city, id)
			},
			callback2(city, id) {
				this.city2 = city
				console.log(city, id)
			}
		}
	}
</script>