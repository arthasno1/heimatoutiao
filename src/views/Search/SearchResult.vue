<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <ArticleItem
        v-for="obj in articleList"
        :key="obj.art_id"
        :artObj="obj"
        :isShow="false"
        @click.native="itemClickFn(obj.art_id)"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
import { searchResultListAPI } from '@/api/index'
export default {
  name: 'SearchResult',
  components: { ArticleItem },
  data() {
    return {
      page: 1,
      articleList: [],
      loading: false,
      finished: false
    }
  },

  async created() {
    const res = await searchResultListAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.articleList = res.data.data.results
    console.log('articleList', this.articleList)
  },

  methods: {
    async onLoad() {
      if (this.articleList.length > 0) {
        console.log('下拉事件启动')
        this.page++
        const res = await searchResultListAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return false
        }
        this.articleList.push(...res.data.data.results)
        console.log(this.articleList)
        console.log(res)
        this.loading = false
      }
    },
    // 点击结果---跳转详情页
    itemClickFn(art_id) {
      this.$router.push(`/detail?art_id=${art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
