<template>
	<layout title="ActionSheet">
		<div class="des">
			<p>{{des}}</p>
			<p>actiondata: 数据源，ref: 子组件名称， callback: 子组件选择后的回调事件</p>
		</div>
		<div class="des">
			<p>静态数据</p>
			<p @click="open1">您选择的是：<span class="btn">{{name1}}</span></p>
		</div>
		<action-sheet
			:actiondata="lists1" 
			ref="action1" 
			@callback="show1"
		>
		</action-sheet>
		<div class="des">
			<p>动态数据</p>
			<p @click="open2">您选择的是：<span class="btn">{{name2}}</span></p>
		</div>
		<action-sheet
			:actiondata="lists2" 
			ref="action2" 
			@callback="show2"
		>
	</layout>
</template>

<script>
	import Layout from './main.vue'
	import ActionSheet from '@/ActionSheet'
	import {list2} from '~/api'
	import {getJSON} from '~/util'

	export default {
		data() {
			return {
				des: '<action-sheet :actiondata="lists" ref="action" @callback="show" />',
				name1: '点我选择',
				name2: '点我选择',
				showAction1: false,
				lists1: [
					{id: 1, name: 'Apple'},
					{id: 2, name: 'Google'},
					{id: 3, name: 'SpaceX'},
					{id: 4, name: 'Amazon'},
					{id: 5, name: 'Facebook'}
				],
				lists2: ''
			}
		},
		components: {
			Layout,
			ActionSheet
		},
		methods: {
			open1() {
				this.$refs.action1.enter()
			},
			open2() {
				this.name2 = '正在加载数据..'
				this.$refs.action2.enter()
				getJSON(list2).then(data => {
					this.lists2 = data.map(value => {
						return {
							name: value
						}
					})
					this.name2 = '点我选择'
				})
			},
			show1(id, name) {
				this.name1 = name
			},
			show2(id, name) {
				this.name2 = name
			}
		},
		mounted() {
			
		}
	}
</script>