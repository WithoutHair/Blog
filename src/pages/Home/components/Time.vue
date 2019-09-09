<template>
  <div id="section">
      <i class="el-icon-s-fold fold" v-show="showfold" @click="handleFold"></i>
      <i class="el-icon-s-unfold fold" v-show="!showfold" @click="handleUnFold"></i>
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
            showfold: true,
            article: []
        }
    },
    methods: {
        handleFold () {
            const sidebar = document.querySelector('#sidebar')
            const section = document.querySelector('#section')
            sidebar.style.marginLeft = -100 + '%'
            section.style.width = 100 + '%'
            this.showfold = !this.showfold
        },
        handleUnFold () {
            const sidebar = document.querySelector('#sidebar')
            const section = document.querySelector('#section')
            sidebar.style.marginLeft = 0
            section.style.width = 83.3 + '%'
            this.showfold = !this.showfold
        },
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
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section
        section()
        .fold
            padding 10px 0 0 14px
            cursor pointer
            color #bbb
            font-size 2em
        .el-timeline
            width 64%
            margin 20px auto
            .el-card:hover
                background #eee
</style>
