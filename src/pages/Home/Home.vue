<template>
    <el-row>
        <el-col :lg="{span: 4}" id="sidebar" ref="sidebar" style="overflow:auto;position:fixed;top:0;bottom:0;transition:margin .8s">
            <div class="home-info">
                <div class="info-img" v-show=false></div>
            </div>
            <el-menu>
                <el-menu-item index="1" @click="showWhich = 'Zhuye'">
                    <i class="el-icon-s-home" style="color:#2196f3"></i>
                    <span slot="title">主页</span>
                </el-menu-item>
                <el-menu-item index="2" @click="showWhich = 'Time'">
                    <i class="el-icon-date" style="color:#ff5722"></i>
                    <span slot="title">时间</span>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-collection-tag" style="color:#4caf50"></i>
                        <span slot="title">分类</span>
                    </template>
                    <el-menu-item :index="3-item.tag_id" v-for="item of tags" :key="item.tag_id"  @click="showWhich = 'Category'">
                        {{item.tag}}
                        <span class="artcount">{{item.count}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="4" @click="showWhich = 'About'">
                    <i class="el-icon-user" style="color:#9c27b0"></i>
                    <span slot="title">关于</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :lg="{span: 20}" id="section" style="overflow:scroll;overflow-x:hidden;position:fixed;right:0;transition:width .6s">
            <home-zhuye :articles="articles" v-show="showWhich == 'Zhuye'" @change="showArticle"></home-zhuye>
            <home-time v-show="showWhich == 'Time'"></home-time>
            <home-category v-show="showWhich == 'Category'"></home-category>
            <home-about v-show="showWhich == 'About'"></home-about>
            <home-article v-show="showWhich == 'Article'" :article="article"></home-article>
        </el-col>
    </el-row>
</template>

<script>
import HomeZhuye from './components/Zhuye'
import HomeTime from './components/Time'
import HomeCategory from './components/Category'
import HomeAbout from './components/About'
import HomeArticle from './components/Article'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
        HomeZhuye,
        HomeTime,
        HomeCategory,
        HomeAbout,
        HomeArticle
    },
    data () {
        return {
            tags: [],
            articles: [], // 文章列表
            showWhich: 'Zhuye',
            article: {} // 将要显示的文章
        }
    },
    methods: {
        handleTag () {
            const that = this
            axios.get('/api/listTags')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.tags = data
                    }
                })
        },
        getArticleInfo () {
            const that = this
            axios.get('/api/list_articles')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.articles = data
                    }
                })
        },
        showArticle (val) {
            this.showWhich = 'Article'
            this.article = val
        }
    },
    mounted () {
        this.handleTag()
        this.getArticleInfo()
    }
}
</script>

<style lang="stylus" scoped>
    body *::-webkit-scrollbar
        width 5px
        height 5px
        background transparent
    body *::-webkit-scrollbar-thumb
        background rgba(0, 0, 0, .2)
    .el-row >>> .el-drawer__header
        margin 0
        padding 0
    .artcount
        display inline-inline-block
        width 22px
        height 22px
        line-height 22px
        position absolute
        top 16px
        right 48px
        text-align center
        background purple
        color #fff
    i + span
        padding-left 6%
    .el-row
        width 100%
        height 100%
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        transition all 3s cubic-bezier(0, 0, 0.2, 1);
        .el-col
            height 100%
            background #fff
            .home-info
                position relative
                height 30%
                background url(/static/info-back.jpg) no-repeat
                background-size 100% 100%
                .info-img
                    position absolute
                    top 6%
                    left 6%
                    width 72px
                    height 72px
                    background #fff
                    border-radius 50%
            .el-menu
                height 70%
</style>
