<template>
	<layout title="Fullpage">
		<div class="fullpage">
			<ul v-swipeVertical>
				<li>
					<p class="animated swing">first</p>
				</li>
				<li>
					<p class="animated swing">second</p>
				</li>
				<li>
					<p class="animated swing">third</p>
				</li>
				<li>
					<p class="animated swing">fourth</p>
				</li>
				<li>
					<p class="animated swing">fifth</p>
				</li>
			</ul>
		</div>
	</layout>
</template>

<script>
	import Layout from './main'
	import Hammer from '../plugins/hammer.min.js'

	export default {
		components: {
			Layout
		},
		directives: {
			swipeVertical: {
				inserted(el, binding, vnode) {
					let len = el.querySelectorAll('li').length,
						pbox = el.parentNode,
						height = pbox.offsetHeight,
						cur = 0,
						lis = [...el.querySelectorAll('li')]

					el.style.height = `${height * len}px`
					lis.forEach(value => {
						value.style.height = `${height}px`
					})
					el.querySelectorAll('li')[0].classList.add('on')
					const hm = new Hammer(el)
					hm.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
					hm.on('swipedown swipeup', (e) => {
						lis.forEach(value => value.classList.remove('on'))
						if(e.type == 'swipeup') {
							cur != len - 1 && 
							(setTimeout(() => lis[cur].classList.add('on'), 200),
							cur++)
						} else {
							cur != 0 && 
							(setTimeout(() => lis[cur].classList.add('on'), 200),
							cur--)
						}
						el.style.transform = `translate3d(0, ${-cur * height}px, 0)`
						
					})
				}
			}
		}
	}
</script>

<style lang="stylus">
	@import '../assets/animate.css'

	.fullpage 
		position absolute
		width 100%
		height calc(100% - 44px)
		overflow hidden
		ul
			width 100%
			min-height 300%
			transition transform .5s ease-out
			transform translate3d(0, 0, 0)
			li
				display flex
				justify-content center
				align-items center
				font-size 36px
				font-weight 200
				color #fff
				
			for li in 1..5
				li:nth-child({li})
					background-color #ff5823 + 10% * li
	.animated.swing
		-webkit-animation-name none
		animation-name none
	.on .swing
		-webkit-animation-name swing
		animation-name swing
</style>