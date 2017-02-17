<template>
	<layout title="@引用">
		<div class="des">
			<div class="recommend">
				<div class="input">
					<input type="text" 
						@keyup="loadFriends($event)" 
						@click="getPos($event)"
						v-model="msg"
						maxlength="15" 
					>
					<span id="hiddentext" class="hiddentext">{{msg}}</span>
					<transition
						enter-active-class="animated_spec fadeInDown_spec"
	    				leave-active-class="animated_spec fadeOutDown_spec"
					>
						<div class="tiplist" v-if="show" :style="{left: left + 'px'}">
							<ul>
								<li v-for="user in userlist" @click="addFriend(user)">{{user}}</li>
							</ul>
						</div>
					</transition>
				</div>
				<div class="send" @click="test">发送</div>
			</div>
		</div>
		<dialog-component />
	</layout>
</template>

<script>
	import Layout from './main'
	import DialogComponent from '@/Dialog'

	export default {
		data() {
			return {
				msg: '',
				start: 0,
				show: false,
				left: 0,
				userlist: ['赵四', '刘能', '谢大脚', '谢广坤', '赵玉田', '王大拿', '王老七', '王长贵']
			}
		},
		components: {
			Layout,
			DialogComponent
		},
		methods: {
			loadFriends(e) {
				if(e.which == 50 && this.msg.length < 15) {
					const text = document.getElementById('hiddentext')
					this.left = this.getWidth(text)
					console.log(this.start)
					this.show = true
				}
			},
			addFriend(user) {
				this.msg = this.msg + user + ' '
				this.show = false
			},
			test() {
				if(this.msg) {
					alert({
						title: '提交的数据',
						content: this.msg
					})
					this.msg = ''
				}
			},
			getWidth(elem) {
				let winWidth = window.innerWidth
				let clone = elem.cloneNode(true)
				clone.style.visibility = 'hidden'
				document.body.appendChild(clone)
				let width = clone.offsetWidth
				width = width + 80 > winWidth ? 0 : width
				document.body.removeChild(clone)
				return width
			},
			getPos(e) {
				let target = e.target,
					value = target.value,
					start = this.getSelectionStart(target)
				if(start == 0) {
					return
				}
				this.start = start
				let bwords = value.substring(0, start)
				//this.beforeWords = /[\d\w_-]/.test(bwords.charAt(bwords.length - 1))
				//console.log(this.beforeWords)
			},
			getSelectionStart(elem) {
				if (elem.createTextRange) {
					let r = document.selection.createRange().duplicate()
					r.moveEnd('character', elem.value.length)
					if (r.text == '') {
						return elem.value.length
					}
					return elem.value.lastIndexOf(r.text)
				} else {
					return elem.selectionStart
				}
			},
			getSelectionEnd(elem) {
				if (elem.createTextRange) {
					let r = document.selection.createRange().duplicate()
					r.moveStart('character', -elem.value.length)
					return r.text.length
				} else {
					return elem.selectionEnd
				}
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';

	.recommend
		display flex
		.input
			height 36px
			flex-grow 1
			padding-right 10px
			position relative
			input
				width 100%
				border 1px solid #ccc
				padding 3px 0
				line-height 28px
				border-radius 3px
				text-indent .5em
			.hiddentext
				display none
			.tiplist
				width 80px
				position absolute
				left 0
				background-color #fff
				border 1px solid #ccc
				box-shadow 0 0 10px #eee
				border-radius 3px
				li
					line-height 30px
					border-radius 3px
					padding 0 8px
					&:active
						background-color #eee
		.send
			flex-basis 60px
			line-height 36px
			text-align center
			background-color $basebg
			color #fff
			border-radius 3px
	.animated_spec
		animation-duration .5s
		animation-fill-mode both
	.fadeInDown_spec
		animation-name fadeInDown_spec
	@keyframes fadeInDown_spec
		from
			opacity 0
			transform translate3d(0, -10px, 0)
		to
			opacity 1
			transform none
	.fadeOutDown_spec
		animation-name fadeOutDown_spec
	@keyframes fadeOutDown_spec
		from
			opacity 1
			transform none
		to
			opacity 0
			transform translate3d(0, -10px, 0)
</style>