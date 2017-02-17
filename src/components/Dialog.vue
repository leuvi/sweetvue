<template>
	<div>
		<transition 
			enter-active-class="animated bounceIn"
	    	leave-active-class="animated bounceOut"
		>
			<div v-if="show" class="dialog" ontouchmove="return false">
				<div class="innerbox">
					<div class="title" v-if="config.title">{{config.title}}</div>
					<div class="content" v-html="config.content"></div>
					<div class="buttons" v-if="showAlert">
						<span class="confirm" @click="leave">{{config.confirmText}}</span>
					</div>
					<div class="buttons" v-if="showConfirm">
						<span class="cancle" @click="leave">{{config.cancelText}}</span>
						<span class="confirm" @click="confirmCallback">{{config.confirmText}}</span>
					</div>
				</div>
			</div>
		</transition>
		<transition name="mask">
			<div v-if="show" class="mask"></div>
		</transition>
	</div>
</template>

<script>
	import {funcExtend} from '../util'
	export default {
		data() {
			return {
				config: {
		            title: '',
		            content: '',
		            confirmText: '确定',
		            cancelText: '取消',
		            callback: ''
		        },
		        show: false,
		        showAlert: false,
		        showConfirm: false
			}
		},
		created() {
			//包装全局alert方法
			funcExtend.wrapMethod(window, 'alert', (_alert, config) => {
				if(typeof config == 'object') {
					this.show = this.showAlert = true
					this.config = Object.assign(this.config, config)
				} else {
					_alert(config)
				}
			})
			//包装全局confirm方法
			funcExtend.wrapMethod(window, 'confirm', (_alert, config) => {
				if(typeof config == 'object') {
					this.show = this.showConfirm = true
					this.config = Object.assign(this.config, config)
				} else {
					_alert(config)
				}
			})
		},
		methods: {
			leave() {
				this.show = false
				setTimeout(() => {
					this.showAlert = this.showConfirm = false
				}, 200)
				this.config = {
		            title: '',
		            content: '',
		            confirmText: '确定',
		            cancelText: '取消',
		            callback: ''
		        }
			},
			confirmCallback() {
				//this.$emit('callback')
				if(this.config.callback) this.config.callback()
				this.leave()
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	@import '../assets/animate.css';
	
	$dialog()
	.mask-enter-active {
		transition all .2s linear
	}
	.mask-leave-active {
		transition all .5s linear
	}
	.mask-enter, .mask-leave-active {
		opacity 0
	}
</style>