<template>
    <div id="section">
        <div class="header">
            <h1 style="font-weight:bold;font-size:2.4em">{{article.title}}</h1>
        </div>
        <div class="markdown-body content" v-html="article.render">
            {{article.render}}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeArticle',
    data () {
        return {
            lastid: 0,
            article: {}
        }
    },
    methods: {
        getArticle (id) {
            const that = this
            axios.get('/api/article_detail?id=' + id)
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
        this.lastid = this.$route.params.id
        this.getArticle(this.lastid)
    },
    activated () {
        if (this.$route.params.id !== this.lastid) {
            this.lastid = this.$route.params.id
            this.getArticle(this.lastid)
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section
        section()
        .header
            width 80%
            margin 2% auto
            padding 2%
            border-bottom 1px solid #e0e0e0
        .content
            width 80%
            margin 2% auto
            padding 2%
            box-shadow 1px 1px 4px 0
</style>
