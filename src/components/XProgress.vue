<template>
	<div class="progressbox">
		<div class="circle" v-if="type == 'circle'">
			<svg :width="width" :height="width">
			    <circle 
			    	:cx="width / 2" 
			    	:cy="width / 2" 
			    	:r="radius"
			    	:stroke-width="strokeWidth" 
			    	:stroke="innerColor" fill="none">
			    </circle>
			    <circle 
			    	:cx="width / 2" 
			    	:cy="width / 2" 
			    	:r="radius"
			    	:stroke-width="strokeWidth" 
			    	:stroke="outerColor" 
			    	:transform="transform" 
			    	:stroke-dasharray="strokeDasharray" stroke-linecap="round" fill="none">
			    </circle>
			    <text x="50%" y="58%">
					<tspan 
						:fill="outerColor" 
						text-anchor="middle" 
						:style="{fontSize: fontSize}">{{circleConfig.percent}}%
					</tspan>
				</text>
			</svg>
		</div>
		<div class="line" :style="{height: lineConfig.height + 'px'}" v-else>
			<div class="inner" :style="{width: lineConfig.percent + '%'}"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['type', 'lineConfig', 'circleConfig'],
		computed: {
			width() {
				return this.circleConfig.width
			},
			radius() {
				return this.circleConfig.width/2 - this.circleConfig.stroke
			},
			strokeWidth() {
				return this.circleConfig.stroke
			},
			perimeter() {
				return Math.PI * 2 * this.radius
			},
			innerColor() {
				return this.circleConfig.innerColor
			},
			outerColor() {
				return this.circleConfig.outerColor
			},
			transform() {
				return `rotate(-90) translate(-${this.width}, 0)`
			},
			strokeDasharray() {
				return `${this.circleConfig.percent / 100 * this.perimeter} ${this.perimeter}`
			},
			fontSize() {
				return `${this.width / 5 > 12 ? this.width / 5 : 12}px`
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	.line
		width 100%
		background-color #eee
		border-radius 10px
		.inner
			height 100%
			width 0
			transition width .5s
			border-radius 10px
			background-color $basebg
	circle
		transition stroke-dasharray .25s
</style>