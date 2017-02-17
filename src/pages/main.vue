<template>
	<div class="listwrap">
		<header>
			<div class="back" @click="back"><i class="iconfont icon-back"></div>
			<h1>{{title}}</h1>
			<slot name="post"></slot>
		</header>
		<div class="cont">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import router from '../routes'

	export default {
		props: ['title'],
		methods: {
			back() {
				let top = this.$store.state.top
				router.push('/')
				setTimeout(() => window.scrollTo(0, top), 200)
			}
		},
		mounted() {
			window.scrollTo(0, 0)
		}
	}

</script>

<style lang="stylus">
	@import '../vars.styl';
	
	$loading()
	.des
		background #fff
		padding 10px 15px
		margin-top 20px
		margin-bottom 10px
		word-break break-word
		.btn
			text-decoration underline
			color $basebg
			font-weight 600
	pre
		margin 0
		border-left 3px solid #41b883
		box-shadow 3px 3px 0 #eee
		margin-top 15px
		color #333
		line-height 2
		padding 0 10px
		font-family small arial,sans-serif
		display block
		white-space pre
		tab-size 4
		background #fdfdfd
		background-size auto 4em
		background-image linear-gradient(rgba(0, 0, 0, .05) 50%, transparent 0)
		
	
</style>