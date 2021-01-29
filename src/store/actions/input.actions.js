import { inputConstants } from '../constants'

export const inputActions = {
  add,
  adds,
  remove,
  update
}

function add(data) {
  return {
    type: inputConstants.ADD,
    data
  }
}

function adds(data) {
  return {
    type: inputConstants.ADDS,
    data
  }
}

function remove(data) {
  return {
    type: inputConstants.REMOVE,
    data
  }
}

function update(data) {
  return {
    type: inputConstants.UPDATE,
    data
  }
}
