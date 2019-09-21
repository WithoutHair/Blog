<template>
  <div id="section">
      <el-timeline>
          <el-timeline-item :timestamp="item.create_at" placement="top" v-for="item of article" :key="item.article_id">
              <router-link :to="'/article/' + item.article_id">
                  <el-card>
                      <p style="margin-bottom:2%;font-weight:bold;font-size:1.6em">{{item.title}}</p>
                      <p><i class="el-icon-view" style="padding-right:3px"></i>{{item.watch}}</p>
                  </el-card>
              </router-link>
          </el-timeline-item>
      </el-timeline>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeTime',
    data () {
        return {
            article: [],
            y: 0
        }
    },
    methods: {
        getListArticles () {
            const that = this
            axios.get('/api/list_articles')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.article = data
                    }
                })
        }
    },
    mounted () {
        this.getListArticles()
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
        .el-timeline
            width 740px
            margin 20px auto
            .el-card:hover
                background #eee
</style>
