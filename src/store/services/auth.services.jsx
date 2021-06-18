import axios from 'axios'

export const authService = {
  logIn,
  logOut,
}

async function logIn(userId, password) {

  return await axios.post(
    'database-1.ccfwawnvxlkl.us-east-2.rds.amazonaws.com',
    'userId=' + userId +
    '&password=' + password
  )
}

async function logOut() {
  return localStorage.removeItem('user')
}