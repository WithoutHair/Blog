<template>
  <div id="section-dash">
      <div class="content">
          <h3>个人资料</h3>
          <el-upload class="uploade" :show-file-list="false" action="/api/upload" :before-upload="beforeUpload">
              <img style="width:180px;height:180px" v-if="imageUrl" :src="imageUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <p>点击上传</p>
          </el-upload>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DashProfile',
    data () {
        return {
            imageUrl: 'http://129.204.186.24:8000/static/img/head.png'
        }
    },
    methods: {
        beforeUpload (file) {
            const isPng = file.type === 'image/png'
            if (!isPng) {
                this.$message.error('上传头像图片只能是 Png 格式!')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import ('~styles/mixins.styl')
    #section-dash
        section-dash()
        .content
            width 80%
            height 100%
            margin 0 auto
            h3
                padding 30px 0
                border-bottom 1px solid #ccc
                font-size 1.8em
                font-weight:bold
            .upload
                border-radius 6px
                cursor pointer
</style>
