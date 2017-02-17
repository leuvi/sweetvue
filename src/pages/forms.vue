<template>
	<layout title="表单输入">
		<div class="forms">
			<div class="row">
				<label>姓名</label>
				<div class="cell"><input type="text" v-model="username" placeholder="请填写姓名"></div>
			</div>
			<div class="row">
				<label>手机号</label>
				<div class="cell"><input type="tel" v-model="phone" placeholder="请填写手机号"></div>
			</div>
			<div class="row">
				<label>性别</label>
				<div class="cell">
					<x-radio :data='sexy' @callback="getSexy">
				</div>
			</div>
			<div class="row">
				<label>星期</label>
				<div class="cell">
					<x-radio :data='weeks' @callback="getWeek">
				</div>
			</div>
			<div class="row multiple_row">
				<label>标签</label>
				<div class="cell">
					<x-checkbox :data="tags" :max='3' @callback="getTags">
				</div>
			</div>
			<div class="row">
				<label>日期</label>
				<div class="cell">
					<input type="date" v-model="date" placeholder="请选择日期">
				</div>
			</div>
			<div class="row">
				<label>城市</label>
				<div class="cell">
					<x-select :options="city" @callback="getCity">
				</div>
			</div>
			<div class="row textarea_row">
				<label>留言</label>
				<div class="cell"><textarea v-model="msg" placeholder="请输入留言"></textarea></div>
			</div>
		</div>
		<div class="sliderbox">
			<div class="sliderdes" @click="submitForm">游玩天数：{{playDays}}天</div>
			<div class="slidercomp">
				<x-slider max="30" :value="playDays" @callback="getDays">
			</div>
		</div>
		<div class="sliderbox">
			<div class="sliderdes">自定义：{{sliderValue}}</div>
			<div class="slidercomp">
				<x-slider min="10" max="100" step="10" :value="sliderValue" @callback="getSlider">
			</div>
		</div>
		<div class="switchbox">
			<div class="switchdes">是否保存为常用信息？</div>
			<div class="switchcomp">
				<x-switch :open="saving" @callback="getSaving">
			</div>
		</div>
		<div class="switchbox">
			<div class="switchdes">大清是不是药丸？</div>
			<div class="switchcomp">
				<x-switch :open="ending" @callback="getEnding">
			</div>
		</div>
		<div class="formButton">
			<div class="button" @click="submitForm">提交</div>
		</div>
		<dialog-component />
	</layout>
</template>

<script>
	import Layout from './main'
	import DialogComponent from '@/Dialog'
	import XSwitch from '@/XSwitch'
	import XSlider from '@/XSlider'

	export default {
		data() {
			return {
				username: '',
				phone: '',
				sexy: ["男", "女"],
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				tags: ['人物', '风景', '动漫', '建筑', '汽车', '科技', '金融', '动物', '星际', '海洋'],
				date: '',
				city: [{name: '深圳', value: 'sz'}, {name: '广州', value: 'gz'}, {name: '珠海', value: 'zh'}, {name: '东莞', value: 'dg'}],
				msg: '',
				saving: true,
				ending: false,
				playDays: 1,
				sliderValue: 50,
				formData: {}
			}
		},
		components: {
			Layout,
			DialogComponent,
			XSwitch,
			XSlider,
			XRadio: {
				props: ['data'],
				data() {
					return {
						radioInex: 0,
						moveBlock: 0
					}
				},
				template:  `<div class="radiobox">
								<ul class="radiocell">
									<li v-for="(value, $index) in this.data" @click="selectRadio(value, $index)" :class="{on: $index == radioInex}">{{value}}</li>
								</ul>
								<div class="moveblock" :style="{transform: 'translateX(' + moveBlock + ')'}"></div>
							</div>`,
				methods: {
					selectRadio(value, index) {
						this.radioInex = index
						this.moveBlock = `${index * 30}px`
						this.$emit('callback', value)
					}
				}
			},
			XCheckbox: {
				props: ['data', 'max'],
				data() {
					return {
						values: [],
						disbaled: false
					}
				},
				template: `<div class="checkbox">
								<ul class="checkboxcell">
									<li v-for="value in this.data" @click="selectCheckox(value, $event)">{{value}}</li>
									<li class="warn">最多可选{{max}}项</li>
								</ul>
							</div>`,
				methods: {
					selectCheckox(value, e) {
						let target = e.target
						if(target.classList.contains('on')) {
							target.classList.remove('on')
							this.values = this.values.filter(v => v != value)
						} else {
							if(this.values.length == this.max) {
								return
							}
							target.classList.add('on')
							this.values.push(value)
						}
						
						this.$emit('callback', this.values)
					}
				}
			},
			XSelect: {
				props: ['options'],
				data() {
					return {
						selected: this.options[0].value
					}
				},
				template:  `<div class="selectbox">
								<select v-model="selected" @change="selectValue">
									<option v-for="option in options" :value="option.value">{{option.name}}</option>
								</select>
							</div>`,
				methods: {
					selectValue() {
						this.$emit('callback', this.selected)
					}
				}
			}
		},
		methods: {
			submitForm() {
				let data = {}
				data = Object.assign({
					username: this.username,
					phone: this.phone,
					sexy: this.sexy[0],
					week: this.weeks[0],
					tags: [],
					date: this.date,
					city: this.city[0].value,
					msg: this.msg,
					saving: this.saving,
					ending: this.ending
				}, this.formData)
				console.log(data)
				alert({
					title: '表单数据',
					content: data
				})
			},
			getSexy(value) {
				this.formData.sexy = value
			},
			getWeek(value) {
				this.formData.week = value
			},
			getTags(tags) {
				this.formData.tags = tags
			},
			getCity(value) {
				this.formData.city = value
			},
			getSaving(value) {
				this.formData.saving = value
			},
			getEnding(value) {
				this.formData.ending = value
			},
			getDays(value) {
				this.playDays = value
				this.formData.days = value
			},
			getSlider(value) {
				this.sliderValue = value
			}
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	$button()
	.formButton
		padding 15px
	.switchbox
		background-color #fff
		padding 7px 15px
		margin-top 15px
		display flex
		.switchdes
			flex-grow 1
			line-height 30px
		.switchcomp
			flex-basis 52px
	.sliderbox
		background-color #fff
		padding 7px 5px 7px 15px
		margin-top 15px
		display flex
		height 30px
		overflow hidden
		.sliderdes
			flex-basis 10em
			line-height 30px
		.slidercomp
			width calc(100% - 5em)
			flex-grow 1
			padding-top 15px
	.forms
		background-color #fff
		margin-top 15px
		.row
			padding 5px 0
			height 30px
			line-height 30px
			display flex
			border-bottom 1px solid #eee
			margin-left 15px
			&.textarea_row
				height 80px
			&.multiple_row
				height auto
				padding 5px 0 0
			label
				flex-basis 5em
				border-right 1px solid #eee
			.cell
				flex-grow 1
				width calc(100% - 5em)
				margin-left 10px
				padding-right 10px
				position relative
				input
				textarea
					border none
					outline none
					font-size 14px
				input[type=text]
				input[type=tel]
				input[type=date]
					width 100%
					height 30px
				textarea
					width 100%
					line-height 20px
					height 80px
					padding-top 5px
					resize none
				.selectbox
					position relative
					&:before
						content ''
						width 6px
						height @width
						border 1px solid #999
						border-left transparent
						border-bottom transparent
						position absolute
						right 5px
						top 12px
						transform rotate(45deg)
				select
					border none
					width 100%
					height 30px
				.radiocell
					font-size 13px
					display flex
					position relative
					z-index 10
					li
						width 30px
						height @width
						text-align center
						color #999
						$transition()
						&.on
							color #fff
				.moveblock
					width 26px
					margin 2px
					box-sizing border-box
					height @width
					position absolute
					left 0
					top 0
					z-index 1
					background-color $basebg
					border-radius 50%
					transform translateX(0)
					$transition()
				.checkboxcell
					font-size 13px
					display flex
					flex-wrap wrap
					line-height 26px
					padding-top 3px
					li
						padding 0 5px
						color #999
						margin-right 5px
						margin-bottom 6px
						$transition()
						&.on
							background-color $basebg
							border-radius 3px
							color #fff
						&.warn
							color $basebg
		.row:last-child
			border-bottom none
					
</style>