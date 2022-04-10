<template>
  <div>
    <keep-alive :exclude="['Search', 'SearchResult', 'ArticleDetail_index', 'UserEdit']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
