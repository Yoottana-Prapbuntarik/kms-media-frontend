import { service, serviceToken } from './baseAPI'
import { Dispatch } from 'redux'

export enum SigninActionAPI {
  SigninSuccess = 'SigninSuccess',
  SigninFailed = 'SigninFailed',
  SigninGetUserProfileSuccess = "SigninGetUserProfileSuccess",
  SigninGetUserProfileFailed = "SigninGetUserProfileFailed"
}

export const signinAPI: any = (email: string, password: string, isRemember?: boolean) => async (dispatch: Dispatch) => {
  service({
    method: 'post',
    url: 'auth/signin',
    data: params(email, password, isRemember)
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: SigninActionAPI.SigninSuccess,
          dataAPI: response.data,
          keyStatus: response.status,
          keyMessage: "Login Successfully"
        })
      }
      localStorage.setItem('access-token', response.data.token)
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: SigninActionAPI.SigninFailed,
          keyStatus: error.response.status,
          keyMessage: "Login Failed"
        })
      }
    })
}

export const getUserData: any = () => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'get',
    url: 'auth/user',
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: SigninActionAPI.SigninGetUserProfileSuccess,
          dataAPI: response.data,
        })
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('access-token')
      }      
      if (error) {
        dispatch({
          type: SigninActionAPI.SigninGetUserProfileFailed,
        })
      }
    })
}


const params = (email: string, password: string, isRemember?: boolean) => {
  if (isRemember === undefined) {
    return {
      email: email,
      password: password
    }
  }

  return {
    email: email,
    password: password,
  }
}
