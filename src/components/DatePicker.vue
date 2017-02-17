<template>
	<div class="datepicker" id="datepicker"></div>
</template>

<script>
	class DatePick {
		constructor(dateStart, option) {
			Object.assign(this, {dateStart, option})
			let opt = this.option || {}
			let now = this.formatDate(this.dateStart, 'yyyy-mm-dd').split('-')
			//let now = this.dateStart.split('-')
			this.year = +now[0]
			this.month = +now[1]
			this.day = +now[2]
			this.datenum = dateStart
			this.monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			this.callback = opt.callback
			this.elemNode = opt.elemNode
			this.isIntYear = opt.isIntYear
			this.lastSelect = null
			this.months = opt.months
			this.specialDay = Object.assign({
				'10-1': '国庆节',
				'5-1': '劳动节',
				'12-24': '平安夜',
				'12-25': '圣诞节',
				'1-1': '元旦',
				'2-14': '情人节',
				'3-8': '妇女节',
				'6-1': '儿童节'
			}, opt.specialDay); //注：农历节日需手动配置
			try {
				this.init()
			} catch (e) {
				console.log(e)
			}
		}

		init() {
			//创建DOM
			this.createDom()

			//本月已经过去的天数
			this.pastDay()

			//显示一整年的天数
			!this.isIntYear && this.futureDay()

			//特殊节假日添加文字
			this.addSpecialDay()

			//添加昨天明天文字
			//this.addSiblingsDay()

			//绑定事件
			this.bindEvent()
		}
		getFirstDay(year, month) {
			return new Date(+year, (+month) - 1, 1).getDay()
		}
		createDom() {
			let m = 0
			let yearHtml = ''
			let year = ''
			let month = ''
			let datebox = document.createElement('div')
			datebox.className = 'datebox'
			datebox.id = this.elemNode

			yearHtml += `<div class='datebar'><i class='dateback'></i><h1>选择日期</h1></div>`
			yearHtml += `<div class='week'><ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div>`
			yearHtml += `<div class='year'><div class='month'>`

			while (m < this.months + 1) {
				year = (parseInt(this.month, 10) + m) > 12 ? parseInt(this.year, 10) + 1 : parseInt(this.year, 10)
				month = (parseInt(this.month, 10) + m) > 12 ? parseInt(this.month, 10) + m - 12 : parseInt(this.month, 10) + m
				yearHtml += this.monthDom(year, month, m)
				m++
			}
			yearHtml += `</div></div>`
			datebox.innerHTML = yearHtml;
			document.getElementById('datepicker').appendChild(datebox)
		}
		monthDom(year, month, idx) {
			let firstDay = this.getFirstDay(year, month)
			let dayLen = this.isLeap(year) && (+month) == 2 ? this.monthArr[+month - 1] + 1 : this.monthArr[+month - 1]
			let emptyLi = ''
			let dayLi = ''
			for (let i = 0; i < firstDay; i++) {
				emptyLi += '<li></li>'
			}
			for (let j = 1; j <= dayLen; j++) {
				dayLi += '<li data-date=' + year + '-' + month + '-' + j + '>' + j + '</li>'
			}
			let monthName = '<div class=\'monthname\'>' + year + '年' + month + '月</div>'
			let daysHtml = monthName + '<div class=\'days clearfix\' data-idx=' + idx + '><ul>'
			daysHtml += emptyLi
			daysHtml += dayLi
			daysHtml += '</ul></div>'
			return daysHtml
		}
		isLeap(year) {
			if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				return true
			} else {
				return false
			}
		}
		pastDay() {
			let firstLis = document.querySelector('#' + this.elemNode + ' .days ul').getElementsByTagName('li')
			for (var i = 0; i < firstLis.length; i++) {
				if (+firstLis[i].innerText == +this.day) {
					firstLis[i].innerText = '今天'
					firstLis[i].classList.add('on')
					break
				}
				firstLis[i].classList.add('disabled')
			}
		}
		relationPastDay(time) {
			let selectTime = time.split('-');
			let selectDay = document.querySelector('#' + this.elemNode + ' li[data-date="' + selectTime[0] + '-' + (+selectTime[1]) + '-' + (+selectTime[2]) + '"]')
			let selectIdx = selectDay.parentNode.parentNode.dataset.idx
			let lis = document.querySelectorAll('#' + this.elemNode + ' li')

			for (let j = 0; j < lis.length; j++) {
				lis[j].className = ''
			}
			for (let i = 0; i < lis.length; i++) {
				if (lis[i] == selectDay) {
					break
				}
				lis[i].classList.add('disabled')
			}
			this.futureDay()
		}
		futureDay() {
			let lastDays = document.querySelectorAll('#' + this.elemNode + ' .days')[this.months]
			let lastDaysLis = lastDays.getElementsByTagName('li')
			let len = lastDaysLis.length
			if (this.day == 1) {
				lastDays.style.display = 'none'
				lastDays.previousElementSibling.style.display = 'none'
				return
			}
			for (let i = 0; i < len; i++) {
				lastDaysLis[i].classList.add('disabled');
				for (let j = 0; j < len; j++) {
					if (lastDaysLis[j].innerText == '' || (+lastDaysLis[j].dataset.date.split('-')[2]) < this.day) {
						lastDaysLis[j].classList.remove('disabled')
					}
				}
			}
		}
		addSpecialDay() {
			let lis = document.querySelectorAll('#' + this.elemNode + ' li[data-date]')
			let len = lis.length
			for (var i = 0; i < len; i++) {
				if (lis[i].dataset.date.substr(5) in this.specialDay) {
					let name = document.createElement('i')
					name.innerText = this.specialDay[lis[i].dataset.date.substr(5)]
					lis[i].appendChild(name)
				}
			}
		}
		addSelect() { //添加本日on样式
			let today = document.querySelector('#' + this.elemNode + ' li[data-date="' + this.year + '-' + this.month + '-' + this.day + '"]')
			today.classList.add('on')
		}
		intoSelect(datetime) {
			let d = datetime.split('-')
			let lis = document.querySelectorAll('#' + this.elemNode + ' .month li')
			let selectLi = document.querySelector('#' + this.elemNode + ' li[data-date="' + d[0] + '-' + (+d[1]) + '-' + (+d[2]) + '"]')
			for (let j = 0; j < lis.length; j++) {
				lis[j].classList.remove('on')
			}
			selectLi.classList.add('on')
			this.intoMonth(selectLi)
		}
		intoMonth(elem) {
			let year = document.querySelector('#' + this.elemNode + ' .year')
			let days = document.querySelectorAll('#' + this.elemNode + ' .days')
			let monthNameH = document.querySelector('#' + this.elemNode + ' .monthname').scrollHeight + 1
			let sTop = 0
			let pNode = elem.parentNode.parentNode

			for (var i = 0; i < days.length; i++) {
				if (days[i] == pNode) {
					break
				}
				sTop += days[i].scrollHeight
			}
			sTop += pNode.dataset.idx * monthNameH
			year.scrollTop = sTop
		}
		addSiblingsDay(){
			let pre = this.formatDate((this.timeStamp(this.datenum) - 24*60*60*1000), 'yyyy-mm-dd').split('-').map(function(v){return +v}).join('-')
			let next = this.formatDate((this.timeStamp(this.datenum) + 24*60*60*1000), 'yyyy-mm-dd').split('-').map(function(v){return +v}).join('-')
			if(document.querySelector('#' + this.elemNode + ' li[data-date="' + pre + '"]').length){
				document.querySelector('#' + this.elemNode + ' li[data-date="' + pre + '"]').innerText = '今天'
			}
			document.querySelector('#' + this.elemNode + ' li[data-date="' + next + '"]').innerText = '后天'
			
		}
		bindEvent() {
			let self = this
			let lis = document.querySelectorAll('#' + this.elemNode + ' .month li')
			let len = lis.length
			let dateback = document.querySelector('#' + this.elemNode + ' .dateback')
			let parentNode = document.getElementById(this.elemNode)
			let elem = document.querySelectorAll('[data-id="' + this.elemNode + '"]')

			for (let i = 0; i < len; i++) {
				lis[i].onclick = function() {
					if (this.innerText == '' || this.classList.contains('disabled')) {
						return
					}
					for (var j = 0; j < len; j++) {
						lis[j].classList.remove('on');
					}
					this.classList.add('on')
					self.lastSelect = self.dateNum(this.dataset.date)
					for(var k = 0; k < elem.length; k++){
						elem[k].innerHTML = self.dateNum(this.dataset.date)
					}

					//添加特别节日文本
					//elem.innerHTML = this.querySelector('i') ? self.dateNum(this.dataset.date) + '<i>' + this.querySelector('i').innerText + '</i>' : self.dateNum(this.dataset.date);
					setTimeout(function() {
						_transAfter()
						self.callback()
					}, 100)
				}
			}

			dateback.onclick = function() {
				_transAfter()
			}

			function _transAfter() {
				parentNode.classList.remove('trans')
				parentNode.addEventListener('webkitTransitionEnd', _transBefor, false)
			}

			function _transBefor() {
				parentNode.classList.remove('show')
				parentNode.removeEventListener('webkitTransitionEnd', _transBefor, false)
			}
		}
		dateNum(str) {
			let tmp = str.split('-')
			let mon = tmp[1] > 9 ? tmp[1] : '0' + tmp[1]
			let day = tmp[2] > 9 ? tmp[2] : '0' + tmp[2]
			let num = tmp[0] + '-' + mon + '-' + day
			return num
		}
		formatDate(timestamp, format) {
			var t = new Date(timestamp)
			var tf = function(i) {
				return (i < 10 ? '0' : '') + i
			}
			return format.replace(/yyyy|mm|dd/g, function(a) {
				switch (a) {
					case 'yyyy':
						return tf(t.getFullYear())
						break
					case 'mm':
						return tf(t.getMonth() + 1)
						break
					case 'dd':
						return tf(t.getDate())
						break
				}
			})
		}
		timeStamp(str) {
			let arr = str.split('-')
			let year = +arr[0]
			let month = +arr[1]
			let day = +arr[2]
			return new Date(year, month - 1, day).getTime()
		}
	}
	export default {
		props: ['months', 'rid'],
		methods: {
			enter() {
				let datebox = document.getElementById(this.rid)
				datebox.classList.add('show')
				setTimeout(function() {
					datebox.classList.add('trans')
				}, 200)
			}
		},
		mounted() {
			let _this = this
			new DatePick(Date.now(), {
				elemNode: this.rid, 
				months: _this.months,
				callback() {
					_this.$emit('callback', this.lastSelect)
				}
			})//.intoSelect(selectTime)
		}
	}
</script>

<style lang="stylus">
	@import '../vars.styl';
	
	.datebox {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: #fff;
		font-size: 16px;
		transition: transform .2s ease-out;
		transform: translate3d(0, 100%, 0);
		display: none;
	/*	will-change: transform;*/
	}
	.datebox.trans {
		transform: translate3d(0, 0, 0);
	}
	.datebox.show {
		display: block;
	}
	.datebar {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		color: #fff;
		background: $basebg
	}
	.datebar h1 {
		font-size: 18px;
	}
	.datebar .dateback {
		width: 44px;
		height: 44px;
		display: block;
		position: absolute;
		left: 0;
		top: 0;
	}
	.datebar .dateback:before {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		margin-top: -8px;
		width: 10px;
		height: 10px;
		border: 1px solid #FFF;
		border-width: 0 0 2px 2px;
		transform: rotate(-45deg);
		left: 20px;
	}
	.week {
		height: 30px;
		line-height: 30px;
		width: 100%;
		position: absolute;
		left: 0;
		top: 44px;
		border-bottom: 1px solid #ddd;
		background: #fff;
		z-index: 100;
	}
	.week li {
		width: 14.2857%;
		float: left;
		text-align: center;
	}
	.year {
		margin-top: 74px;
		padding-bottom: 74px;
		padding-top: 0;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}
	.month {
		width: 100%;
		position: relative;
	}
	.month .monthname {
		line-height: 48px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		font-weight: bold;
		text-align: center;
		background: #f9f9f9;
		margin-top: -1px;
	}
	.month ul {
		width: 100%;
	}
	.month li {
		width: 14.2857%;
		height: 48px;
		line-height: 52px;
		position: relative;
		text-align: center;
		border-bottom: 1px solid #eee;
		float: left;
		overflow: hidden;
		box-sizing: border-box;
	}
	.month li.on {
		background: $basebg
		color: #fff;
	}
	.month li i {
		display: block;
		width: 100%;
		text-align: center;
		line-height: 12px;
		font-size: 12px;
		position: absolute;
		left: 0;
		top: 2px;
	}
	.month .days li:nth-child(7n),
	.month .days li:nth-child(7n+1),
	.week li:nth-child(1),
	.week li:nth-child(7) {
		color: $basebg
	}
	.month li.disabled,
	.month .days li:nth-child(7n).disabled,
	.month .days li:nth-child(7n+1).disabled {
		color: #ccc;
	}
	.month .days li:nth-child(7n).on,
	.month .days li:nth-child(7n+1).on {
		color: #fff;
	}

</style>