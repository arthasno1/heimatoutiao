import request from '@/utils/request'
// 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取login
export const logInAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 获取用户选择的频道，如果用户没有登陆，返回默认的频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 频道-更新覆盖频道
export const updateChannelsAPI = (channels) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels: channels
  }
})

// 频道-删除指定频道
export const removeTheChannelAPI = (channelId) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
// 获取文章列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: { channel_id, timestamp }
})

// 对文章不喜欢
export const dislikeArticleAPI = (artID) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: { target: artID }
})

// 举报文章
export const reportArticleAPI = (artID, artType) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: { target: artID, type: artType, remark: '没有' }
})

// 搜索-联想菜单
export const suggestListAPI = (keyWords) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: { q: keyWords }
})

// 搜索 - 结果列表
export const searchResultListAPI = ({ page = 1, per_page = 10, q }) => {
  return request({
    url: '/v1_0/search',
    params: {
      page: page,
      per_page: per_page,
      q: q
    }
  })
}
