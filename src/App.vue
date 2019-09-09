<template>
    <div id="app">
        <div class="loading" v-if="showLoading">
            <img src="~styles/images/loading.gif">
        </div>
        <Home v-show="showHome"></Home>
        <Dashboard v-show="showDashboard"></Dashboard>
        <keep-alive>
            <router-view :key="key"/>
        </keep-alive>
    </div>
</template>

<script>
import Home from '@/pages/Home/Home'
import Dashboard from '@/pages/Dashboard/Dashboard'
export default {
  name: 'App',
  data () {
      return {
          showLoading: true
      }
  },
  components: {
      Home,
      Dashboard
  },
  computed: {
      key () {
          return this.$route.path + Math.random()
      },
      showHome () {
          if (this.$route.name === 'Zhuye' || this.$route.name === 'Time' ||
              this.$route.name === 'About' || this.$route.name === 'Article' ||
              this.$route.name === 'Category') return true
          else return false
      },
      showDashboard () {
          if (this.$route.name === 'Profile' || this.$route.name === 'Blog') return true
          else return false
      }
  },
  mounted () {
      const that = this
      document.onreadystatechange = function () {
          if (document.readyState === 'complete') {
              that.showLoading = false
          }
      }
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
    .loading
        z-index 1
        display flex
        align-items center
        justify-content center
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background #fff
</style>
