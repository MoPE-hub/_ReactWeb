import axios from 'axios'

export const defaultService = {
  Action,
  Error
}

function Action(type, response = null) {
  let resultObject = {type};
  response && (resultObject.response = response)
  return resultObject;
}

function Error(error) {
  console.log(error.response.data.status);
}