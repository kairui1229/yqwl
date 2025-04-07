import {post} from '@/utils/http'

enum Api {
  auth= '/userAuth',
  setAuth = '/setAuth'
}

function getAuthApi(pageAuthority:string,btnAuthority:string) {
  return post(Api.auth, {pageAuthority,btnAuthority})
}

function setAuthApi(account:string,pageList:string[],btnList:string[]) {
  return post(Api.setAuth, {account,pageList,btnList})
}

export  {
  getAuthApi,
  setAuthApi
}