<template>
    <div>
        <i class="el-icon-s-fold fold" v-show="showfold" @click="handleFold"></i>
        <i class="el-icon-s-unfold fold" v-show="!showfold" @click="handleUnFold"></i>
        <div class="article-info">
            <el-card
                v-for="item of articles"
                :timestamp="item.create_at"
                placement="top"
                :key="item.article_id"
                @click.native="handleClick(item.article_id)">
                <h3 style="margin-bottom:1%;font:1.4em;font-weight:bold;font-size:20px">{{item.title}}</h3>
                <p><i class="el-icon-view" style="padding-right:3px"></i>{{item.watch}}</p>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HomeZhuye',
    data () {
        return {
            showfold: true,
            article: {}
        }
    },
    props: {
        articles: Array
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
            section.style.width = 83.333 + '%'
            this.showfold = !this.showfold
        },
        handleClick (val) {
            const that = this
            axios.get('/api/article_detail', {
                params: {
                    id: val
                }
            })
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        that.article = res.data
                    }
                })
            this.$emit('change', this.article)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .fold
        padding 10px 0 0 14px
        cursor pointer
        color #bbb
        font-size 2em
    .article-info
        width 70%
        margin 0 auto
        margin-top 2%
        .el-card
            cursor pointer
        &:hover
            box-shadow 0 2px 24px 0 rgba(0,0,0,.1)
</style>
