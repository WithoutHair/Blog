<template>
  <div id="section">关于</div>
</template>

<script>
export default {
    name: 'HomeAbout',
    data () {
        return {
            y: 0
        }
    },
    activated () {
        document.querySelector('#section').scrollTop = this.y || 0
    },
    beforeRouteLeave (to, from, next) {
        this.y = document.querySelector('#section').scrollTop
        next()
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section
        section()
</style>
