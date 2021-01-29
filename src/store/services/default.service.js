import axios from 'axios'

export const defaultService = {
  handleService
}

function handleService(
  method,
  endPoint,
  params,
  headers
) {

  /****************
    헤더 예제~
    *.defaultService 호출시 상단에 작성

    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      '기타 옵션등등..'
    }
  ****************/

  return axios[method](
    endPoint,
    params,
    {
      headers
    }
  )
}

// TODO: 멀티파트와 겟은?
