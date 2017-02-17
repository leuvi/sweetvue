export let filters = {
	//格式化时间戳 Date.now() -> 依赖item格式(y-m-d) -> 2008-08-08
	timeFormat(time, item) {
		time = time - 0
		time = time > 1e10 ? time : time * 1000
		let t = new Date(time)
		let tf = i => (i < 10 ? '0' : '') + i
		item = item || 'y-m-d'

		return item.replace(/y|m|d/g, function(a) {
			switch (a) {
				case 'y':
					return tf(t.getFullYear())
					break
				case 'm':
					return tf(t.getMonth() + 1)
					break
				case 'd':
					return tf(t.getDate())
					break
			}
		})
	},
	timeAgo(time) {
		let date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'))
		let diff = (((new Date()).getTime() - date.getTime()) / 1000)
		let dayDiff = Math.floor(diff / 86400)

		let isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())

		if (!isValidDate) {
			console.error('not a valid date')
		}
		const formatDate = function (date) {
	    	let today = new Date(date)
	    	let year = today.getFullYear()
	    	let month = ('0' + (today.getMonth() + 1)).slice(-2)
	    	let day = ('0' + today.getDate()).slice(-2)
	    	let hour = today.getHours()
	    	let minute = today.getMinutes()
	    	let second = today.getSeconds()
	    	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
		}

		if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
			return formatDate(date)
		}

		return dayDiff === 0 && (
	    	diff < 60 && '刚刚' ||
	    	diff < 120 && '1分钟前' ||
	    	diff < 3600 && Math.floor(diff / 60) + '分钟前' ||
	    	diff < 7200 && '1小时前' ||
	    	diff < 86400 && Math.floor(diff / 3600) + '小时前') ||
	    	dayDiff === 1 && '昨天' ||
	    	dayDiff < 7 && dayDiff + '天前' ||
	    	dayDiff < 31 && Math.ceil(dayDiff / 7) + '周前'
	},
	phoneSpace(value) {
		return value.replace(/(\d{3})(\d{1,4})/, '$1 $2 ')
	}
}

export let arrayExtend = {
	//生成数组 create(5) -> [0,1,2,3,4]
	create(number) {
		return (function _self(i, arr){
			if(i <= 1) return arr.concat(0).reverse()
			return _self((i - 1), arr.concat(i - 1))
		})(number, []) 
		//Array.apply(null, {length: 10}).map((v, k) => k)
	},
	
}

export let funcExtend = {
	//函数包装
	wrapMethod(object, method, fn) {
		let old = object[method]
		return object[method] = (...args) => {
			return fn.apply(object, [old.bind(object)].concat([...args]))
		}
	}
}

export let getJSON = url => new Promise((resolve, reject) => {
	let xhr = new XMLHttpRequest()
	xhr.open('GET', url)
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				resolve(xhr.response)
			} else {
				reject(new Error('加载失败'))
			}
		}
	}
	xhr.responseType = 'json'
	xhr.send()
})

export let rem = () => {
	let rootDoc = document.documentElement,
		resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = () => {
			let clientWidth = Math.max(rootDoc.clientWidth, window.innerWidth)
			if(!clientWidth) return
			rootDoc.style.fontSize = 20 * (clientWidth / 320) + 'px'
		}
	recalc()
	window.addEventListener(resizeEvent, recalc, !1)
	window.addEventListener('DOMContentLoaded', recalc, !1)
}


export let historyPopstate = () => {
	history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
    })
}

export default (() => {
	Object.assign(Function.prototype, {
		memoized(key) {
			this._cache = this._cache || {}
	 		return this._cache[key] ? this._cache[key] : this._cache[key] = this.apply(this, arguments)
		},
		memoize() {
			return (...args) => this.memoized.apply(this, [...args])
		}
	})
})()