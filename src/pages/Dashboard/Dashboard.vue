<template>
  <div style="background:#fff" id="sidebar-dash" >
      <dashboard-blogging></dashboard-blogging>
  </div>
</template>

<script>
import DashboardEditor from './components/Editor'
export default {
    name: 'Dashboard',
    components: {
        DashboardEditor
    }
}
</script>

<style lang="stylus" scoped>
    #sidebar-dash
        position absolute
        top 0
        right 0
        bottom 0
        left 0
</style>
