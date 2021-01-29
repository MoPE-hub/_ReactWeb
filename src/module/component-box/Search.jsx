import React, { useState } from 'react'
import { debounce } from 'lodash'

const CopmponentSearch = (props) => {

  const [ state, setState ] = useState({
    keyword: ''
  })

  /**************
   검색어 디바운스
  ***************/

  const handleChange = (e) => {
    e.persist()

    setState({
      keyword: e.target.value
    })

    // FIXME: 블링크가 있었는데 없다?
    const debouncedFn = debounce(() => {
       let searchString = e.target.value
       props.onChange(searchString)
    }, 700)

    debouncedFn()
  }

  /**************
   검색창 초기화
  ***************/

  const handleClear = (e) => {
    e.preventDefault()

    setState({
      keyword: ''
    })

    props.onChange('')
  }

  /**************
   검색어 전송
  ***************/

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onChange(state.keyword)
  }

  return(
    <React.Fragment>
      <div className="input-w-clear">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="검색"
            className="form-control input-text"
            onChange={handleChange}
            value={state.keyword}
            required
          />
          <button
            className="icon-clear"
            type="reset"
            onClick={handleClear}
          >
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default CopmponentSearch
