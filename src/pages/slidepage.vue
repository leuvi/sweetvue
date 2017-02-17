<template>
	<layout title="Slide">
		<Slide :url="lunboAPI" :autoplay="true" time="3000" />
		<div class="des">
			<p>调用方式</p>
			<p>{{slidedes}}</p>
			<p>imgdata: 数据源，autoplay: 自动播放，time: 滚动间隔</p>
		</div>
	</layout>
</template>

<script>
	import layout from './main'
	import Slide from '../components/Slide'
	import {lunboAPI} from '../api'

	export default {
		data() {
		    return {
		    	lunboAPI: 'http://www.sweetui.com/demo/api/imgdata.php',
		    	slidedes: `<Slide :imgdata="imgdata" :autoplay="true" time="3000" />`
		    }
		},
		components: {
			layout,
			Slide
		}
	}
</script>