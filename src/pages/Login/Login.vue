<template>
    <div class="back-img">
        <div class="back-loading" v-if="showLoading">
            <div class="loading">
                <img src="~styles/images/loading.gif">
            </div>
        </div>
        <div class="back-color">
            <login-header v-if="!showLoading"></login-header>
            <login-main v-if="!showLoading"></login-main>
        </div>
    </div>
</template>

<script>
import LoginHeader from './components/Header'
import LoginMain from './components/Main'
export default {
    name: 'Login',
    components: {
        LoginHeader,
        LoginMain
    },
    data () {
        return {
            count: 0,
            showLoading: true,
            imgs: [
                'static/login-background.jpg',
                'static/background.jpg'
            ]
        }
    },
    methods: {
        preload () {
            for (let img of this.imgs) {
                let image = new Image()
                image.onload = () => {
                    this.count++
                }
                image.src = img
            }
        }
    },
    watch: {
        count (val) {
            if (val === 2) {
                this.showLoading = false
            }
        }
    },
    mounted () {
        this.preload()
    }
}
</script>

<style lang="stylus" scoped>
    .back-img
        overflow hidden
        width 100%
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background url('/static/background.jpg') no-repeat center
        background-size cover
        .back-loading
            z-index 1
            width 100%
            height 100%
            background #fff
            .loading
                display flex
                width 100%
                height 100%
                align-items center
                justify-content center
                font-size 5em
        .back-color
            width 100%
            height 100%
</style>
