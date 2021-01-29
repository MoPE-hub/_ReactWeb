import ClientOAuth2 from 'client-oauth2'

const clientOAuth = (new ClientOAuth2({
  clientId: 'paperless',
  clientSecret: 'cGFwZXJsZXNz',
  accessTokenUri: process.env.REACT_APP_DEV_LOGIN_LOCAL_API_URL + '/oauth/token',
  authorizationUri: process.env.REACT_APP_DEV_LOGIN_LOCAL_API_URL + '/oauth/authorize',
  redirectUri: window.location.origin + '/login',
  scopes: ['read', 'write']
},
(method, url, body, headers) => {
  return new Promise(function (resolve, reject) {
    var xhr = new window.XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open(method, url)

    xhr.onload = function () {
      return resolve({
        status: xhr.status,
        body: xhr.responseText
      })
    }

    xhr.onerror = xhr.onabort = function () {
      return reject(new Error(xhr.statusText || 'XHR aborted: ' + url))
    }

    Object.keys(headers).forEach(function (header) {
      xhr.setRequestHeader(header, headers[header])
    })

    xhr.send(body)
  })
}))

export default clientOAuth
