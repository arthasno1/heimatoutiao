<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50">
        <ArticleItem v-for="obj in list" :key="obj.art_id" :artObj="obj" @dislikeEV="dislikeFN" @reportEV="reportFN"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Notify } from 'vant'
import ArticleItem from '../../../components/ArticleItem.vue'
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api/index.js'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: { channelId: Number },

  data() {
    return {
      list: [],
      theTime: new Date().getTime(),
      loading: false, // 底部加载状态
      finished: false, // 底部完成
      isLoading: false // 下拉控制
    }
  },
  created() {
    // console.log('触发created')
    this.getArticleListFn()
  },
  methods: {
    async getArticleListFn() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      this.list = [...this.list, ...res.data.data.results]
      // console.log(this.list, 'this.list', '文章列表')
      this.theTime = res.data.data.pre_timestamp
      console.log(this.theTime, 'this.theTime')
      // 底部加载控制
      this.loading = false
      if (this.theTime === null) {
        console.log(this.theTime, 'this.theTime')
        this.finished = true
      }
      // 下拉开关控制
      this.isLoading = false
    },
    onLoad() {
      console.log('触发触底刷新')
      this.getArticleListFn()
    },
    onRefresh() {
      console.log('触发下拉事件')
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
    },
    // 反馈不喜欢文章
    async dislikeFN(artID) {
      try {
        await dislikeArticleAPI(artID)
        Notify({ type: 'success', message: '反馈成功', duration: 1000 })
        console.log('成功了')
      } catch (error) {
        console.log('失败了')
      }
    },
    // 反馈垃圾内容
    async reportFN(artID, type) {
      const res = await reportArticleAPI(artID, type)
      console.log(res)
      Notify({ type: 'success', message: '举报成功', duration: 1000 })
    }
  }
}
</script>

<style lang="less" scoped></style>
