<template>
	<layout title="Dialog">
		<div class="des">
			<p>{{des}}</p>
		</div>
		<div class="des">
			<p @click="alertDialog" class="btn">alert: Wash your hands!</p>
			<p>
<pre>@click="alertDialog"
alertDialog() {
	//被重写的系统alert方法
	alert({
		title: 'Hi Bear', 
		content: 'Wash your hands!',
		confirmText: '我知道啦！'
	})
}
</pre>
			</p>
			<p @click="confirmDialog1('Ready for dinner')" class="btn">ready for dinner?</p>
			<p></p>
			<p @click="confirmDialog2" class="btn">回到首页?</p>
			<p>{{str}}</p>
<pre>@click="confirmDialog('Ready for dinner')"
confirmDialog(str) {
	//被重写的系统confirm方法
		confirm({
		title: 'Hi Bear', 
		content: str + '?',
		callback() {}
	})
}
</pre>
		</div>
		<dialog-component />
	</layout>
</template>

<script>
	import Layout from './main'
	import DialogComponent from '../components/Dialog'
	import router from '../routes'

	export default {
		data() {
			return {
				str: "",
				des: '<dialog-component />'
			}
		},
		components: {
			Layout,
			DialogComponent
		},
		methods: {
			alertDialog() {
				alert({
					title: 'Hi Bear', 
					content: 'Wash your hands!',
					confirmText: '我知道啦！'
				})
			},
			confirmDialog1(str) {
				const self = this
				confirm({
					title: 'Hi Bear', 
					content: str + '?',
					callback() {
						self.str = str
					}
				})
			},
			confirmDialog2() {
				confirm({
					content: '返回首页？',
					confirmText: '确认返回',
					callback() {
						router.push('/')
					}
				})
			}
		}
	}
</script>