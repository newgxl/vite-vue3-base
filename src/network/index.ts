import MsiRequest from "./request";

import localCache from "@/utils/cache";

// import.meta.env.VITE_BASE_URL
const service = new MsiRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: Number(import.meta.env.VITE_TIME_OUT),
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache("token");
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        // config.headers = `Bearer ${token}`;
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
      }
      return config;
    },
    requestInterceptorCatch(error) {
      return error;
    },
    responseInterceptor(result) {
      return result;
    },
    responseInterceptorCatch(error) {
      return error;
    }
  }
});

export default service
