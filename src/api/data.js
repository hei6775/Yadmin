import axios from '@/libs/api.request'
//请求表数据
export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}
//错误请求
export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

//存储错误logger
export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

//上传图片
export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}
