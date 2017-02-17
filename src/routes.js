import Vue from 'vue'
import VueRouter from 'vue-router'


const router = new VueRouter({
	// mode: 'history',
	// scrollBehavior (to, from, savedPosition) {
	// 	if(savedPosition) {
	// 		return savedPosition
	// 	}else {
	// 		return { x: 0, y: 0 }
	// 	}
	// },
	routes: [
		{
			path: '/', 
			component: resolve => require(['./pages/home.vue'], resolve)
		},
		/*Form part*/
		{
			path: '/login',
			component: resolve => require(['./pages/login.vue'], resolve)
		},
		{
			path: '/regist',
			component: resolve => require(['./pages/regist.vue'], resolve)
		},
		{
			path: '/upload', 
			component: resolve => {
				require(['./pages/uploadpage.vue'], resolve)
			}
		},
		{
			path: '/forms', 
			component: resolve => {
				require(['./pages/forms.vue'], resolve)
			}
		},
		/*UI part*/
		{
			path: '/slide', 
			component: resolve => {
				require(['./pages/slidepage.vue'], resolve)
			}
		},
		{
			path: '/tab', 
			component: resolve => {
				require(['./pages/tabpage.vue'], resolve)
			}
		},
		{
			path: '/totop', 
			component: resolve => {
				require(['./pages/totoppage.vue'], resolve)
			}
		},
		{
			path: '/progress', 
			component: resolve => {
				require(['./pages/progresspage.vue'], resolve)
			}
		},
		{
			path: '/actionsheet', 
			component: resolve => {
				require(['./pages/actionsheetpage.vue'], resolve)
			}
		},
		{
			path: '/datepicker', 
			component: resolve => {
				require(['./pages/datepickerpage.vue'], resolve)
			}
		},
		{
			path: '/citypicker', 
			component: resolve => {
				require(['./pages/citypickerpage.vue'], resolve)
			}
		},
		{
			path: '/dialog',
			component: resolve => {
				require(['./pages/dialogpage.vue'], resolve)
			}
		},
		{
			path: '/toast',
			component: resolve => {
				require(['./pages/toastpage.vue'], resolve)
			}
		},
		{
			path: '/fullpage',
			component: resolve => {
				require(['./pages/fullpage.vue'], resolve)
			}
		},
		{
			path: '/scroller',
			component: resolve => {
				require(['./pages/scrollerpage.vue'], resolve)
			}
		},
		{
			path: '/infinite',
			component: resolve => {
				require(['./pages/infinitepage.vue'], resolve)
			}
		},
		/*Effect part*/
		{
			path: '/css', 
			component: resolve => {
				require(['./pages/csspage.vue'], resolve)
			}
		},
		{
			path: '/center', 
			component: resolve => {
				require(['./pages/centerpage.vue'], resolve)
			}
		},
		{
			path: '/snow', 
			component: resolve => {
				require(['./pages/snowpage.vue'], resolve)
			}
		},
		{
			path: '/rain', 
			component: resolve => {
				require(['./pages/rainpage.vue'], resolve)
			}
		},
		{
			path: '/card', 
			component: resolve => {
				require(['./pages/cardpage.vue'], resolve)
			}
		},
		{
			path: '/lottery', 
			component: resolve => {
				require(['./pages/lotterypage.vue'], resolve)
			}
		},
		{
			path: '/countdown', 
			component: resolve => {
				require(['./pages/countdownpage.vue'], resolve)
			}
		},
		{
			path: '/recommend', 
			component: resolve => {
				require(['./pages/recommend.vue'], resolve)
			}
		},
		{
			path: '/rem', 
			component: resolve => {
				require(['./pages/rempage.vue'], resolve)
			}
		},
		{
			path: '/parallax', 
			component: resolve => {
				require(['./pages/parallax.vue'], resolve)
			}
		},
		//404
		{
			path: '*',
			component: require('./pages/404.vue')
		}
	]
})


export default router