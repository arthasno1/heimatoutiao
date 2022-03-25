<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img
          :src="artObj.cover.images[0]"
          alt=""
          class="thumb"
          v-if="artObj.cover.type === 1"
        />
        <!-- 三图 -->
        <div v-if="artObj.cover.type > 1" class="thumb-box">
          <img
            v-for="(imgURL, index) in artObj.cover.images"
            :key="index"
            :src="imgURL"
            alt=""
            class="thumb"
          />
        </div>
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name }}</span>
          <span>{{ artObj.comm_count }}</span>
          <span>{{ formatTime(artObj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮X -->
        <van-icon name="cross" @click="show = true" />
        <!-- 反馈面板弹窗 -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          get-container="body"
          :cancel-text="bottomText"
          @select="onSelect"
          @cancel="onCancel"
          @click-overlay="closeFn"
        />
      </div>
    </template>
  </van-cell>
</template>

<script>
import { firstActions, secondActions } from '@/api/report.js'
import { timeAgo } from '@/utils/date.js'
export default {
  props: { artObj: Object },
  data() {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    // 点击反馈面板选项
    onSelect(action, index) {
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislikeEV', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('reportEV', this.artObj.art_id, action.value)
        this.show = false
      }
    },
    // 点击反馈面板返回
    onCancel() {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 点击遮罩层关闭反馈面板
    closeFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

<style scoped lang="less">
.abc {
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  position: absolute;
  top: -100px;
  left: 0;
}
/* 标题样式 */
.title-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
