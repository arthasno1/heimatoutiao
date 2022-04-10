<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小思同学"></van-nav-bar>
    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name === 'xs'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>
        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-if="obj.name === 'me'">
          <div class="chat-pao">{{ obj.msg }}</div>
          <van-image fit="cover" round :src="userPhoto" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model="world" @keyup.enter="sendFN">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFN">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { io } from 'socket.io-client'
import { getStorage } from '@/utils/storage'
export default {
  name: 'Chat',
  data() {
    return {
      socket: null,
      world: '',
      list: [
        { name: 'xs', msg: 'hi,你好！我是小思' },
        { name: 'me', msg: '我是编程小王子' }
      ]
    }
  },
  computed: {
    ...mapState(['userPhoto'])
  },
  methods: {
    sendFN() {
      if (this.world.trim().length !== 0) {
        this.socket.emit('message', {
          msg: this.world.trim(),
          timestamp: +new Date()
        })
        this.list.push({ name: 'me', msg: this.world.trim() })
        this.world = ''
        this.$nextTick(function () {
          const theDiv = document.querySelector('.chat-list>div:last-child')
          theDiv.scrollIntoView({ behavior: 'smooth' })
        })
      }
    },
    haha() {
      console.log(123)
    }
  },
  created() {
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getStorage('geek-itheima')
      },
      transports: ['websocket']
    })
    this.socket.on('connect', () => {
      console.log('连接建立成功')
    })
    this.socket.on('message', obj => {
      this.list.push({ name: 'xs', msg: obj.msg })
      this.$nextTick(function () {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({ behavior: 'smooth' })
      })
    })
  },
  beforeDestroy() {
    this.socket.close()
    this.socket = null
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
