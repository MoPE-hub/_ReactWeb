import { composerConstants } from '../constants'
import { toast } from 'react-toastify'

export const initialState = {
  requester: [
    /*{
      info: {
        email: "78minu@naver.com",
        name: "나다미누",
        phone: "01086246431",
        color: "FF5733"
      },
      components: {
        textBoxes: [],
        checkBoxes: [],
        signs: [],
        signPads: []
      }
    }*/
  ],
  users: [
    /*{
      info: {
        email: "jung@naver.com",
        name: "정성립",
        phone: "0101231234",
        color: "FF5733"
      },
      components: {
        textBoxes: [],
        checkBoxes: [],
        signs: [],
        signPads: []
      },
      extensions: {}
    },
    {
      info: {
        email: "cute@naver.com",
        name: "박민우",
        phone: "01086246431",
        color: "334FFF"
      },
      components: {
        textBoxes: [],
        checkBoxes: [],
        signs: [],
        signPads: []
      },
      extensions: {}
    }*/
  ],
  isSetTextBox: [],
  isSetCheckBox: [],
  isSetSign: [],
  isSetSignPad: [],
  userIndex: null,
  user: null,
  isLoading: false
}

export default function setComponent(state = initialState, action) {
  switch (action.type) {

    /*****************
      계약 요청자 셋팅
    *****************/

    case composerConstants.SET_REQUESTER_REQUEST:
      return {
        ...state,
        requester: state.requester.concat({
          info:{
            name: action.params.name,
            phone: action.params.phone,
            email: action.params.email,
            companyName: action.params.companyName,
            companyNumber: action.params.companyNumber,
            color: action.params.color
          },
          components: {
            textBoxes: [],
            checkBoxes: [],
            signs: [],
            signPads: []
          },
          extensions:[]
        })
      }
    case composerConstants.SET_REQUESTER_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.SET_REQUESTER_FAILURE:
      return {
        ...state,
      }

    /*****************
      계약 요청자 삭제
    *****************/

    case composerConstants.DELETE_REQUESTER_REQUEST:

      // 필터링후 재배치...
      let requesterData = state.requester.filter(item => item['phone'] !== action.params.phone)
      state.requester = requesterData

      return {
        ...state,
        requester: state.requester
      }
    case composerConstants.DELETE_REQUESTER_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.DELETE_REQUESTER_FAILURE:
      return {
        ...state,
      }

    /*****************
      계약 참여자 셋팅
    *****************/

    case composerConstants.SET_USER_REQUEST:
      return {
        ...state,
        users: state.users.concat({
          info:{
            name: action.params.name,
            phone: action.params.phone,
            email: action.params.email,
            companyName: action.params.companyName,
            companyNumber: action.params.companyNumber,
            color: action.params.color
          },
          components: {
            textBoxes: [],
            checkBoxes: [],
            signs: [],
            signPads: []
          },
          extensions: []
        })
      }
    case composerConstants.SET_USER_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.SET_USER_FAILURE:
      return {
        ...state,
      }

    /*****************
      계약 참여자 엑셀 셋팅
    *****************/

    case composerConstants.SET_USERS_REQUEST:
      const users = action.params.map((item, index) => {
        /*
        첫번째 라인 빼고...
        이름     item[0]
        전화번호  item[1]
        email   item[2]
        */
        if(index > 0) {
          state.users.push({
            info:{
              name: item[0],
              phone: item[1],
              email: item[2],
              color: "FF5733"
            },
            components: {
              textBoxes: [],
              checkBoxes: [],
              signs: [],
              signPads: []
            },
            extensions: []
          })
        }
        return state.users
      })

      return {
        ...state,
        // users: state.users.concat(usersData)
        // users: usersData
      }
    case composerConstants.SET_USERS_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.SET_USERS_FAILURE:
      return {
        ...state,
      }

    /*****************
      계약 참여자 삭제
    *****************/

    case composerConstants.DELETE_USER_REQUEST:
      console.log(action.params)

      // 필터링후 재배치...
      let userData = state.users.filter(item => item['phone'] !== action.params.phone)
      state.users = userData

      return {
        ...state,
        users: state.users
      }
    case composerConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.DELETE_USER_FAILURE:
      return {
        ...state,
      }

    /*****************
      참여자 항목 셋팅
    *****************/

    case composerConstants.SET_EXTENSION_REQUEST:
      state.users[action.params.user].extensions[action.params.item] = {
        value: action.params.value
      }
      return {
        ...state,
      }
    case composerConstants.SET_EXTENSION_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.SET_EXTENSION_FAILURE:
      return {
        ...state,
      }

    /*****************
      참여자 항목 엑셀 셋팅
    *****************/

    case composerConstants.SET_EXTENSIONS_REQUEST:
      const values = action.params.map((items, index) => {
        if(index > 0) {
          items.map((item, itemIndex) => {
            if(itemIndex > 4) {
              state.users[index - 1].extensions.push({
                value: item
              })
            }
          })
        }
        return state.users
      })
      return {
        ...state,
      }
    case composerConstants.SET_EXTENSIONS_SUCCESS:
      return {
        ...state,
      }
    case composerConstants.SET_EXTENSIONS_FAILURE:
      return {
        ...state,
      }

    /*****************
      텍스트 박스
    *****************/

    case composerConstants.SET_TEXT_BOX:
      return {
        ...state,
        isSetTextBox: state.isSetTextBox.concat(state.isSetTextBox.length + 1),
        userIndex: action.params.user.index,
        user: action.params.user
      }

    case composerConstants.DELETE_TEXT_BOX:
      let targetDeleteTextBox = state.users[action.params.index].components
      targetDeleteTextBox.isSetSign = []
      targetDeleteTextBox.signCounter = 0

      return {
        ...state,
        // currentUser: action.params.index
      }

    /*****************
      체크 박스
    *****************/

    case composerConstants.SET_CHECK_BOX:
      return {
        ...state,
        isSetCheckBox: state.isSetCheckBox.concat(state.isSetCheckBox.length + 1),
        userIndex: action.params.user.index,
        user: action.params.user
      }

    /*****************
      사인
    *****************/

    case composerConstants.SET_SIGN:

      // if (state.users[action.params.user.index].components.signs.length > 0) {
      //   toast.info("전자서명은 한 번만 지정할수 있습니다", {
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })
      //
      //   return {
      //     ...state
      //   }
      // }

      return {
        ...state,
        isSetSign: state.isSetSign.concat(state.isSetSign.length + 1),
        userIndex: action.params.user.index,
        user: action.params.user
      }

    case composerConstants.DELETE_SIGN:
      console.log(action.params)
      // let targetDeleteSign = state.users[action.params.index].components
      // targetDeleteSign.isSetSign = []
      // targetDeleteSign.signCounter = 0

      return {
        ...state,
        // currentUser: action.params.index
      }

    /*****************
      서명
    *****************/

    case composerConstants.SET_SIGN_PAD:
      return {
        ...state,
        isSetSignPad: state.isSetSignPad.concat(state.isSetSignPad.length + 1),
        userIndex: action.params.user.index,
        user: action.params.user
      }

    /*****************
      컴포넌트
    *****************/

    case composerConstants.SET_COMPONENTS_REQUEST:

      let targetUser = state.users[action.params.user.index].components
      targetUser[action.params.type] = action.params.value
      // targetUser[action.params.type] = targetUser[action.params.type].concat(action.params.value[action.params.value.length - 1])

      return {
        ...state
      }
    case composerConstants.SET_COMPONENTS_SUCCESS:
      return {
        ...state
      }
    case composerConstants.SET_COMPONENTS_FAILURE:
      return {
        ...state
      }

    /*****************
      전송
    *****************/

    case composerConstants.SEND_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case composerConstants.SEND_SUCCESS:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case composerConstants.SEND_FAILURE:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    default:
      return state
  }
}
