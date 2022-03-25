module.exports = {
  plugins: {
    // VueCli已经配置了autoprefixer，下面可以注释
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 通过函数动态定制，vant使用37.5其他使用75
      // rootValue({ file }) {
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75
      // },
      rootValue: 37.5,
      // propList表示配置转换的css属性 ，*代表所有
      propList: ['*']
    }
  }
}
