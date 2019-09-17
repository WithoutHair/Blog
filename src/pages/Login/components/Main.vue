<template>
    <div class="login-content">
        <el-row class="row-content">
            <el-col
                class="col-content hidden-xs-only"
                :sm="{span: 10, offset: 4}"
                :md="{span: 8, offset: 6}"
                :lg="{span: 8, offset: 6}">
                <img class="login-img" src="/static/login-background.jpg">
            </el-col>
            <el-col
                class="login-form col-content"
                :xs="{span: 16, offset: 4}"
                :sm="{span: 6, offset: 0}"
                :md="{span: 4, offset: 0}"
                :lg="{span: 4, offset: 0}"
                >
                <el-form autocomplete="off" :model="form" :rules="rules" ref="form">
                    <el-form-item>
                        <img src="~styles/images/login-icon.jpg">
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input type="email" class="login-email" v-model="form.email"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" class="login-password" v-model="form.password" show-password/>
                        <el-alert style="line-height: 16px; margin-top: 4px;" title="用户名或密码错误" type="error" v-show="loginFailed" @close="handleClose" show-icon></el-alert>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-button" @click="handleLogin('form')" size="mini" :loading="false" round>登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginMain',
    data () {
        return {
            loginFailed: false,
            form: {
                email: '',
                password: ''
            },
            rules: {
                email: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }, {
                    type: 'email',
                    message: '用户名应为邮箱格式',
                    trigger: ['blur', 'change']
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 8,
                    message: '密码长度至少为8位',
                    trigger: ['blur', 'change']
                }]
            }
        }
    },
    methods: {
        handleLogin (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let that = this
                    axios.post('/api/auth/login', {
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(function (res) {
                        if (res.data.success) {
                            localStorage.setItem('token', res.data.data.token)
                            that.$router.push('/')
                        } else {
                            that.form.password = ''
                            that.loginFailed = true
                        }
                    })
                } else {
                    return 0
                }
            })
        },
        handleClose () {
            this.loginFailed = false
        }
    }
}
</script>

<style lang="stylus" scoped>
    .login-content >>> .el-input__inner
        background #fff !important
        border none
        border-bottom 1px solid #ccc
        border-radius 0
        padding 0 1%
    .login-content >>> .el-form
        width 100%
        height 100%
    .login-content >>> .el-form-item
        width 80%
        height 25%
        margin 0 auto
    .login-content >>> .el-form-item__content
        width 100%
    .login-content
        width 100%
        height 90%
        padding-top 5%
        text-align center
        .row-content
            width 100%
            height 60%
            margin-top 1%
            .col-content
                height 100%
            .login-img
                width 100%
                height 100%
            .login-form
                background #fff
                img
                    width 50%
                    margin-top 2%
                .login-email
                    margin-top 6%
                .login-button
                    width 40%
                    margin-top 2%
                    font-size 1.2em
                    text-align center
</style>
