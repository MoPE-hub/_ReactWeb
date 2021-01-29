import { columnsConstants } from '../constants'

export const initialState = {
  columns: [
    {
      column: {
        title: "예금주"
      },
      components: {
        columnsExpansions: []
      }
    },
    {
      column: {
        title: "은행명"
      },
      components: {
        columnsExpansions: []
      }
    },
    {
      column: {
        title: "계좌"
      },
      components: {
        columnsExpansions: []
      }
    }
  ],
  isColumnsExpansion: [],
  column: null,
  isLoading: false
}

export default function columns(state = initialState, action) {

  switch (action.type) {
    /*****************
      항목 셋팅
    *****************/

    case columnsConstants.SET_COLUMNS_REQUEST:
      return {
        ...state,
        columns: state.columns.concat({
          column: {
            title: action.params.title
          },
          components: {
            columnsExpansions: []
          }
        })
      }
    case columnsConstants.SET_COLUMNS_SUCCESS:
      return {
        ...state,
      }
    case columnsConstants.SET_COLUMNS_FAILURE:
      return {
        ...state,
      }

    /*****************
      항목 삭제
    *****************/

    case columnsConstants.DELETE_COLUMNS_REQUEST:
      console.log(action.params)

      // 필터링후 재배치...
    let data = state.columns.filter(item => item['columns'] !== action.params.columns)
    state.columns = data

      return {
        ...state,
        columns: state.columns
      }
    case columnsConstants.DELETE_COLUMNS_SUCCESS:
      return {
        ...state,
      }
    case columnsConstants.DELETE_COLUMNS_FAILURE:
      return {
        ...state,
      }

    /*****************
      항목 컴포넌트
    *****************/

    case columnsConstants.SET_COLUMN_COMPONENT:
      return {
        ...state,
        isColumnsExpansion: state.isColumnsExpansion.concat(state.isColumnsExpansion.length + 1),
        column: action.params.column
      }

    /*****************
      컴포넌트
    *****************/

    case columnsConstants.SET_COLUMNS_COMPONENTS_REQUEST:

      let target = state.columns[action.params.column.index].components
      target[action.params.type] = target[action.params.type].concat(action.params.value[action.params.value.length - 1])

      return {
        ...state
      }
    case columnsConstants.SET_COLUMNS_COMPONENTS_SUCCESS:
      return {
        ...state
      }
    case columnsConstants.SET_COLUMNS_COMPONENTS_FAILURE:
      return {
        ...state
      }

    default:
      return state
  }
}
