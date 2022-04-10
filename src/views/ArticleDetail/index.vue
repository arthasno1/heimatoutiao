<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">
        {{ artObj.title }}
      </h1>
      <van-loading size="50px" v-if="Object.keys(artObj).length === 0">加载中...</van-loading>
      <!-- 用户信息 -->
      <div v-else>
        <van-cell center :title="artObj.aut_name" :label="formatDate(artObj.pubdate)">
          <template #icon>
            <img :src="artObj.aut_photo" alt="" class="avatar" />
          </template>
          <template #default>
            <div>
              <van-button
                type="info"
                size="mini"
                v-if="artObj.is_followed === true"
                @click="followFn(true, artObj.aut_id)"
              >
                已关注
              </van-button>
              <van-button
                icon="plus"
                type="info"
                size="mini"
                plain
                v-else
                @click="followFn(false, artObj.aut_id)"
              >
                关注
              </van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="artObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>
      </div>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button
          icon="good-job"
          type="danger"
          size="small"
          v-if="artObj.attitude === 1"
          @click="agreedEd(true, artObj.art_id)"
        >
          已点赞
        </van-button>
        <van-button
          icon="good-job-o"
          type="danger"
          plain
          size="small"
          v-else
          @click="agreedEd(false, artObj.art_id)"
        >
          点赞
        </van-button>
      </div>
    </div>
    <!-- 文章评论部分 -->
    <CommentList></CommentList>
  </div>
</template>

<script>
import CommentList from './CommentList.vue'
import { timeAgo } from '@/utils/date.js'
import { detailApi, userFollowedAPI, userUnFollowedAPI, agreeAPI, unAgreeAPI } from '@/api/index.js'
export default {
  name: 'ArticleDetail_index',
  components: { CommentList },
  data() {
    return {
      artObj: {} // 文章对象
    }
  },

  async created() {
    // 获取文章详情数据
    const res = await detailApi({
      art_id: this.$route.query.art_id
    })
    this.artObj = res.data.data
    // console.log(this.artObj, 'index的artObj')
  },

  methods: {
    formatDate: timeAgo,
    // 关注---取关作者
    async followFn(boolean, aut_id) {
      if (boolean === true) {
        // 取关
        this.artObj.is_followed = false
        const res = await userUnFollowedAPI({ userID: aut_id })
        console.log(res)
      } else {
        // 关注
        this.artObj.is_followed = true
        const res = await userFollowedAPI({ userID: aut_id })
        console.log(res)
      }
    },
    async agreedEd(boolean, artID) {
      if (boolean === true) {
        // 取消点赞
        this.artObj.attitude = -1
        const res = await unAgreeAPI({ artID: artID })
        console.log(res)
      } else {
        // 点赞
        this.artObj.attitude = 1
        const res = await agreeAPI({ artID: artID })
        console.log(res)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading {
  text-align: center;
}
</style>
