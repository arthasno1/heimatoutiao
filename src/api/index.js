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
// 文章---获取详情
export const detailApi = ({ art_id }) => request({
  url: `/v1_0/articles/${art_id}`,
  method: 'GET'
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
// 关注用户
export const userFollowedAPI = ({ userID }) => request({
  url: '/v1_0/user/followings',
  method: 'GET',
  data: { target: userID }
})
// 取消关注
export const userUnFollowedAPI = ({ userID }) => request(
  {
    url: `/v1_0/user/followings/${userID}`,
    method: 'DELETE'
  })
// 对文章点赞
export const agreeAPI = ({ artID }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: { target: artID }
})
// 取消点赞
export const unAgreeAPI = ({ artID }) => request({
  url: `/v1_0/article/likings/${artID}`,
  method: 'DELETE'
})
// 获取评论或评论回复
export const commentListAPI = ({ artID, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artID,
      offset,
      limit
    }
  })
}
// 评论回复---点赞
export const commentLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论回复---取消点赞
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 进行评论
export const sendCommentAPI = ({ id, content, art_id = null }) => {
  const obj = { target: id, content: content }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
// 用户 - 基本资料
export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 用户- 更新头像
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
  })
}
// 用户 - 更新资料
export const updateUserProfileAPI = (dataObj) => {
  const obj = { name: '', gender: 0, birthday: '', intro: '' }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete obj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
