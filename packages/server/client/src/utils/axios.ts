import axios from 'axios';


const inst = axios.create({
  timeout: 10 * 1000,
  baseURL: '/service',
})

inst.interceptors.request.use(
  function resolved(config) {
    return config;
  },
  function rejected(error) {
    throw new Error(error);
  },
);

inst.interceptors.response.use(
  function resolved(response) {
    const { status, data } = response;

    if (data.code !== '0') {
      alert(data.errorMsg || data.message);
      return Promise.reject(data.message)
    }
    if (status >= 200 && status < 300) {
      return data.data;
    }
  },
  function rejected({ message, response }) {
    // 非2xx的status都会触发这个函数
    const { status } = response;
    const errorMsgMap = {
      404: '接口不存在',
      500: '服务器异常',
      502: '网关异常',
      503: '服务器暂时不可以'
    };
    const errorMsg = errorMsgMap[status] || message || '未知的系统错误';
    throw new Error(errorMsg);
  }
)

export default inst;
