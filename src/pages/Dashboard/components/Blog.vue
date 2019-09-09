<template>
    <div id="section-dash">
        <el-table :data="article" border>
            <el-table-column prop="create_at" label="日期"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="watch" label="浏览量"></el-table-column>
            <el-table-column fixed="right" label="操作" width="110">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DashBlog',
    data () {
        return {
            article: []
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
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')

    #section-dash
        section-dash()
        .el-table
            width 40%
            margin 0 auto
</style>
