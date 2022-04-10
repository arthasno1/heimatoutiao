import { Toast } from 'vant'

export default ({ type, message }) => {
  if (type === 'danger') {
    Toast({
      type: 'fail',
      message
    })
  } else if (type === 'success') {
    Toast({
      type,
      message
    })
  }
}
