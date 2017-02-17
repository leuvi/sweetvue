<template>
  <div class="home">
    <!-- <header>
      <h1>Home</h1>
      <div class="back record" @click="record"><i class="iconfont icon-form"></div>
      <div class="about" @click="about"><i class="iconfont icon-help"></div>
    </header> -->
    <div class="isnow">
      <Snow nums="50" />
    </div>
    <div class="logo">
      <div class="d3box" @click="about">
        <dl id="cube" :style="logoStyle">
          <dd class="front"><i class="iconfont icon-toys"></i></dd>
          <dd class="back">{{back}}</dd>
          <dd class="left">{{left}}</dd>
          <dd class="right">{{right}}</dd>
          <dd class="top">{{top}}</dd>
          <dd class="bottom">{{bottom}}</dd>
        </dl>
      </div>
    </div>
    <!-- <canvas id="bars"></canvas> -->
    <h2>Form</h2>
    <ul>
      <li><i class="iconfont icon-account"></i><router-link to="/login">login</router-link></li>
      <li><i class="iconfont icon-survey"></i><router-link to="/regist">regist</router-link></li>
      <li><i class="iconfont icon-folder"></i><router-link to="/upload">upload</router-link></li>
      <li><i class="iconfont icon-form"></i><router-link to="/forms">form cells</router-link></li>
    </ul>
    <h2>UI</h2>
    <ul>
      <li><i class="iconfont icon-pic"></i><router-link to="/slide">slide</router-link></li>
      <li><i class="iconfont icon-viewlist"></i><router-link to="/tab">tab</router-link></li>
      <li><i class="iconfont icon-calendar"></i><router-link to="/datepicker">datepicker</router-link></li>
      <li><i class="iconfont icon-map"></i><router-link to="/citypicker">citypicker</router-link></li>
      <li><i class="iconfont icon-process"></i><router-link to="/progress">progress bar</router-link></li>
      <li><i class="iconfont icon-less"></i><router-link to="/totop">totop</router-link></li>
      <li><i class="iconfont icon-all"></i><router-link to="/actionsheet">actionsheet</router-link></li>
      <li><i class="iconfont icon-comments"></i><router-link to="/dialog">dialog</router-link></li>
      <li><i class="iconfont icon-information"></i><router-link to="/toast">toast</router-link></li>
      <li><i class="iconfont icon-electronics"></i><router-link to="/fullpage">fullpage</router-link></li>
      <li><i class="iconfont icon-rfq"></i><router-link to="/scroller">scroller</router-link></li>
      <li><i class="iconfont icon-rfq"></i><router-link to="/infinite">infinite scroller</router-link></li>
    </ul>
    <h2>Effect</h2>
    <ul>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/css">css effect</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/center">center</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/snow">snow</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/rain">rain</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/lottery">lottery</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/card">scratch card</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/countdown">countdown</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/recommend">recommend</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/rem">rem</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/parallax">parallax</router-link></li>
      <li><i class="iconfont icon-creditlevel"></i><router-link to="/404">未完待续...</router-link></li>
    </ul>
    <footer>©{{year}} 苹果熊</footer>
    <dialog-component />
  </div>
</template>

<script>
  import DialogComponent from '../components/Dialog'
  import $ from '../plugins/jquery'
  import Snow from '@/Snow'

  export default {
    data() {
      return {
        logoStyle: '',
        front: '',
        back: '',
        left: '',
        right: '',
        top: '',
        bottom: '<Vue />'
      }
    },
    components: {
      DialogComponent,
      Snow
    },
    mounted() {
      this.logo()
    },
    computed: {
      year() {
        return new Date().getFullYear()
      }
    },
    methods: {
      record() {
        alert({
          title: '更新记录',
          content: `<div style="text-align: left; padding: 0 10px; font-size: 12px">
          2016-11-22 添加countdown <br>
          2016-11-16 添加scroller和infinite scroller <br>
          2016-11-14 添加citypicker <br>
          2016-11-10 添加fullpage <br>
          2016-11-7 添加toast <br>
          2016-11-1 上线 <br>
          </div>`
        })
      },
      about() {
        alert({
          title: '( # ▽ # )',
          content: `<div style="text-align: left; padding: 0 10px; font-size: 12px">关于该项目还没起名，大概分为Form、UI、Effect、Data等四类的组件小单元，后续会陆续补充完善<br>
          前端：Vue2.0+ES6+Stylus+iconfont字体库<br>后端：开发接口NodeJS代理，生产接口PHP模拟数据<br>
          构建工具：npm+webpack<br>
          Wechat：ringokuma<br>
          Email: 528046@qq.com
          </div>`
        })
      },
      logo() {
        let x = 0,
            y = 0,
            _self = this
        function _move() {
          if (x == 360) {
            x = 0
            y = 0
          }
          _self.logoStyle = `transform: rotateX(${x++}deg) rotateY(${y++}deg)`
          window.requestAnimationFrame(_move)
        }
        _move()
      },
      createCanvas() {
        let c = document.getElementById('bars'), 
              a = c.getContext('2d'), 
              w = c.width = window.innerWidth, 
              h = c.height = 100, 
              rw = h / parseInt(Math.random()*10),
              q = 0,
              r = 0

        init()
        function init() {
            a.clearRect(0, 0, w, h)
            const rw = 20
            q = [{x: 0, y: rw}, {x: 0, y: rw + h / 10}]
            while(q[1].x < w + rw) {                    
                draw(q[0], q[1])
            }
        }
        function draw(i, j) {
            a.beginPath()
            a.moveTo(i.x, i.y)
            a.lineTo(j.x, j.y)
            let k = j.x + (Math.random() * 2 - 0.5) * rw
            let n = target(j.y)
            r -= Math.PI * 2 / -50
            a.lineTo(k, n)
            a.closePath()            
            a.globalAlpha = 0.6
            a.fillStyle = '#' + (Math.cos(r) * 127 + 128 << 16 | Math.cos(r + Math.PI * 2 / 3) * 127 + 128 << 8 | Math.cos(r + Math.PI * 2 / 3 * 2) * 127 + 128).toString(16)
            a.fill()
            q[0] = q[1]
            q[1] = {x: k, y: n}
        }
        function target(p) {
            let t = p + (Math.random() * 2 - 1) * rw
            return (t > h || t < 0) ? target(p) : t
        }
      }
    }
  }
</script>

<style lang="stylus">
  .home
    background url('../assets/topbg.jpg') no-repeat center top
    background-size 100% 210px
  .isnow
    position absolute
    z-index 1
    width 100%
    height 210px
  .logo
    text-align center
    padding-top 50px
    padding-bottom 30px
    position relative
    z-index 10
  footer
    color #aaa
    text-align center
    padding-top 20px
    padding-bottom 15px
  .d3box
    width 80px
    height @width
    perspective 200px
    display inline-block
    position relative
    &:before
      position absolute
      content ''
      bottom 0px
      left 16px
      width 60%
      height 20px
      background none
      // box-shadow 0 45px 15px #ccc
      border-radius 40%
  .d3box dl
    width 60px
    height @width
    padding-top 30px
    margin 0 auto
    transform-style preserve-3d
    background-color none
    dd 
      position absolute
      width 60px
      height @width
      line-height 60px
      text-align center
      border 1px solid rgba(255, 255, 255, .7)
      color #fff
      font-size 12px
      border-radius 50%
      background rgba(255, 255, 255, .1)
      &.front
        transform rotateY(0deg) translateZ(10px)
      &.back
        transform rotateY(180deg) translateZ(10px)
      &.left
        transform rotateY(-90deg) translateZ(10px)
      &.right
        transform rotateY(90deg) translateZ(10px)
      &.top
        transform rotateX(90deg) translateZ(10px)
      &.bottom
        transform: rotateX(-90deg) translateZ(10px)
</style>