<template>
  <div>
    <!-- 顶部导航栏 -->
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /顶部导航栏 -->
    <!-- tab分页 -->
    <div class="main">
      <van-tabs v-model="channelId" sticky offset-top="1.22667rem" animated>
        <van-tab
          v-for="obj in userChannelList"
          :key="obj.id"
          :title="obj.name"
          :name="obj.id"
        >
          <ArticleList :channelId="channelId" />
        </van-tab>
      </van-tabs>
      <van-icon
        name="plus"
        size="0.37333334rem"
        class="moreChannels"
        @click="show = true"
      />
    </div>
    <!-- /tab分页 -->
    <!-- +号popup弹出层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body">
      <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @closePopup="closePopup"
        @removeChannelEV="removeChannelFn"
        @changeChannel="changeChannel"
      ></ChannelEdit>
    </van-popup>
    <!-- /+号popup弹出层 -->
  </div>
</template>

<script>
import ChannelEdit from './ChannelEdit.vue'
import ArticleList from './components/ArticleList.vue'
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeTheChannelAPI
} from '@/api/index.js'
export default {
  name: 'Home',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      channelId: 0, // 频道id
      userChannelList: [], // 用户Tab栏频道列表
      allChannelList: [], // 所有频道列表
      show: false // +号popup弹出层---显示或隐藏
    }
  },
  computed: {
    // 筛选出--剩余频道
    unCheckChannelList() {
      return this.allChannelList.filter(
        bigObj =>
          this.userChannelList.findIndex(
            smallObj => smallObj.id === bigObj.id
          ) === -1
      )
    }
  },
  async created() {
    // 获取用户TAB频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
    console.log(this.userChannelList, 'this.userChannelList', '用户频道列表')
    // 获取所有频道列表
    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
    console.log(this.allChannelList, 'this.allChannelList', '所有频道列表')
  },
  methods: {
    // 添加频道到用户列表
    async addChannelFn(channelObj) {
      this.userChannelList.push(channelObj)
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newobj = { ...obj }
        delete newobj.name
        newobj.seq = index
        return newobj
      })
      const res = await updateChannelsAPI(theNewArr)
      console.log(res)
    },
    // 删除频道
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(
        obj => obj.id === channelObj.id
      )
      this.userChannelList.splice(index, 1)
      const res = await removeTheChannelAPI(channelObj.id)
      console.log(res)
    },
    // 关闭popup弹出层
    closePopup() {
      this.show = false
    },
    changeChannel(obj) {
      this.channelId = obj.id
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
