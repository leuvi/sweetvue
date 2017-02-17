<template>
	<layout title="垂直居中方案">
		<div class="des">
			{{des}}
		</div>
		<div class="des">
			<p>1、绝对定位有4种方法，子元素设置absolute</p>
			<p>
	<pre>left 50%
	top 50%
	margin-left -75px
	margin-top -75px
	</pre>
	<pre>上述简写版
	left calc(50% - 75px)
	top calc(50% - 75px)
	</pre>
	<pre>居中元素宽高不固定
	left 50%
	top 50%
	transform translate(-50%, -50%)
	</pre>
	<pre>left 0
	top 0
	right 0
	bottom 0
	margin auto
	</pre>
			</p>
		</div>
		<div class="plan1 outerbg">
			<img src="../assets/logo.png" />
		</div>
		<div class="des">
			<p>2、flex布局有2种方法，父元素设置display flex</p>
			<p>
	<pre>1、父元素
	justify-content center
	align-items center
	</pre>
	<pre>2、子元素
	margin auto
	</pre>
			</p>
		</div>
		<div class="plan2 outerbg">
			<img src="../assets/logo.png" />
		</div>
		<div class="des">
			<p>3、line-height + vertical-align</p>
			<p>
	<pre>父元素
	text-align center
	line-height 300px
	子元素
	display inline-block
	vertical-align middle
	</pre>
			</p>
		</div>
		<div class="plan3 outerbg">
			<img src="../assets/logo.png" />
		</div>
		<div class="des">
			<p>4、margin + translateY</p>
			<p>
	<pre>margin 150px auto 0
	transform translateY(-50%)
	</pre>
			</p>
		</div>
		<div class="plan4 outerbg">
			<img src="../assets/logo.png" />
		</div>
		<div class="des">
			<p>5、table布局 + vertical-align</p>
			<p>
	<pre>父元素
	display table
	子元素
	display table-cell
	vertical-align middle
	text-align center
	</pre>
			</p>
		</div>
		<div class="plan5 outerbg">
			<p><img src="../assets/logo.png" /></p>
		</div>
		<div class="des">
			<p>6、webkit-box布局</p>
			<p>
	<pre>父元素
	display -webkit-box
	-webkit-box-align center
	-webkit-box-pack center
	</pre>
			</p>
		</div>
		<div class="plan6 outerbg">
			<img src="../assets/logo.png" />
		</div>
		<totop pos="800" time="200"></totop>
	</layout>
</template>

<script>
	import Layout from './main'
	import Totop from '@/Totop'

	export default {
		data() {
			return {
				des: `页面结构：<div class="outerbg"><img src="logo.png"></div>背景高300,图片150x150`
			}
		},
		components: {
			Layout,
			Totop
		}
	}
</script>

<style lang="stylus">
	.outerbg
		background-color #fff
		width 100%
		height 300px
		img
			width 150px
			height @width
	.plan1
		position relative
		img
			position absolute
			left 50%
			top 50%
			transform translate(-50%, -50%)
	.plan2
		display flex
		justify-content center
		align-items center
	.plan3
		text-align center
		line-height 300px
		img
			display inline-block
			vertical-align middle
	.plan4
		overflow hidden
		img
			margin 150px auto 0
			transform translateY(-50%)
	.plan5
		display table
		p
			display table-cell
			vertical-align middle
			text-align center
			img
				display inline-block
	.plan6
		display -webkit-box
		-webkit-box-align center
		-webkit-box-pack center
</style>