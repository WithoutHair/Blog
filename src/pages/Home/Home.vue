<template>
    <el-row>
        <el-col :sm="{span:4}" :md="{span: 4}" :lg="{span: 4}" id="sidebar" style="overflow:auto;position:fixed;top:0;bottom:0;transition:margin .4s">
            <div class="home-info">
                <div class="info-img"></div>
                <div class="info-text">
                    <p class="info-name">{{info.user_info.Name}}</p>
                    <p class="info-email">{{info.user_info.Email}}</p>
                    <a :href="'mailto:' + info.user_info.Email" title="联系我"><i class="el-icon-message"></i></a>
                </div>
            </div>
            <el-menu router :default-active="$route.path">
                <router-link to="/">
                    <el-menu-item index="1">
                        <i class="el-icon-s-home" style="color:#2196f3"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/time">
                    <el-menu-item index="2">
                        <i class="el-icon-date" style="color:#ff5722"></i>
                        <span slot="title">归档</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-collection-tag" style="color:#4caf50"></i>
                        <span slot="title">分类</span>
                    </template>
                    <el-menu-item
                        v-for="item of tags"
                        :key="item.tag_id"
                        :index="'/Category/' + item.tag_id"
                    >
                        {{item.tag}}
                        <span class="artcount">{{item.count}}</span>
                    </el-menu-item>
                </el-submenu>
                <router-link to="/about">
                    <el-menu-item index="4">
                        <i class="el-icon-user" style="color:#9c27b0"></i>
                        <span slot="title">关于</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
import HomeTime from './components/Time'
import HomeCategory from './components/Category'
import HomeAbout from './components/About'
import HomeArticle from './components/Article'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
        HomeTime,
        HomeCategory,
        HomeAbout,
        HomeArticle
    },
    data () {
        return {
            tags: [],
            info: {
                user_info: {},
                blog_info: {}
            },
            article: []
        }
    },
    methods: {
        getTag () {
            const that = this
            axios.get('/api/list_tags')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.tags = data
                    }
                })
        },
        getInfo () {
            const that = this
            axios.get('/api/sys_info')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.info = data
                    }
                })
        }
    },
    mounted () {
        this.getTag()
        this.getInfo()
    }
}
</script>

<style lang="stylus" scoped>
    .artcount
        display inline-block
        width 22px
        height 22px
        line-height 22px
        position absolute
        top 16px
        right 48px
        text-align center
        background #696969
        color #fff
    i + span
        padding-left 6%
    .el-row
        position absolute
        top 0
        bottom 0
        left 0
        transition all 3s cubic-bezier(0, 0, 0.2, 1);
        .el-col
            height 100%
            background #fff
            .home-info
                height 30%
                background url(/static/info-back.jpg) no-repeat
                background-size 100% 100%
                .info-text
                    width 100%
                    height 40%
                    position relative
                    background rgba(0, 0, 0, .2)
                    color #fff
                    .info-name
                        padding 20px 0 0 16px
                        font-size 1.1em
                    .info-email
                        padding 20px 0 0 16px
                        font-size 1.1em
                        letter-spacing 1px
                    i
                        position absolute
                        top 34%
                        right 6%
                        font-size 1.8em
                        color #fff
                        cursor pointer
                .info-img
                    width 100%
                    height 60%
            .el-menu
                height 70%
</style>
