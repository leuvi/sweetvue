<template>
	<div class="effect" id="effect"></div>
</template>

<script>
	let requestId = true

	function snow(nums) {
	    let c = nums || 300, //粒子数量
		    b = document.getElementById('effect'),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			width = b.offsetWidth,
			height = b.offsetHeight,
			i = 0,
			active = false
			
		function onResize(){
		    width = b.offsetWidth
			height = b.offsetHeight
			canvas.width = width
			canvas.height = height
			ctx.fillStyle = '#fff'
			
			let isActive = active
			active = width > 100
			
			if(!isActive && active)
			    //window.setTimeout(update, 10)
			    requestAnimFrame(update)
		}
		
		var Snowflake = function(){
		    this.x = 0
			this.y = 0
			this.vx = 0
			this.vy = 0
			this.r = 0
			
			this.reset()
		}
		
		Snowflake.prototype.reset = function(){
		    this.x = Math.random() * width
			this.y = Math.random() * - height
			this.vx = (0.5 - Math.random()) * 2  //横向移动速度
			this.vy = 1 + Math.random() * .5     //垂直下落速度
			this.r = 1 + Math.random() * 2		 //粒子大小
			this.o = 0.5 + Math.random() * 0.5   //粒子透明度
		}
		
		canvas.style.position = 'absolute'
		canvas.style.left = canvas.style.top = 0
		
		var snowflakes = [], snowflake
		for(i = 0; i < c; i++){
		    snowflake = new Snowflake()
			snowflakes.push(snowflake)
		}
		
		function update(){
		    ctx.clearRect(0, 0, width, height)
			if(!active){
			    return
			}
			for(i = 0; i < c; i++){
			    snowflake = snowflakes[i]
				snowflake.y += snowflake.vy
				snowflake.x += snowflake.vx
				
				ctx.globalAlpha = snowflake.o

				ctx.beginPath()
				ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false)
				ctx.closePath()
				ctx.fill()
				
				if(snowflake.y > height){
					snowflake.reset()
				}
			}
			//window.setTimeout(update, 10)
			//console.log('snow is works')
	   		if(!requestId) return
			requestAnimFrame(update)
		}
		
		window.requestAnimFrame = (function(){
		    return window.requestAnimFrame        ||
			       window.webkitRequestAnimFrame  ||
				   window.mozRequestAnimFrame     ||
				   function(callback){
				       window.setTimeout(callback, 10)
				   }
		})()
		
		onResize()
		
		window.addEventListener('resize', onResize, false)
		b.appendChild(canvas)
	}

	export default {
		props: ['nums'],
		mounted() {
			requestId = true
			snow(this.nums)
		},
		destroyed() {
			requestId = false
		},
		methods: {
			cancle() {
				requestId = false
			}
		}
	}

</script>

<style lang="stylus">
	.effect {
		width 100%
		position absolute
		left 0
		top 0
		bottom 0
	}
</style>