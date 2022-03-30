<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入11位手机号"
        required
        :rules="[
          {
            required: true,
            message: '请填写11位手机号码',
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
          }
        ]"
      />
      <van-field
        v-model="user.code"
        name="code"
        label="验证码"
        placeholder="请输入6位验证码"
        required
        :rules="[
          { required: true, message: '请填写6位验证码', pattern: /^[0-9]{6}$/ }
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isLoading"
          loading-text="正在登陆..."
          :disabled="isLoading"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from 'vant'
import { logInAPI } from '@/api/index.js'
import { setToken } from '@/utils/token.js'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '13812345817',
        code: '246810' // 验证码必须是246810
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit(value) {
      this.isLoading = true
      console.log('submit', value)
      try {
        const res = await logInAPI(this.user)
        console.log(res)
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登陆成功', duration: 500 })
        this.$router.replace({ path: '/layout/home' })
      } catch (error) {
        Notify({ type: 'danger', message: '账号或验证码错误' })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// .van-nav-bar {
//   background-color: #007bff;
// }
/deep/.van-nav-bar__title {
  color: white;
}
</style>
