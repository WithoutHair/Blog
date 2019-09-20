<template>
    <div id="section-dash" style="display:flex;align-items:center;justify-content:center">
        <div style="width:50%">
            <el-table :data="article" :default-sort = "{prop: 'date', order: 'descending'}" max-height="460" border>
                <el-table-column prop="create_at" label="日期" sortable></el-table-column>
                <el-table-column prop="title" label="标题" min-width="140"></el-table-column>
                <el-table-column prop="watch" label="浏览量" width="100" sortable></el-table-column>
                <el-table-column label="操作" style="border:none" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="toDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
                <span>您确定要删除该篇文章吗？</span>
                <span style="color:red;font-size:.9em">(我们会为您保存在回收站15天)</span>
                <span slot="footer">
                    <el-button @click="dialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="handleDelete">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DashBlog',
    data () {
        return {
            dialogVisible: false,
            article: [],
            curRow: {}
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
        },
        handleEdit (row) { // 编辑文章
            let routeData = this.$router.resolve({path: '/Editor', query: {id: row.article_id}})
            window.open(routeData.href, '_blank')
        },
        toDelete (row) {
            this.curRow = row
            this.dialogVisible = true
        },
        handleDelete () {
            const that = this
            axios.post('/api/delete_article?id=' + this.curRow.article_id)
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        that.getListArticles()
                    } else {
                        that.$message.error('删除失败')
                    }
                    that.dialogVisible = false
                })
        }
    },
    mounted () {
        this.getListArticles()
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api/pong')
        next()
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section-dash >>> .el-table__header
        border-collapse collapse
    #section-dash >>> .el-table__body
        border-collapse collapse
    #section-dash
        section-dash()
</style>
