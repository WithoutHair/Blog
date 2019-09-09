<template>
    <el-backtop target="#section" :right="20" :bottom="100" :visibility-height="100">
    <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        z-index:1000;
      }"
    >
      <i class="el-icon-top"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
    name: 'BackTop'
}
</script>

<style>

</style>
