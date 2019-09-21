<template>
  <div id="section">
        <div class="article-info">
            <router-link v-for="item of article" :to="'/article/' + item.article_id" :key="item.article_id">
                <el-card style="margin-top:30px;">
                    <p style="margin-bottom:10px;font-weight:bold;font-size:1.6em">{{item.title}}</p>
                    <p><i class="el-icon-view" style="padding-right:3px"></i>{{item.watch}}</p>
                    <p class="summary" v-html="item.render.replace(/<\/?(img)[^>]*>/gi, '').substr(0, 200) + ' ......'"></p>
                </el-card>
            </router-link>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeCategory',
    data () {
        return {
            lastTag: '',
            article: [],
            y: 0
        }
    },
    methods: {
        getListArticles (tag) {
            const that = this
            axios.get('/api/list_articles?tag=' + tag)
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
        this.lastTag = this.$route.params.tag
        this.getListArticles(this.lastTag)
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
        .article-info
            width 64%
            margin 20px auto
            .summary
                summary()
</style>
