<template>
	<div class="effect" id="effect"></div>
</template>

<script>
	let requestId = true

	function rain() {
	    let b = document.getElementById('effect'),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			width = b.offsetWidth,
			height = b.offsetHeight
			canvas.width = width
			canvas.height = height

	    ctx.strokeStyle = 'rgba(174,194,224,0.5)'
	    ctx.lineWidth = 1
	    ctx.lineCap = 'round'
	    
	    
	    let init = []
	    let maxParts = 300
	    for(let a = 0; a < maxParts; a++) {
	      	init.push({
	    		x: Math.random() * width,
	    		y: Math.random() * height,
	    		l: Math.random() * 1,
	    		xs: -4 + Math.random() * 4 - 2,
	    		ys: Math.random() * 10 + 10
	    	})
	    }
	    
	    let particles = []
	    for(let b = 0; b < maxParts; b++) {
	    	particles[b] = init[b]
	    }
	    
	    function draw() {
	    	ctx.clearRect(0, 0, width, height);
	    	for(let c = 0; c < particles.length; c++) {
	        	var p = particles[c]
	        	ctx.beginPath()
	        	ctx.moveTo(p.x, p.y)
	        	ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys)
	        	ctx.stroke()
	   		}
	   		move()
	   		console.log('rain is works')
	   		if(!requestId) return
	   		requestAnimFrame(draw)
	    }
	    
	    function move() {
	    	for(let b = 0; b < particles.length; b++) {
	    		let p = particles[b]
	    		p.x += p.xs
	    		p.y += p.ys
	        	if(p.x > width || p.y > height) {
	          		p.x = Math.random() * width
	          		p.y = -20
	        	}
	    	}
	    }

	    window.requestAnimFrame = (function(){
		    return window.requestAnimFrame        ||
			       window.webkitRequestAnimFrame  ||
				   window.mozRequestAnimFrame     ||
				   function(callback){
				       window.setTimeout(callback, 10)
				   }
		})()
	    requestAnimFrame(draw)
	    b.appendChild(canvas)
	}

	export default {
		mounted() {
			requestId = true
			rain()
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