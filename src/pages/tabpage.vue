<template>
	<layout title="Tab">
		<div class="des">
			<p>纯html内容</p>
			<p>{{html}}</p>
		</div>
		<tab :tabdata="texts"></tab>
		<div class="des">
			<p>带http请求内容</p>
			<p>{{req}}</p>
		</div>
		<tab :tabdata="requests" :request="true"></tab>
	</layout>
</template>

<script>
	import layout from './main'
	import Tab from '../components/Tab'
	import {list1, list3} from '../api'
	

	export default {
		data() {
			return {
				html: '<tab :tabdata="texts"></tab>',
				req: '<tab :tabdata="requests" :request="true"></tab>'
			}
		},
		components: {
			layout,
			Tab
		},
		computed: {
			texts() {
				return [
					{
						name: '菜单1',
						resource: '内容1'
					},
					{
						name: '菜单2',
						resource: '内容2'
					},
					{
						name: '菜单3',
						resource: '内容3'
					}
				]
			},
			requests() {
				return [
					{
						name: '菜单1',
						resource: list1
					},
					{
						name: '菜单2',
						resource: list1
					},
					{
						name: '菜单3',
						resource: list3
					}
				]
			}
		},
		created() {
			//console.log(info1)
		}
	}
</script>

<style>
	.tabcont p {
		line-height: 24px;
		margin-bottom: 10px;
		word-break: break-word;
	}
</style>