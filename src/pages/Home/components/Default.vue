<template>
    <div id="section">
        <i class="el-icon-s-fold fold" v-show="showfold" @click="handleFold"></i>
        <i class="el-icon-s-unfold fold" v-show="!showfold" @click="handleUnFold"></i>
        <div class="article-info" v-infinite-scroll="load">
            <router-link v-for="item of article" :to="'/article/' + item.article_id" :key="item.article_id">
                <el-card style="margin-top:50px">
                    <p style="margin-bottom:10px;font-weight:bold;font-size:1.6em">{{item.title}}</p>
                    <p><i class="el-icon-view" style="padding-right:3px"></i>{{item.watch}}</p>
                    <p class="summary" v-html="item.render.replace(/<\/?(img)[^>]*>/gi, '').substr(0, 200)"></p>
                </el-card>
            </router-link>
            <div style="margin:36px 0;text-align:center" v-show="showLoading">
                <i class="el-icon-loading" style="font-size:2.4em;color:#409EFF"></i>
            </div>
        </div>
        <back-top></back-top>
    </div>
</template>

<script>
import axios from 'axios'
import BackTop from '@/pages/common/BackTop'
export default {
    name: 'HomeZhuye',
    components: {
        BackTop
    },
    data () {
        return {
            showLoading: false,
            showfold: true,
            article: [],
            offset: 0,
            count: 0, // 文章总数
            y: 0
        }
    },
    methods: {
        load () { // 滑动到底部触发加载文章
            const that = this
            this.showLoading = true
            if (this.offset > this.count - 1) {
                this.showLoading = false
            } else {
                this.showLoading = true
                this.offset = this.offset + 6
                axios.get('/api/list_articles?offset=' + this.offset)
                    .then(res => {
                        res = res.data
                        if (res.success === 1) {
                            const data = res.data
                            data.forEach(item => {
                                that.article.push(item)
                            })
                        }
                        that.showLoading = false
                    })
            }
        },
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
                        that.count = res.count
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
        .fold
            padding 10px 0 0 14px
            cursor pointer
            color #bbb
            font-size 2em
        .article-info
            width 840px
            margin 20px auto
            .el-card:hover
                background #eee
            .summary
                summary()
            img
                display none
</style>
