<template>
	<div class="card">
		<canvas id="prizemask"></canvas>
		<div class="prize"><img src="http://www.sweetui.com/demo/gcp/images/g500.png" /></div>
		<dialog-component />
	</div>
</template>

<script>
	import DialogComponent from '../components/Dialog'

	export default {
		mounted() {
			card()
		},
		components: {
			DialogComponent
		},
	}
	function card(){
		let counts = 1
		let isPlay = false
		let pageWidth = 240
		let pageHeight = 140
		
		function createCanvas(){
			let canvas = document.getElementById('prizemask')
			canvas.width = pageWidth
			canvas.height = pageHeight
			let ctx = canvas.getContext('2d')
			let img = new Image()
			img.src = 'http://www.sweetui.com/demo/gcp/images/before.png'
			
			ctx.fillStyle = '#ffd1d7';
			ctx.fillRect(0, 0, pageWidth, pageHeight);
			
			img.onload = function(){
				ctx.drawImage(img, 0, 0, pageWidth, pageHeight);
			}
			return canvas
		}
		
		function init(width, height, radius, fillColor){
			let canvas = createCanvas()
			let ctx = canvas.getContext('2d')
			
			ctx.fillCircle = function(x, y, raduis, fillColor){
				this.fillStyle = fillColor
				this.beginPath()
				this.moveTo(x, y)
				this.arc(x, y, raduis, 0, Math.PI*2, false)
				this.fill()
			}
			
			canvas.addEventListener('touchstart', function(e) {
				canvas.isDrawing = true
				e.preventDefault()
			})

			canvas.addEventListener('touchmove', function(e) {
				if(isPlay){
					return
				}
	            counts++
				console.log(canvas.isDrawing)
				if(!canvas.isDrawing){
					return
				}
				
				let x = e.changedTouches[0].pageX - canvas.parentNode.offsetLeft;
				let y = e.changedTouches[0].pageY - canvas.parentNode.offsetTop;

				ctx.globalAlpha = 0.9
				ctx.globalCompositeOperation = 'destination-out'
				if(counts < 100){
					ctx.fillCircle(x, y, radius, fillColor)
				}else{
					ctx.fillRect(0, 0, pageWidth, pageHeight)
					isPlay = true
					
					alert({title: '╰(￣▽￣)╮', content: '恭喜你刮到500W！'})
				}
			})

			canvas.addEventListener('end', function(e) {
				canvas.isDrawing = false
			})
		}
		
		init(pageWidth, pageHeight, 20, '#fff')
		
	}
</script>

<style lang="stylus">
	.card
		width 240px
		height 140px
		position relative
		margin 0 auto
		#prizemask
			position absolute
			left 0
			top 0
</style>