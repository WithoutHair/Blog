<template>
  <div id="section">
      <div class="content">
          <h3>个人资料</h3>
          <el-upload class="uploade" action="http://129.204.186.24:8000/static/img">
              <img style="width:180px;height:180px" v-if="imageUrl" :src="imageUrl">
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
    }
}
</script>

<style lang="stylus" scoped>
    #section
        width 83.333%
        position absolute
        top 10%
        right 0
        bottom 0
        background #fff
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
