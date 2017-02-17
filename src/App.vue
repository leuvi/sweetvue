<template>
  <div id="app">
    <div class="isloading" v-show="isloading" ontouchmove="return false">
      <div class="loading"></div>
      <p>正在加载</p>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import store from './store'
  import router from './routes'

  export default {
    store,
    data () {
      return {
        transitionName: 'slide-left',
        isloading: false
      }
    },
    watch: {
      '$route' (to, from) {
        this.isloading = false
        // const toDepth = to.path.length
        // const fromDepth = from.path.length
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    mounted() {
      //ios10禁止缩放
      document.documentElement.addEventListener('touchstart', function (event) {
          if (event.touches.length > 1) {
              event.preventDefault()
          }
      }, !1)
      let lastTouchEnd = 0
      document.documentElement.addEventListener('touchend', function (event) {
        let now = Date.now()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, !1)
     
      require('./plugins/fastclick').attach(document.body)
      router.beforeEach((to, from, next) => {
        this.isloading = true
        this.$store.dispatch('changeTop', document.body.scrollTop)
        next()
      })
      router.afterEach(route => {
        window.scrollTo(0, this.$store.state.top)
      })
    }
  }
</script>

<style lang="stylus">
    @import './assets/common.css';
    @import './assets/icon/iconfont.css';
    @import './vars.styl';
    
    html, body
      height 100%
      width 100%
    body
      background-color #f3f3f3
    
    input, textarea
      box-sizing border-box
      outline none

    header
      width 100%
      height 44px
      background $basebg
      position relative
      h1
        text-align center
        font-size 18px
        line-height 44px
        color #fff
      .back
      .about
        position absolute
        width 44px
        top 0px
        text-align center
        line-height 44px
        .iconfont
          font-size 24px
          color #fff
      .back
        left 0px
      .record
        .iconfont
          font-size 18px
      .about
        right 0px
        .iconfont
          font-size 18px
    
    .home
      h2
        padding 10px 17px
        font-size 16px
        color $basebg
      ul
        background-color #fff
        li
          line-height 44px
          border-bottom 1px solid #eee
          text-indent 1em
          position relative
          margin-left 15px
          padding-left 15px
          $transition()
          &:before
            content ''
            width 6px
            height @width
            border 1px solid #ccc
            border-left transparent
            border-bottom transparent
            position absolute
            right 15px
            top 20px
            transform rotate(45deg)
          &:last-child
            border-bottom 0
          &:active
            background-color #ededed
            text-indent 1.5em
          a
            display block
          .iconfont
            position absolute
            left -12px
            top 0
            color $basebg
    .view {
      transition: transform .4s linear;
    }
    .slide-left-enter, .slide-right-leave-active {
      transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      transform: translate(-100%, 0);
    }
    .fade-enter-active {
      transition: opacity .4s linear;
    }
    .fade-leave-active {
      transition: opacity .1s linear;
    }
    .fade-enter, .fade-leave-active {
      opacity: .3
    }
    .isloading
      position fixed
      left 0
      top 0
      bottom 0
      z-index 1000
      width 100%
      height 100%
      display flex
      justify-content center
      align-items center
      flex-direction column
      p
        padding-top 20px
        color #bbb
    $loading()
</style>
