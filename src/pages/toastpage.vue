<template>
	<layout title="状态提示">
		<div class="des">
			<p>{{des}}</p>
<pre>
配置信息：
config: {
  text: '显示的文本信息',
  type: '提示信息的状态',//load，success，error
  pos : 'toast条位置'，  //top，center，bottom
}
</pre>
		</div>
		<div class="des">
			<p class="btn" @click="show1">文字提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show2">loading提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show3">成功提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show4">错误提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show5">顶部toast条，成功提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show6">顶部toast条，失败提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show7">底部toast条，成功提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show8">底部toast条，失败提示</p>
		</div>
		<div class="des">
			<p class="btn" @click="show9">顶部toast条，正在加载</p>
		</div>
		<Toast v-if="show" :config="config" />
	</layout>
</template>

<script>
	import Layout from './main'
	import Toast from '../components/Toast'

	export default {
		data() {
			return {
				show: false,
				des: '<Toast :config="config" />'
			}
		},
		components: {
			Layout,
			Toast
		},
		methods: {
			show1() {
				this.config = {
					text: '我是文字提示'
				}
				this.show = true
				setTimeout(() => this.show = false, 3000)
			},
			show2() {
				this.config = {
					text: '正在加载数据...',
					type: 'load'
				}
				this.show = true
				setTimeout(() => this.show = false, 3000)
			},
			show3() {
				this.config = {
					text: '数据已加载完毕',
					type: 'success'
				}
				this.show = true
				setTimeout(() => this.show = false, 3000)
			},
			show4() {
				this.config = {
					text: '数据加载错误',
					type: 'error'
				}
				this.show = true
				setTimeout(() => this.show = false, 3000)
			},
			show5() {
				this.config = {
					text: '数据已加载完毕--顶部--成功',
					pos: 'top'
				}
				this.show = true
				setTimeout(() => this.show = false, 5000)
			},
			show6() {
				this.config = {
					text: '数据已加载完毕--顶部--失败',
					pos: 'top',
					type: 'error'
				}
				this.show = true
				setTimeout(() => this.show = false, 5000)
			},
			show7() {
				this.config = {
					text: '数据已加载完毕--底部--成功',
					pos: 'bottom'
				}
				this.show = true
				setTimeout(() => this.show = false, 5000)
			},
			show8() {
				this.config = {
					text: '数据已加载完毕--底部--失败',
					pos: 'bottom',
					type: 'error'
				}
				this.show = true
				setTimeout(() => this.show = false, 5000)
			},
			show9() {
				this.config = {
					text: '正在加载数据...',
					pos: 'top',
					type: 'load'
				}
				this.show = true
				setTimeout(() => this.show = false, 5000)
			}
		}
	}
</script>