<template>
    <el-row>
        <el-col :md="{span:4}" :lg="{span:4}" id="sidebar-dash">
            <div class="dash-info">
                <img src="~styles/images/login-icon.jpg">
                <span>不如回家卖红薯</span>
            </div>
            <el-menu>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-setting" style="color:#fff"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <router-link to="/profile">
                        <el-menu-item index="1-1" style="padding-left:53px">
                            <span>个人资料</span>
                        </el-menu-item>
                    </router-link>
                    <el-menu-item index="1-2" style="padding-left:53px">
                        <span>博客设置</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-edit" style="color:#fff"></i>
                        <span slot="title">文章管理</span>
                    </template>
                    <el-menu-item index="2-1" style="padding-left:53px">
                        <span>文章列表</span>
                    </el-menu-item>
                    <el-menu-item index="2-2" style="padding-left:53px">
                        <span>草稿箱</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document" style="color:#fff"></i>
                        <span slot="title">操作日志</span>
                    </template>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :md="{span:20}" :lg="{span:20}" class="header">
            <router-link to="/editor" target="_blank">
                <img src="~styles/images/write.png">
                <span style="color:#fff">写博客</span>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'Dashboard'
}
</script>

<style lang="stylus" scoped>
    #sidebar-dash >>> .el-menu
        border none
        background #222
        .el-submenu__title
            color #fff
            &:hover
                background rgba(0, 0, 0, 1)
        .el-menu-item
            color #fff
            &:hover
                background rgba(0, 0, 0, 1)
        .is-active
            background rgba(0, 0, 0, 1)
    .el-row
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        #sidebar-dash
            height 100%
            background #222
            .dash-info
                display flex
                align-items center
                justify-content center
                height 10%
                background #2F2F4F
                img
                    height 60%
                    padding-right 5px
                span
                    padding-right 20px
                    font-size 1.6em
                    color #fff
        .header
            height 10%
            background green
            img
                height 40%
</style>
