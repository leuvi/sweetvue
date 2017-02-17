<template>
	<layout title="登录">
		<div class="loginpage">
			<div class="frow">
				<div class="row">
					<div class="labeltag">+86</div>
					<div class="input">
						<input required type="tel" v-model.trim="tel" placeholder="请输入手机号" data-model="tel">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
				</div>
				<div class="row">
					<div class="labeltag">密码</div>
					<div class="input">
						<input required type="password" v-model.trim="password" placeholder="请输入密码，6-16位" data-model="password">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
				</div>
				<div class="row">
					<div class="labeltag">验证码</div>
					<div class="input">
						<input required type="text" v-model.trim="ycode" placeholder="请输入验证码" data-model="ycode">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
					<div class="labeldes"><img src="../assets/call.jpg" alt=""></div>
				</div>
			</div>
			<div class="frow lrp20">
				<div class="button" :class="{disabled: disabled}" @click="startLogin">
					<template v-if="login">
						<span class="loading"></span>登录中
					</template>
					<span v-else>登录</span>
				</div>
			</div>
		</div>
		<Toast v-if="errorShow" :config="config" />
	</layout>
</template>

<script>
	import Layout from './main'
	import Toast from '@/Toast'
	import router from '~/routes'

	export default {
		data() {
			return {
				tel: '',
				password: '',
				ycode: '',
				disabled: true, //登录按钮禁用？
				errorShow: false, //错误显示
				login: false //登录状态
			}
		},
		components: {
			Layout,
			Toast
		},
		computed: {
			disabled() {
				return /^1[3|4|5|7|8]\d{9}$/.test(this.tel) &&
					   /^.{6,16}$/.test(this.password) &&
					   /^\w+$/.test(this.ycode) ? false : true
			}
		},
		methods: {
			showError(text) {
				this.config = {text, top}
				this.errorShow = true
				setTimeout(() => this.errorShow = false, 1000)
			},
			startLogin() {
				if(this.disabled || this.login) return
				//...异步请求
				this.login = true
				setTimeout(() => {
					this.login = false
					this.showError('登录成功，正在跳转..')
					setTimeout(() => router.push('/'), 1000)
				}, 3000)
			},
			clearInput(e) {
				let target = e.currentTarget.previousElementSibling
				this[target.dataset.model] = target.value = ''
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	$button()
	$clearinput()
	.frow
		padding 15px 0 0
	.lrp20
		padding-left 10px
		padding-right 10px
	.row
		display flex
		border-bottom 1px solid #ededed
		background-color #fff
		height 30px
		padding 5px 0
		line-height: 30px
		.labeltag
			flex-basis 5em
			text-align center
			border-right 1px solid #ededed
			color #999
		.labeldes
			flex-basis 80px
			text-align center
			border-left 1px solid #ededed
			img
				width 70px
				height 30px
				display inline-block
		.input
			flex-grow 1
			position relative
			input
				width 100%
				border none
				line-height 30px
				text-indent 1em
				color #666
				font-weight 600
</style>