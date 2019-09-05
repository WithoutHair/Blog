<template>
    <div class="markdown-body" v-html="article.render">
        1111111
        {{article.render}}
    </div>
</template>

<script>
export default {
    name: 'HomeArticle',
    props: {
        article: Object
    }
}
</script>

<style>
    @import "mavon-editor/dist/css/index.css"
</style>
