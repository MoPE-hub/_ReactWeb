import axios from 'axios'

export const contracterService = {
  regis,
  search,
  load,
  select,
  history,
  delete: _delete,
  record,
  download
}

async function regis(params) {
  const formData = new FormData()
  formData.append('fileCreate', params.generalFile ? params.generalFile[0] : params.agreeFile[0])
  if (params.pkgFile) {
    formData.append('packageFile', params.pkgFile[0])
  }
  formData.append('cntrctSj', params.cntrctSj)
  formData.append('cntrctMax', params.cntrctMax)
  formData.append('signCertType', params.signCertType)
  formData.append('cntrctNo', '')
  formData.append('atchfileGrpSeq', 0)
  formData.append('menuId', 101)

  return await axios.post(
    '/swg/contract/write/contractStatusStap1.do',
    formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

async function load() {
  return await axios.post(
    '/swg/contract/read/contractBox.do',
    'cntrctNo=&atchfileGrpSeq=0&cntrctSj=321&cntrctMax=2020-07-31&=signCertType=A&fileCreate='
  )
}

async function search() {
  return await axios.get(
    process.env.REACT_APP_DEV_LOGIN_LOCAL_API_URL + '/search'
  )
}

async function select() {
  return await axios.get(
    process.env.REACT_APP_DEV_LOGIN_LOCAL_API_URL + '/contractSelect'
  )
}

async function history() {
  return await axios.get(
    process.env.REACT_APP_DEV_LOGIN_LOCAL_API_URL + '/contract'
  )
}

async function _delete(id) {
  return await axios.post(
    '/swg/contract/delete/contractStatusInfoListData.do',
    'cntrctNo='+ id +'&menuId=101&tmp='
  )
}

async function record(id) {
  return await axios.post(
    '/swg/contract/read/inspectionHistory.do',
    'cntrctNo='+ id +'&maskYn=Y&menuId=101&tmp='
  )
}

async function download(id) {
  return await axios.post(
    '/swg/contract/read/getInspectionHistory.do',
    'cntrctNo='+ id +'&menuId=101'
  )
}
