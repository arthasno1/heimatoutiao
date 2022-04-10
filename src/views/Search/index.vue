<template>
  <!-- 包裹div -->
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-fofo
        v-model="kw"
        @input="inputFn"
        @search="searchFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="lightFn(str, kw)"
        @click="suggestClickFn(str)"
      ></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-if="suggestList.length === 0">
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(historyStr, index) in history"
          :key="index"
          @click="historyClickFn(historyStr)"
        >
          {{ historyStr }}
        </span>
      </div>
    </div>
  </div>
  <!-- /包裹div -->
</template>

<script>
import { suggestListAPI } from '@/api/index.js'
import { getStorage, setStorage } from '@/utils/storage.js'

export default {
  name: 'Search',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖--定时器
      suggestList: [], // 搜索建议
      history: JSON.parse(getStorage('his')) || []
    }
  },
  methods: {
    // 搜索框input事件
    async inputFn() {
      console.log('inputFn触发')
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI(this.kw)
          if (res.data.data.options[0] !== null) {
            this.suggestList = res.data.data.options
            console.log('输入框关键字是' + this.kw, this.suggestList)
          }
        }, 300)
      }
    },
    // 关键字高亮
    lightFn(originStr, target) {
      return originStr.replace(target, `<span style="color:red;">${target}</span>`)
    },
    moveFn(str) {
      setTimeout(() => {
        this.$router.push(`/search_result/${str}`)
      }, 0)
    },
    // 点击回车-跳转搜索结果页面
    searchFn() {
      if (this.kw.length > 0) {
        // 搜索关键字 - 保存到数组里
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    // 点击搜索建议--跳转搜搜结果
    suggestClickFn(str) {
      this.history.push(str)
      this.moveFn(str)
    },
    // 点击--搜索记录--跳转--搜索结果
    historyClickFn(historyStr) {
      this.moveFn(historyStr)
    },
    // 清空搜索历史
    clearFn() {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler(newValue, oldValue) {
        const theSet = new Set(this.history)
        // 将Set形式转换成Array
        const arr = Array.from(theSet)
        setStorage('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0px 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// 搜索历史
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
// 历史列表
.history-list {
  padding: 0px 10px;
  .history-item {
    display: inline-block;
    margin: 10px 8px 0px 8px;
    background-color: #efefef;
    border-radius: 10px;
    font-size: 12px;
    padding: 8px 14px;
  }
}
</style>
