<template>
	<layout title="大转盘">
		<div class="des">
			<p>{{des}}</p>
			<p>prizes: 奖项设置，api: 抽奖接口，callback: 回调弹层提示</p>
		</div>
		<Lottery :prizes="prizes" api="/api/lottery" @callback="callback" />
		<div class="des">
			<p>中奖纪录</p>
			<p v-for="r in record">{{r}}</p>
		</div>
		<dialog-component />
	</layout>
</template>

<script>
	import Layout from './main'
	import Lottery from '../components/Lottery'
	import DialogComponent from '../components/Dialog'

	export default {
		data() {
			return {
				prizes: {
					'0': [[23, 245][~~(Math.random() * 2)], '很遗憾，这次您未抽中奖'],
					'1': [338, '恭喜你，抽中Coach品牌包包'],
					'2': [158, '恭喜你，抽中银座拉杆箱'],
					'3': [67, '恭喜你，抽中零钱包'],
					'4': [292, '噢耶，抽中了Coach礼品券100元'],
					'5': [112, '噢耶，抽中了卡包礼品券30元'],
					'6': [202, '噢耶，抽中了现金抵用券10元'],
				},
				des: '<Lottery :prizes="prizes" api="/api/lottery" @callback="callback" />',
				record: []
			}
		},
		components: {
			Layout,
			Lottery,
			DialogComponent
		},
		methods: {
			callback(prizeLevel, msg) {
				alert({
					title: prizeLevel == 0 ? 'o(︶︿︶)o ' : 'o(≧v≦)o~~',
					content: msg
				})
				if(prizeLevel > 0) {
					this.record.push(msg)
				}
			}
		}
	}
</script>