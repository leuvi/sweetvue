<template>
	<layout title="进度条">
		<div class="des">直线型</div>
		<div class="progressdes">
			<x-progress :lineConfig="line1">
		</div>
		<div class="des" @click="fn1">点我 {{line2.percent}}%</div>
		<div class="progressdes">
			<x-progress :lineConfig="line2">
		</div>
		<div class="des" @click="fn2">点我 {{line3.percent}}%</div>
		<div class="progressdes">
			<x-progress :lineConfig="line3">
		</div>
		<div class="des">圆形</div>
		<div class="progressdes">
			<x-progress type="circle" :circleConfig="circle1">
		</div>
		<div class="des" @click="fn3">点我 {{circle2.percent}}%</div>
		<div class="progressdes">
			<x-progress type="circle" :circleConfig="circle2">
		</div>
		<div class="des" @click="fn4">点我 {{circle3.percent}}%</div>
		<div class="progressdes">
			<x-progress type="circle" :circleConfig="circle3">
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import XProgress from '@/XProgress'

	export default {
		data() {
			return {
				line1: {
					height: 2,
					percent: 0
				},
				line2: {
					height: 6,
					percent: 0
				},
				line3: {
					height: 10,
					percent: 0
				},
				circle1: {
					width: 50,
					stroke: 4,
					innerColor: '#eee',
					outerColor: '#ff5823',
					percent: 0
				},
				circle2: {
					width: 80,
					stroke: 6,
					innerColor: '#eee',
					outerColor: '#ff5823',
					percent: 0
				},
				circle3: {
					width: 110,
					stroke: 8,
					innerColor: '#eee',
					outerColor: '#ff5823',
					percent: 1
				}
			}
		},
		components: {
			Layout,
			XProgress
		},
		mounted() {
			setTimeout(() => {
				this.line1.percent = 50
				this.circle1.percent = 60
			}, 1000)
		},
		methods: {
			fn1() {
				let timer = setInterval(() => {
					if(this.line2.percent == 100) {
						clearInterval(timer)
						return
					}
					this.line2.percent += 1
				}, 50)
			},
			fn2() {
				this.line3.percent = 100
			},
			fn3() {
				let timer = setInterval(() => {
					if(this.circle2.percent == 100) {
						clearInterval(timer)
						return
					}
					this.circle2.percent += 1
				}, 50)
			},
			fn4() {
				this.circle3.percent = 100
			}
		}
	}
</script>

<style lang="stylus">
	.progressdes
		background-color #fff
		padding 10px 15px
		margin-top 10px
</style>