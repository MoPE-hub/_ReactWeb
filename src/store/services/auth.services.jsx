import axios from 'axios'

export const authService = {
  logIn,
  logOut,
}

async function logIn(userName, password) {

  return await axios.post(
    process.env.REACT_APP_API_URL + '/econtract/portal/signin',
    'userId=' + userName +
    '&password=' + password
  )
}

async function logOut() {
  return localStorage.removeItem('user')
}