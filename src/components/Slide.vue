<template>
	<div class="slide" :class="{loading: loaded}" :style="{width: width}">
		<ul>
			<li v-for="data in imgdata">
				<a :href="data.url"><img :src="data.img"></a>
			</li>
		</ul>
		<div class="circle">
			<span v-for="nums in imgdata"></span>
		</div>
	</div>
</template>

<script>
	class touchSlide {
		constructor(elem, autoplay, time = 3000) {
			Object.assign(this, {
				elem, autoplay, time
			})
			this.elemNode = document.querySelector(elem)
			this.ul = document.querySelector(`${elem} ul`)
			this.len = document.querySelectorAll(`${elem} li`).length
			this.width = Math.min(window.innerWidth, screen.width)
			this.cur = 0
			this.x = 0
			this.distance = 0
			this.timer = ''
			this.init()
		}

		init() {
			this.createArrow()
			this.autoplay && this.autoMove();
			['touchstart', 'touchmove', 'touchend'].forEach((type) => {
				this.elemNode.addEventListener(type, () => {
					switch (type) {
						case 'touchstart':
							clearTimeout(this.timer)
							this.touchStart()
							break
						case 'touchmove':
							this.touchMove()
							break
						default:
							this.autoplay && this.autoMove()
							this.touchEnd()
					}
				}, !1)
			})
		}
		createArrow() {
			this.elemNode.querySelector('span').classList.add('on')
			this.setWidth()
		}
		arrowCur(idx) {
			const spans = this.elemNode.querySelectorAll('span');
			[...spans].forEach(v => v.classList.remove('on'))
			spans[idx].classList.add('on')
		}
		setWidth() {
			const lis = document.querySelectorAll(`${this.elem} li`)
			this.ul.style.width = `${lis.length * this.width}px`;
			[...lis].forEach(v => v.style.width = `${this.width}px`)
		}
		swipeLeft() {
			this.ul.style.webkitTransform = `translate3d(${-this.width * ++this.cur}px,0,0)`
		}
		swipeRight() {
			this.ul.style.webkitTransform = `translate3d(${-this.width * --this.cur}px,0,0)`
		}
		autoMove() {
			this.cur == this.len ? this.cur = 0 : null
			this.ul.style.webkitTransform = `translate3d(${-this.width * this.cur}px,0,0)`
			this.timer = setTimeout(() => {
				this.cur++
					this.autoMove()
				this.arrowCur(this.cur)
			}, this.time)
		}
		touchStart(e = window.event) {
			this.x = e.touches[0].pageX
			this.distance = 0
		}
		touchMove(e = window.event) {
			this.distance = e.changedTouches[0].pageX - this.x
			this.ul.style.webkitTransform = `translate3d(${-this.width * this.cur + this.distance}px,0,0)`
			this.ul.style.webkitTransitionDuration = '0ms'
			Math.abs(this.distance) > 10 ? e.preventDefault() : null
		}
		touchEnd(threshold = 50) {
			this.distance < -threshold ? this.swipeLeft() : this.distance > threshold ? this.swipeRight() : this.ul.style.webkitTransform = `translate3d(${-this.width * this.cur}px,0,0)`

			if (this.cur < 0) {
				this.cur = 0
				this.ul.style.webkitTransform = 'translate3d(0,0,0)'
			}
			if (this.cur >= this.len) {
				this.cur = this.len - 1
				this.ul.style.webkitTransform = `translate3d(${-this.width * (this.len - 1)}px,0,0)`
			}
			this.ul.style.webkitTransitionDuration = ''
			this.arrowCur(this.cur)
		}
	}

	import {getJSON, rem} from '../util'

	export default {
		props: ['url', 'autoplay', 'time'],
		data() {
			return {
				width: window.innerWidth + 'px',
				imgdata: '',
				loaded: true
			}
		},
		created() {
		    this.fetchData()
		    rem()
		},
		methods: {
		    fetchData() {
		    	getJSON(this.url).then(data => {
		    		this.loaded = false
		    		this.imgdata = data
		    	})
		    }
		},
		updated() {
			new touchSlide('.slide', this.autoplay, this.time)
		}
	}
</script>

<style scoped>
.slide {
	width: 16rem;
	height: 8rem;
	overflow: hidden;
	position: relative;
}
.slide ul {
	-webkit-transition: 300ms;
	-webkit-transform: translate3d(0,0,0);
	-webkit-transform-style: preserve-3d;
}
.slide ul li {
	overflow: hidden;
	float: left;
	font-size: 0;
	-webkit-backface-visibility: hidden;
}
.slide ul li img {
	width: 16rem;
	height: 8rem;
}
.slide .circle {
	position: absolute;
	left: 0;
	bottom: 20px;
	width: 100%;
	height: 10px;
	text-align: center;
}
.slide .circle span {
	display: inline-block;
	width: 8px;
	height: 8px;
	background: #fff;
	border-radius: 50%;
	margin: 0 5px;
}
.slide .circle span.on {
	background: #f30;
}
</style>