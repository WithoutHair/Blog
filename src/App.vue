<template>
    <div id="app">
        <Home v-show="showHome"></Home>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import Home from '@/pages/Home/Home'
export default {
  name: 'App',
  components: {
      Home
  },
  computed: {
      showHome () {
          if (this.$route.name === 'Zhuye' || this.$route.name === 'Time' || this.$route.name === 'About' || this.$route.name === 'Article') return true
          else return false
      }
  },
  mounted () {
      window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1) // 获取输入的路由
          if (this.$router.path !== currentPath) {
              this.$router.push(currentPath) // 动态跳转
          }
      }, false)
  }
}
</script>

<style lang="stylus">
    body *::-webkit-scrollbar
        width 5px
        height 5px
        background transparent
    body *::-webkit-scrollbar-thumb
        background rgba(0, 0, 0, .2)
</style>
