import {service}  from './baseAPI'
import { Dispatch } from 'redux'

export enum SignupActionAPI {
  Signupccess = 'Signupccess',
  SignupFailed = 'SignupFailed'
}
export const signupAPI: any = (email: string, mobile: string, firstName: string, lastName: string, password: string ) => async (dispatch: Dispatch) => {
  service({
    method: 'post',
    url: 'auth/register',
    data: params(email, mobile, firstName, lastName, password)
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: SignupActionAPI.Signupccess,
          dataAPI: response.data,
          keyMessage: "Register Successfully"
        })
      }
      localStorage.setItem('access-token', response.data.token)
    })
    .catch((error) => {      
      if (error) {
        dispatch({
          type: SignupActionAPI.SignupFailed,
          keyMessage: "Register failed"
        })
      }
    })
}

const params = (email: string, mobile: string, firstName: string, lastName: string, password: string,) => {

  return {
    email: email,
    mobile: mobile,
    first_name: firstName, 
    last_name: lastName, 
    password: password

  }
}
