import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)


new Vue({
	router,
	render(h) {
		return h(require('./App'))
	}
}).$mount('#app')


