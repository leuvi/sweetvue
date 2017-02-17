<template>
	<layout title="Scroller">
		<div class="des">
			<p>scroll-y 简单滚动</p>
		</div>
		<div class="demo" id="scroll-y">
			<div class="scroll-inner">
				<p>{{text}}</p>
			</div>
		</div>
		<div class="des">
			<p>scroll-refresh 下拉刷新 阀值：{{scrollY}}</p>
		</div>
		<div class="demo" :class="{loading: loading}" id="scroll-refresh">
			<div class="scroll-inner">
				<p>{{text2}}</p>
			</div>
		</div>
		<div class="des">
			<p>scroll-x 横向滚动</p>
		</div>
		<div class="demo" id="scroll-x">
			<div class="scroll-inner">
				<p>{{text}}</p>
			</div>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import IScroll_lite from '$/iscroll-lite.js'
	import IScroll_probe from '$/iscroll-probe.js'

	export default {
		data() {
			return {
				loading: false,
				scrollY: 0,
				text: `窗外的麻雀 在电线杆上多嘴
				你说这一句 很有夏天的感觉
				手中的铅笔 在纸上来来回回
				我用几行字形容你是我的谁
				秋刀鱼的滋味 猫跟你都想了解
				初恋的香味 就这样被我们寻回
				那温暖的阳光　像刚摘的鲜艳草莓
				你说你舍不得吃掉这一种感觉
				雨下整夜 我的爱溢出就像雨水 
				院子落叶 跟我的思念厚厚一叠 
				几句是非 也无法将我的热情冷却 
				你出现在我诗的每一页 
				雨下整夜 我的爱溢出就像雨水 
				窗台蝴蝶 像诗里纷飞的美丽章节 
				我接着写 把永远爱你写进诗的结尾 
				你是我唯一想要的了解 
				那饱满的稻穗 幸福了这个季节
				而你的脸颊像田里熟透的番茄
				你突然对我说 七里香的名字很美
				我此刻却只想亲吻你倔强的嘴
				整夜 我的爱溢出就像雨水
				窗台蝴蝶 像诗里纷飞的美丽章节
				我接着写 把永远爱你写进诗的结尾
				你是我唯一想要的了解`,
				text2: `你说这一句 很有夏天的感觉
				手中的铅笔 在纸上来来回回
				我用几行字形容你是我的谁
				秋刀鱼的滋味 猫跟你都想了解
				初恋的香味 就这样被我们寻回
				那温暖的阳光　像刚摘的鲜艳草莓
				你说你舍不得吃掉这一种感觉
				雨下整夜 我的爱溢出就像雨水 
				院子落叶 跟我的思念厚厚一叠 
				几句是非 也无法将我的热情冷却 
				你出现在我诗的每一页 
				雨下整夜 我的爱溢出就像雨水 
				窗台蝴蝶 像诗里纷飞的美丽章节 
				我接着写 把永远爱你写进诗的结尾 
				你是我唯一想要的了解`
			}
		},
		mounted() {
			let isRefresh = false
			let rX = 0
			let _self = this
			let yscroll = new IScroll_lite('#scroll-y', {
				disablePointer: true,
				disableTouch: false,
				disableMouse: false
			})
			let xscroll = new IScroll_lite('#scroll-x', {
				scrollX: true, 
				scrollY: false, 
				preventDefault: false
			})
			let refreshscroll = new IScroll_probe('#scroll-refresh', {
				probeType: 2
			})
			refreshscroll.on('scroll', function() {
				rX = this.y
				_self.scrollY = ~~rX
			})
			refreshscroll.on('scrollEnd', () => {
				if(rX > 50 && !this.loading) {
					console.log('开始刷新')
					this.loading = true
					this.text2 = ''
					setTimeout(() => {
						this.loading = false
						this.text2 = this.text
						setTimeout(() => refreshscroll.refresh(), 0)
					}, 3000)
				}
			})
		},
		components: {
			Layout
		}
	}
</script>

<style lang="stylus">
	.demo
		width 90%
		height 140px
		margin 20px auto
		position relative
		overflow hidden
		.scroll-inner
			position absolute
			transform translateZ(0)
			p
				text-indent 2em
				margin-bottom 10px
				line-height 24px
	.scroll-inner
		touch-action none
	#scroll-x .scroll-inner
		width 1000px
</style>