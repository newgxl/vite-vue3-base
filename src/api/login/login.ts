import service from '@/network'


// 获取数据的接口
export let text = () => {
  return service.get({
    url: 'https://www.fastmock.site/mock/0548c1818d31d1d196646f57e714507a/text/hehe'
  })
}
