import axios from 'axios'

export const defaultService = {
  apiAction,
  apiError
}

// function handleService(params) {
//
//   const headerType = (params.headers ? {headers: authHeader(), ...params.headers} : { headers: authHeader() })
//   //console.log(headerType);
//   const responseType = (params.responseType ? params.responseType : '')
//
//   const switchMethod = (method) => {
//
//     switch (method) {
//       case 'get':
//         return axios[method](
//           params.endPoint,
//           headerType,
//           responseType
//         )
//       default:
//         return axios[method](
//           params.endPoint,
//           params.params,
//           headerType,
//           responseType
//         )
//     }
//   }
//
//   return switchMethod(params.method)
// }

/**
 * API 액션 함수
 */
function apiAction(type, response = null) {
  let resultObject = {type};
  response && (resultObject.response = response)
  return resultObject;
}

/**
 * API 통신 에러 문구 공통처리
 */
function apiError(error) {

  /** 
   * 에러 코드
   * 401: unauthorized
   * 
   */
  console.log(error.response.data.status);
  // switch (error.response.data.status) {
  //   case 401:
  //     return ({
  //       title: '오류',
  //       message: '사용자 정보가 올바르지 않습니다.'
  //     })
  //
  //   default:
  //     return ({
  //       title: 에러,
  //       message: 에러
  //       // title: error.response.data.error ? error.response.data.error : null,
  //       // message: error.response?.data?.errors?.message ? error.response.data.errors.message : errorMessages.systemError
  //     })
  // }
}