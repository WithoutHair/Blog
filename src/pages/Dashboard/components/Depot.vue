<template>
    <div id="section-dash">
        <div style="overflow:scroll;width:100%;height:100%">
            <el-table :data="article" :default-sort="{prop: 'date', order: 'descending'}" height="100%">
                <el-table-column prop="create_at" label="日期" sortable></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="tags" label="标签">
                    <template slot-scope="scope">
                        <el-tag v-for="item of scope.row.tags" :key="item" style="margin-left:1px">{{item}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="watch" label="浏览量" sortable></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleRecovery(scope.row)" type="text" size="small">恢复</el-button>
                        <el-button @click="toDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
                <span>您确定要删除该篇文章吗？</span>
                <span style="color:red;font-size:.9em">(文章删除后不可恢复！)</span>
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
    name: 'DashDepot',
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
            axios.get('/api/list_articles_summary?state=4')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.article = data
                    }
                })
        },
        handleRecovery (row) {
            const that = this
            axios.post('/api/recovery_article?id=' + row.article_id)
                .then(res => {
                    res = res.data
                    if (res.success === 1) {
                        that.$message.success('恢复成功')
                        that.getListArticles()
                    }
                })
        },
        toDelete (row) {
            this.curRow = row
            this.dialogVisible = true
        },
        handleDelete () {
            const that = this
            axios.post('/api/true_delete_article?id=' + this.curRow.article_id)
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        that.$message({
                            message: '文章已永久删除',
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
    #section-dash >>> .has-gutter tr th
        background #eee
    #section-dash
        section-dash()
</style>
