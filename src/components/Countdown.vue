<template>
	<div class="countdown">
		<div><span>{{days}}</span>天</div>
		<div><span>{{hours}}</span>时</div>
		<div><span>{{minutes}}</span>分</div>
		<div><span>{{seconds}}</span>秒</div>
	</div>
</template>

<script>
	export default {
		props: ['endtime'],
		data() {
			return {
				days: '00',
				hours: '00',
				minutes: '00',
				seconds: '00',
				timer: ''
			}
		},
		created() {	
			this.loopTime()
		},
		destroyed() {
			clearInterval(this.timer)
		},
		methods: {
			loopTime() {
				this.timer = setInterval(() => {
					this.getTime(Date.now())
					if(~~this.interval(Date.now()) <= 0) {
						this.$emit('callback')
						this.days = this.hours = this.minutes = this.seconds = '00'
						clearInterval(this.timer)
						return
					}
				}, 1000)
			},
			interval(now) {
				const date = this.endtime.replace(/[-\s:\/\.：]/g, ',').replace(/(.{5})(\d{2})/, (v, v1, v2) => v1 + (v2 - 1)).split(',').map(v => +v)
				const timeStamp = new Date(...date).getTime()
				const interval = (timeStamp - now) / 1000
				return interval
			},
			getTime(now) {
				const interval = this.interval(now)
				const days = ~~(interval / 86400)
				const allSeconds = (interval / 86400 - ~~(interval / 86400)) * 86400
				const hours = ~~(allSeconds / 3600)
				const minutes = ~~(allSeconds / 60 - hours * 60)
				const seconds = ~~(allSeconds - hours * 60 * 60 - minutes * 60)

				this.days = days > 9 ? days : '0' + days
				this.hours = hours > 9 ? hours : '0' + hours
				this.minutes = minutes > 9 ? minutes : '0' + minutes
				this.seconds = seconds > 9 ? seconds : '0' + seconds
			}
		}
	}
</script>

<style lang="stylus">
	.countdown
		text-align center
		display flex
		width 80%
		margin 0 auto
		border 2px solid #f60
		line-height 48px
		font-size 28px
		div
			flex-grow 1
			span
				color #f60
				margin-right 2px
</style>