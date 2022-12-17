
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface MsiInterceptors<T> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (result: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface HyRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: MsiInterceptors<T>;
  isShowLoading?: boolean;
}
