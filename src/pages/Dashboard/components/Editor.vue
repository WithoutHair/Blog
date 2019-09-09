<template>
  <div class="content">
      <div class="header">
          <el-input class="title" type="text" placeholder="请输入文章标题" maxlength="20" v-model="article.title"></el-input>
          <div class="header-button">
              <el-button class="publish" @click="showPublish=!showPublish">发布文章</el-button>
              <router-link class="backhome" tag="el-button" to="/">返回主页</router-link>
          </div>
      </div>
      <mavon-editor :plain="true" ref=md @change="handleChange" @save="handleSave" @imgAdd="$imgAdd"/>
      <div class="publish-back" v-show="showPublish">
          <el-card class="publish-content">
              <h4 style="font-weight: bold;font-size:1.2em">发布文章</h4>
              <div class="publishTags">
                  <span style="font-size:1.1em">文章标签：</span>
                  <el-select v-model="selected" multiple>
                      <el-option v-for="item of tags" :key="item.tag_id" :label="item.tag" :value="item.tag_id">
                      </el-option>
                  </el-select>
              </div>
              <div class="button-row">
                  <button class="button-cancle" @click="showPublish=false">取消</button>
                  <button class="button-publish" :plain="true" @click="handlePublish">发布文章</button>
              </div>
          </el-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DashboardEditor',
    data () {
        return {
            showPublish: false,
            article: {
                title: '',
                value: '',
                render: '',
                id: 0
            },
            tags: [],
            selected: []
        }
    },
    methods: {
        $imgAdd (pos, $file) {
           const that = this
            // 第一步.将图片上传到服务器.
           var formdata = new FormData()
           formdata.append('file', $file)
           formdata.append('dst', '/data/img/')
           axios({
               url: '/api/upload',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' }
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               url = that.ip + url.data.data
               that.$refs.md.$img2Url(pos, url)
           })
        },
        handleChange (value, render) {
            this.article.value = value
            this.article.render = render
        },
        handleSave (value, render) {
            if (this.article.title === '') {
                this.$message.error({
                    message: '文章标题不能为空'
                })
                return 0
            } else if (this.article.value === '') {
                this.$message.error({
                    message: '文章内容不能为空'
                })
                return 0
            } else {
                const that = this
                axios.post('/api/create_article', {
                    title: this.article.title,
                    value: value,
                    render: render,
                    id: this.article.id
                })
                    .then(function (res) {
                        res = res.data
                        console.log(res)
                        if (res.success === 1) {
                            that.$message({
                                message: '已成功保存至草稿箱',
                                type: 'success'
                            })
                            that.article.id = res.data
                        }
                    })
            }
        },
        handlePublish () {
            if (this.article.title === '') {
                this.$message.error({
                    message: '文章标题不能为空'
                })
                return 0
            } else if (this.article.value === '') {
                this.$message.error({
                    message: '文章内容不能为空'
                })
                return 0
            } else {
                this.showPublish = false
                const that = this
                axios.post('/api/create_article', {
                    title: this.article.title,
                    value: this.article.value,
                    render: this.article.render,
                    id: this.article.id
                })
                    .then(function (res) {
                        res = res.data
                        console.log(res)
                        if (res.success === 1) { // 创建成功 可以发送Publish请求了
                            that.article.id = res.data
                            axios.post('/api/publish_article', {
                                title: that.article.title,
                                value: that.article.value,
                                render: that.article.render,
                                id: that.article.id,
                                tags: that.selected
                            })
                                .then(function (res) {
                                    res = res.data
                                    if (res.success === 1) {
                                        that.$message({
                                            message: '发布成功',
                                            type: 'success'
                                        })
                                        that.$route.push('/')
                                    } else {
                                        that.$message.error('发布失败')
                                    }
                                })
                        } else {
                            that.$message.error('发布失败')
                        }
                    })
            }
        },
        handleTag () { // 取标签
            const that = this
            axios.get('/api/list_tags')
                .then(function (res) {
                    res = res.data
                    if (res.success === 1) {
                        const data = res.data
                        that.tags = data
                    }
                })
        }
    },
    mounted () {
        this.handleTag()
    }
}
</script>

<style lang="stylus" scoped>
    .content >>> .v-note-wrapper
        height 90%
    .content
        overflow hidden
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background #fff
        .header
            width 100%
            height 10%
            .title
                width 70%
                margin 10px 10px
            .header-button
                width 25%
                margin-left 20px
                display inline-block
                .publish
                    background #4caf50
                    color #fff
                .backhome
                    background #ca0c16
                    color #fff
        .mavon-editor
            height 90%
        .publish-back
            z-index 2000
            display flex
            align-items center
            justify-content center
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            background hsla(0, 0%, 63%, .5)
            .publish-content
                width 30%
                .publishTags
                    margin-top 4%
                .button-row
                    float right
                    margin-top 4%
                    margin-bottom 4%
                    button
                        background none
                        cursor pointer
                        font-size 16px
                        &:hover
                            background #ddd
                    .button-publish
                        color #3399ea
                    .button-cancle
                        margin-right 10px
</style>
