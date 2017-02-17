<template>
	<transition
		enter-active-class="animated fadeInRight"
	    leave-active-class="animated fadeOutRight"
	>
		<div class="citybox" v-show="modalshow">
			<div class="citybar">
				<div class="back" @click="close"></div>
				<h1>选择城市</h1>
			</div>
			<div class="inner">
				<dl class="hotcity">
					<dt data-tag="热门城市">热门城市</dt>
					<dd v-for="hot in citydata[0].n" @click="select(hot.n, hot.c)">{{hot.n}}</dd>
				</dl>
				<dl class="citylist">
					<template v-for="list in citydata.slice(1)">
						<dt :data-tag="list.k">{{list.k}}</dt>
						<dd v-for="city in list.n" @click="select(city.n, city.c)">
							{{city.n}}<span>{{city.c}}</span>
						</dd>
					</template>
				</dl>
			</div>
			<ul class="citynav" 
				@touchmove.stop.prevent="touchNavMove($event)" 
				@touchend="touchNavEnd($event)" 
				v-getSafeArea
			>
				<li v-for="nav in citydata" :data-word="nav.k" @click="findTag(nav.k, $event)">{{nav.k}}</li>
			</ul>
			<transition name="fade">
				<div class="tagword" v-show="isshow">{{tagword}}</div>
			</transition>
		</div>
	</transition>
</template>

<script>
	import citydata from '../plugins/citydata'

	export default {
		props: ['api', 'show'],
		data() {
			return {
				citydata: '',
				tagword: '',
				modalshow: false,
				isshow: false
			}
		},
		created() {
			this.citydata = citydata.data
		},
		methods: {
			findTag(key, e) {
				this.find(e.target, key)
				setTimeout(() => this.isshow = false, 300)
			},
			touchNavMove(e) {
				let x = e.touches[0].pageX
				let y = e.touches[0].pageY
				const safeArea = JSON.parse(e.currentTarget.dataset.pos)
				if(safeArea.left < x && x < safeArea.width + safeArea.left && safeArea.top < y && y < safeArea.top + safeArea.height && e.target.nodeName === 'LI') {
					let target = document.elementFromPoint(x, y)
					let key = target.dataset.word
					if(key) {
						this.find(target, key)
					}
				}
			},
			find(elem, key) {
				elem.parentNode.parentNode.querySelector(`[data-tag=${key}]`).scrollIntoView()
				this.isshow = true
				this.tagword = key.length > 1 ? '热' : key
			},
			touchNavEnd(e) {
				this.isshow = false
			},
			close() {
				this.modalshow = false
			},
			select(city, id) {
				this.$emit('callback', city, id)
				this.modalshow = false
			}
		},
		directives: {
			getSafeArea: {
				componentUpdated(elem) {
					if(elem.dataset.pos) {
						return
					}
					const width = elem.offsetWidth
					const height = elem.offsetHeight
					const left = elem.offsetLeft
					const top = elem.offsetTop
					elem.dataset.pos = JSON.stringify({width, height, left, top})
					console.log('指令执行中')
				}
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	@import '../assets/animate.css';
	
	.citybox
		position absolute
		left 0
		top 0
		width 100%
		height 100%
		z-index 100
		background #fff
		font-size 16px
		padding-top 44px
		box-sizing border-box
	.citybar
		position absolute
		left 0
		top 0
		width 100%
		height 44px
		line-height 44px
		text-align center
		color #fff
		background $basebg
	.citybar h1
		font-size 18px
	.citybar .back
		width 44px
		height 44px
		display block
		position absolute
		left 0
		top 0
	.citybar .back:before
		content ''
		display block
		position absolute
		top 50%
		margin-top -5px
		width 10px
		height 10px
		border 1px solid #FFF
		border-width 0 0 2px 2px
		transform rotate(45deg)
		left 20px
	.citynav
		position fixed
		top 0
		right 0
		z-index 11
		width 40px
		text-align center
		display flex
		flex-direction column
		min-height calc(100% - 80px)
		padding-top 60px
		li
			flex-grow 1
			color $basebg
			font-size 14px
	.tagword
		width 80px
		height @width
		line-height @width
		background-color rgba(0, 0, 0, .4)
		position fixed
		left 40%
		top 40%
		border-radius 50%
		text-align center
		font-size 32px
		color #fff
	.citybox .inner {
		-webkit-overflow-scrolling: touch;
	}
	.citybox .inner
		width 100%
		height 100%
		overflow auto
		overflow-scrolling touch
		font-size 14px
		background-color #f3f3f3
		.hotcity
			padding-left 20px
			dt
				padding-top 10px
			dd
				width 25%
				display inline-block
				line-height 36px
				background-color #fff
				border-radius 5px
				text-align center
				margin-top 10px
				margin-right 10px
		.citylist
			backface-visibility hidden
			dt
				padding-top 10px
				padding-left 20px
				padding-bottom 10px
			dd
				background-color #fff
				line-height 44px
				border-bottom 1px solid #eee
				padding-left 20px
				span
					color #999
					padding-left 10px
	.fade-enter-active, .fade-leave-active
		transition opacity .2s linear
	.fade-enter, .fade-leave-active
		opacity 0
</style>