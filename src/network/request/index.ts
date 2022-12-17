// 导入axios
import axios from 'axios'
// 导入element plus 的遮罩层效果
import { ElLoading } from 'element-plus'

// 一些对应的类型
import type { AxiosInstance } from 'axios'
import type { HyRequestConfig } from './type'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'


const SHOW_LOADING = true;

class HyRequest {
  instance: AxiosInstance;
  elLoading?: LoadingInstance;
  isShowLoading: boolean = SHOW_LOADING;
  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config);
    this.isShowLoading = config.isShowLoading ?? SHOW_LOADING
    // 实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    // 全局拦截器
    this.instance.interceptors.request.use(config => {
      if (this.isShowLoading == true) {
        this.elLoading = ElLoading.service({
          text: '正在加載中,請稍後....',
          background: "rgba(0,0,0,.6)"
        })
      }
      return config
    }, error => {
      return error;
    })

    this.instance.interceptors.response.use(result => {
      this.elLoading?.close();
      return result.data
    }, error => {
      return error
    })
  }

  request<T>(config: HyRequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestInterceptor) {
      this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;
      config = config.interceptors.requestInterceptor(config);
    }
    return this.instance
      .request<any, T>(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res);
        }
        this.isShowLoading = SHOW_LOADING;
        return res;
      })
      .catch((err) => {
        this.isShowLoading = SHOW_LOADING;
        return err;
      });
  }

  get<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "GET"
    });
  }
  post<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request({
      ...config,
      method: "POST"
    });
  }
}
export default HyRequest;
