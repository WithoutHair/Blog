<template>
  <div id="section-dash">
      <div class="content">
          <h3>个人资料</h3>
          <el-upload class="upload" :show-file-list="false" action="/api/upload" :before-upload="beforeUpload">
              <img v-if="imageUrl" :src="imageUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <p>点击上传</p>
          </el-upload>
          <div class="profile">
              <p>昵称:{{info.user_info.name}}</p>
              <p>邮箱:{{info.user_info.email}}</p>
          </div>
          <el-button @click="showEditInfo=true">修改资料</el-button>
      </div>
      <div class="editInfo" v-show="showEditInfo">
          <el-card class="editCard">
              <h3>修改资料</h3>
              <div class="editName">
                  <span>昵称：</span>
                  <el-input type="text" v-model="newInfo.name"></el-input>
              </div>
              <div class="editEmail">
                  <span>邮箱：</span>
                  <el-input type="email" v-model="newInfo.email"></el-input>
              </div>
              <div class="button-row">
                  <button class="button-cancle" @click="showEditInfo=false">取消</button>
                  <button class="button-publish">确认</button>
              </div>
          </el-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DashProfile',
    data () {
        return {
            newInfo: {
                name: '',
                email: ''
            },
            showEditInfo: false,
            info: {
                user_info: {}
            },
            imageUrl: 'http://129.204.186.24:8000/static/img/head.png'
        }
    },
    methods: {
        beforeUpload (file) {
            const isPng = file.type === 'image/png'
            if (!isPng) {
                this.$message.error('上传头像图片只能是 Png 格式!')
            }
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
        this.getInfo()
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api/pong')
        next()
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section-dash
        section-dash()
        .content
            width 60%
            height 100%
            margin 0 auto
            h3
                padding 30px 0 30px 20px
                border-bottom 1px solid #ccc
                font-size 1.8em
                font-weight:bold
            .upload
                float left
                width 20%
                margin 26px 0 0 10px
                img
                    width 100%
                    border-radius 50%
                p
                    margin-top 10px
            .profile
                float left
                margin 10px 0 0 10px
                padding-left 80px
                p
                    margin-top 36px
                    font-size 20px
                    letter-spacing 2px
            .el-button
                float right
                margin 44px 40px 0 0
        .editInfo
            z-index 2000
            display flex
            align-items center
            justify-content center
            position fixed
            top 0
            right 0
            bottom 0
            left 0
            background hsla(0, 0%, 63%, .3)
            .editCard
                width 30%
                h3
                    font-size 1.4em
                div
                    margin-top 16px
                span
                    padding-left 30px
                    font-size 1.2em
                .el-input
                    width 60%
                .button-row
                    float right
                    margin-top 20px
                    margin-bottom 20px
                    button
                        margin-right 10px
                        background none
                        cursor pointer
                        font-size 16px
                        &:hover
                            background #ddd
</style>
