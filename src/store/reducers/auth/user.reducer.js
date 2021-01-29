import { userConstants } from '../../constants'

const rsaData = JSON.parse(localStorage.getItem('rsa'))
const user = JSON.parse(localStorage.getItem('user'))
const company = JSON.parse(localStorage.getItem('company'))

const initialState = user ? {
  isLoggedIn: true,
  user,
  company,
  rsaData,
  isLoading: false
} : {
  isLoggedIn: false,
  user,
  company,
  rsaData,
  isLoading: false,
  isCert: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {

    /********************
      RSA
    ********************/

    case userConstants.RSA_REQUEST:
      return {
        // 단순히 암호용 인증서를 갖고 올 뿐이므로, isLoggedIn 과는 무관
        ...state
      }
    case userConstants.RSA_SUCCESS:
      return {
        ...state,
        RSAModulus: action.response.data.RSAModulus,
        RSAExponent: action.response.data.RSAExponent,
        rsaData
      }

    /********************
      유저인포
    ********************/

    case userConstants.GET_USER_INFO_REQUEST:
      return {
        ...state
      }
    case userConstants.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.response.data
      }
    case userConstants.GET_USER_INFO_FAILURE:
      return {
        isLoggedIn: false,
      }

    /********************
      로그인
    ********************/

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }
    case userConstants.LOGIN_FAILURE:
      return {}

    /********************
      로그아웃
    ********************/

    case userConstants.LOGOUT:
      return {
        isLoggedIn: false,
        user: null
      }

    /********************
      컴패니 인포
    ********************/

    case userConstants.GET_COMPANY_INFO_REQUEST:
      return {
        ...state,
        isLoggedIn: true,
      }
    case userConstants.GET_COMPANY_INFO_SUCCESS:
      return {
        ...state,
        company: action.response.data
      }
    case userConstants.GET_COMPANY_INFO_FAILURE:
      return {
        isLoggedIn: false,
      }

    /********************
      유저인포 리스트
    ********************/

    case userConstants.USERINFO_LIST_DATA_REQUEST:
      return {
        ...state,
        isLoggedIn: true
      }
    case userConstants.USERINFO_LIST_DATA_SUCCESS:
      return {
        ...state,
        detail: action.response.data,
        rsaMemberId: action.response.data['data'] ? action.response.data['data'].rsaMemberId : ''
      }
    case userConstants.USERINFO_LIST_DATA_FAILURE:
      return {
        isLoggedIn: false,
      }

    /********************
      회원가입 > 사업자 아이디 중복체크
    ********************/

    case userConstants.CHECK_CORP_ID_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case userConstants.CHECK_CORP_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCorpIdCheck: action.response.data.data
      }

    case userConstants.CHECK_CORP_ID_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /********************
      회원가입 > 아이디 중복체크
    ********************/

    case userConstants.CHECK_USER_ID_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case userConstants.CHECK_USER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isIdCheck: action.response.data.data
      }

    case userConstants.CHECK_USER_ID_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /********************
     회원가입 > 약관동의 내용 조회
    ********************/

    case userConstants.CONTENTS_LOAD_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case userConstants.CONTENTS_LOAD_SUCCESS:
      return {
        ...state,
        data: action.response.data
      }
    case userConstants.CONTENTS_LOAD_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /********************
     회원가입: 성공
    ********************/

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case userConstants.REGISTER_SUCCESS:
      console.log("가입 성공", action.response.data)
      return {
        ...state,
      }
    case userConstants.REGISTER_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /********************
     아이디/비번 찾기
    ********************/

    case userConstants.FIND_USER_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case userConstants.FIND_USER_SUCCESS:
      return {
        ...state,
        user: action.response.data
      }
    case userConstants.FIND_USER_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /********************
     KMC 인증
    ********************/

    case userConstants.KMC_CERT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case userConstants.KMC_CERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCert: action.response.data
      }
    case userConstants.KMC_CERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailure: true
      }

    /********************
     IPIN 인증
    ********************/

    case userConstants.IPIN_CERT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case userConstants.IPIN_CERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCert: action.response.data
      }
    case userConstants.IPIN_CERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailure: true
      }

    /********************
     사업자/단체 정보 저장(변경)
    ********************/

    case userConstants.MODIFY_COMPANY_INFO_REQUEST:
    return {
      ...state,
      isLoading: !state.isLoading
    }
    case userConstants.MODIFY_COMPANY_INFO_SUCCESS:

      return {
        ...state,
        modifyResult: action.response.data
      }
    case userConstants.MODIFY_COMPANY_INFO_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    default:
      return state
  }
}
