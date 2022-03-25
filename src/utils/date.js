import dayjs from 'dayjs'
import 'dayjs/locale/zh'
import relativeTime from 'dayjs/plugin/relativeTime'
/**
 * .....多久之前
 * @param {*} 之前的时间
 * @returns 系统时间到之前指定时间的距离值
 */
export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  return dayjs().to(dayjs(targetTime))
}
