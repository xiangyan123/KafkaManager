import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = '/api'
const instance = axios.create({
  timeout: 5000,
  // baseURL: 'process.env.NODE_ENV === 'development' ? '/api' : '''
  baseURL:'',
});

instance.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put') {
      config.data = config.data
    }
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem(
        'Authorization'
      ) || ''}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  res => {
    if (res.data.data.code == 0) {
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    // Dialog.alert({
    //   title: '警告',
    //   message: error.message
    // });
    return Promise.reject(error);
  },

);

const post = (url, data, config = {}) => instance.post(url, data, config);

const put = (url, data, config = {}) => instance.put(url, data, config);

const get = (url, params, config = {}) =>
  instance.get(url, {
    params,
    ...config
  });

const deleteMethod = (url, config = {}) =>
  instance({
    url,
    method: 'delete',
    ...config
  });

export default {
  install(Vue) {
    Vue.prototype.$reqGet = get;
    Vue.prototype.$reqPost = post;
    Vue.prototype.$reqPut = put;
    Vue.prototype.$reqDel = deleteMethod;
  }
};
