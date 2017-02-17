<template>
	<layout title="注册">
		<div class="registpage">
			<div class="frow">
				<div class="row">
					<div class="labeltag">+86</div>
					<div class="input">
						<input required type="tel" v-model.trim="tel" placeholder="请输入手机号" data-model="tel">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
				</div>
				<div class="row">
					<div class="labeltag">设置密码</div>
					<div class="input">
						<input required type="password" v-model.trim="password" placeholder="请输入密码，6-16位" data-model="password">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
				</div>
				<div class="row">
					<div class="input">
						<input required type="tel" v-model.trim="mcode" placeholder="请输入短信验证码" data-model="mcode">
						<span class="clearinput" @click="clearInput($event)"><i class="iconfont icon-close"></i></span>
					</div>
					<div class="labeldes" @click="getCode">
						<span v-if="getCoding">{{time}}秒</span>
						<span v-else>{{codeDes}}</span>
					</div>
				</div>
			</div>
			<div class="frow lrp20">
				<div class="button" :class="{disabled: disabled}" @click="startRegist">
					<template v-if="regist">
						<span class="loading"></span>注册中
					</template>
					<span v-else>注册</span>
				</div>
				<div class="statement">点击"注册"代表同意《xx服务条款》</div>
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
				mcode: '',
				disabled: true,
				errorShow: false,
				regist: false,
				time: 60,
				getCoding: false,
				codeDes: '获取验证码'
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
					   /^\d{6}$/.test(this.mcode) ? false : true
			}
		},
		methods: {
			showError(text) {
				this.config = {text, top}
				this.errorShow = true
				setTimeout(() => this.errorShow = false, 1000)
			},
			getCode() {
				if(this.getCoding) return
				if(!/^1[3|4|5|7|8]\d{9}$/.test(this.tel)) {
					this.showError('手机号码格式不正确')
					return
				}
				this.getCoding = true
				setTimeout(() => this.showError('验证码已发送'), 2000)
				let timer = setInterval(() => {
					if(this.time == 0) {
						this.time = 60
						clearInterval(timer)
						this.getCoding = false
						this.codeDes = '重新获取'
						return
					}
					this.time--
				}, 1000)
			},
			startRegist() {
				if(this.disabled || this.regist) return
				//...异步请求
				this.regist = true
				setTimeout(() => {
					this.regist = false
					this.showError('注册成功，正在跳转..')
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
	.statement
		color #999
		text-align center
		padding-top 15px
	.row
		display flex
		border-bottom 1px solid #ededed
		background-color #fff
		height 30px
		padding 5px 0
		line-height: 30px
		.labeltag
			flex-basis 6em
			text-align center
			border-right 1px solid #ededed
			color #999
		.labeldes
			flex-basis 100px
			text-align center
			border-left 1px solid #ededed
			color $basebg
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