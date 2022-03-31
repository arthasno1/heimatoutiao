<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />
    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="profile.photo" @click="$refs.iptFile.click()" />
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profile.name" @click="nameClickFn" />
      <van-cell title="生日" is-link :value="profile.birthday" @click="birthdayFn" />
    </van-cell-group>
    <!-- 姓名弹窗 -->
    <van-dialog
      v-model="show"
      title="请输入用户名"
      show-cancel-button
      :before-close="beforeCloseFn"
    >
      <input type="text" v-fofo v-model="inputUserName" />
    </van-dialog>
    <!-- 生日选择 -->
    <van-popup round v-model="dateTimePackerShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
import { timer } from '@/utils/date.js'
import { userProfileAPI, updatePhotoAPI, updateUserProfileAPI } from '@/api/index.js'
import { Notify } from 'vant'
export default {
  name: 'UserEdit',
  data() {
    return {
      profile: {},
      inputUserName: '',
      show: false, // 姓名弹窗---开关控制
      dateTimePackerShow: false, // 弹出层开关
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  async created() {
    const res = await userProfileAPI()
    this.profile = res.data.data
    console.log('profile', this.profile)
  },
  methods: {
    // 文件选择改变事件
    async onFileChange(e) {
      if (e.target.files.length === 0) {
        return false
      }
      console.log(e.target.files)
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await updatePhotoAPI(theFd)
      console.log(res)
      this.profile.photo = res.data.data.photo
    },
    // 更改名称
    nameClickFn() {
      this.show = true
      this.inputUserName = this.profile.name
    },
    // 姓名---关闭前---回调函数
    async beforeCloseFn(action, done) {
      if (action === 'confirm') {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          Notify({ type: 'success', message: '通过成功' })
          const res = await updateUserProfileAPI({
            name: this.inputUserName
          })
          console.log(res)
          this.profile.name = this.inputUserName
          done()
        } else {
          Notify({ type: 'warning', message: '用户名只能是1-7位的中英数组组合' })
          done(false)
        }
      } else {
        done()
      }
    },
    birthdayFn() {
      this.dateTimePackerShow = true
      this.currentDate = new Date(this.profile.birthday)
    },
    cancelFn() {
      this.dateTimePackerShow = false
    },
    // 发送时间
    async confirmFn() {
      console.log(this.currentDate)
      const time = timer(this.currentDate)
      console.log(time)
      const res = await updateUserProfileAPI({
        birthday: time
      })
      Notify({ type: 'success', message: '修改时间成功' })
      console.log(res)
      this.profile.birthday = time
      this.dateTimePackerShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/.van-dialog__content {
  text-align: center;
  input {
    outline: none;
    padding: 0;
    border: none;
    text-align: center;
  }
}
.van-picker {
  bottom: -50px;
}
</style>
