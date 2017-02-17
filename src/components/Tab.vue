<template>
	<div class="tab">
		<div class="tabnav">
			<ul>
				<li v-for="(tab, $index) in tabdata" @click="tap($index)" :class="{active: $index == cur}">{{tab.name}}</li>
			</ul>
			<div class="line" :style="{width: lineWidth + '%', left: lineLeft + '%'}"></div>
		</div>
		<div class="tabbox" v-if="request">
			<div class="tabcont" v-for="(tab, $index) in tabdata" v-show="$index == cur">
				<req-data :api="tab.resource" :contCur="$index" ref="child"></req-data>
			</div>
		</div>
		<div class="tabbox" v-else>
			<div class="tabcont" v-for="(tab, $index) in tabdata" v-show="$index == cur">{{tab.resource}}</div>
		</div>
	</div>
</template>

<script>
	import {getJSON} from '../util'

	const errorMsg = "<div class='errormsg'><span>数据加载失败</span></div>"

	export default {
		props: ['tabdata', 'request'],
		data() {
			return {
				cur: 0
			}
		},
		methods: {
			tap($index) {
				this.cur = $index
				if(this.request && $index > 0) {
					if(!this.$refs.child[$index].loaded) return;
					getJSON(this.tabdata[$index].resource)
					.then(data => {
						this.$refs.child[$index].loaded = false
						if(data.content) {
							this.$refs.child[$index].infos = data.content
						} else {
							this.$refs.child[$index].infos = errorMsg
						}
					})
				}
			}
		},
		components: {
			reqData: {
				props: ['contCur', 'api', 'cache'],
				data() {
					return {
						infos: '',
						firstData: '',
						loaded: true
					}
				},
				template: `<div>
							<div :class="{loading: loaded}" class="infopage" v-html="contCur == 0 ? firstData : infos"></div>
						</div>`,
				created() {
					if(this.contCur == 0) {
						getJSON(this.api)
						.then(data => {
							this.loaded = false
							if(data.content) {
								this.firstData = data.content
							} else {
								this.firstData = errorMsg
							}
						})
					}
				}
			}
		},
		computed: {
			lineWidth() {
				return 100/this.tabdata.length
			},
			lineLeft() {
				return this.lineWidth * this.cur
			},
			getData() {
				return this.tabdata
			}
		},
		created() {
			//console.log(this.tabdata)
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl'
	
	.tabnav 
		position relative
		border-bottom 2px solid #eee
		.line
			position absolute
			height 2px
			background $basebg
			$transition()
	.tab 
		background #fff
		ul 
			width 100%
			display flex
			li
				flex-grow 1
				height 40px
				line-height 40px
				text-align center
				$transition()
				&.active
					color $basebg
	.tabbox 
		width 100%
		.tabcont
			padding 10px
	.infopage
		min-height 100px
	.tab .errormsg
		height 100px
		display flex
		justify-content center
		align-items center
		span
			color #aaa
			
</style>