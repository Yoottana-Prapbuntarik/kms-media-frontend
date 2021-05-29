import { Dispatch } from 'redux'
import { serviceToken } from "./baseAPI";
export enum UserProfileAction {
  getUserProfileSuccess = 'getUserProfileSuccess',
  getUserProfileFailed = 'getUserProfileFailed',
  upateProfileSuccess = 'updateProfileSuccess',
  updateProfileFailed = 'updateProfileFailed',
  getBlogUserSuccess = 'getBlogUserSuccess',
  getBlogUserFailed = 'getBlogUserFailed',
  getDocumentUserSuccess = 'getDocumentUserSuccess',
  getDocumentUserFailed = 'getDocumentUserFailed',
  removeBlogUserSuccess = 'removeBlogUserSuccess',
  removeBlogUserFailed = 'removeBlogUserFailed',
  removeDocumentSuccess = 'removeDocumentSuccess',
  removeDocumentFailed = 'removeDocumentFailed'

}

export const getUserProfile: any = (firstName: string, lastName: string, id: number | string) => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'get',
    url: `auth/profile/${firstName}/${lastName}/${id}`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: UserProfileAction.getUserProfileSuccess,
          dataAPI: response.data[0],
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: UserProfileAction.getUserProfileFailed,
        })
      }
    })
}

export const updateUserProfile: any = (mobile: string, firstName: string, lastName: string, image, id: number | string) => async (dispatch: Dispatch) => {
    serviceToken({
      method: 'patch',
      url: `auth/profile/${id}/update`,
      data: params(
        mobile,
        firstName,
        lastName,
        image
      )
    })
      .then((response) => {
        if (response) {
          dispatch({
            type: UserProfileAction.upateProfileSuccess,
            dataAPI: response.data,
            key_message: "Save Data Successfully"
          })
        }
      })
      .catch((error) => {
        if (error) {
          dispatch({
            type: UserProfileAction.updateProfileFailed,
          })
        }
      })
  }

const params = (
  mobile: string,
  firstName: string,
  lastName: string,
  image: string
) => {
  return {
    mobile: mobile,
    first_name: firstName,
    last_name: lastName,
    image: image
  }
}


export const getBlogUser: any = () => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'get',
    url: `blog/user`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: UserProfileAction.getBlogUserSuccess,
          dataAPI: response.data
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: UserProfileAction.getBlogUserFailed,
        })
      }
    })
}

export const getDocumentUser: any = () => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'get',
    url: `document/user`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: UserProfileAction.getDocumentUserSuccess,
          dataAPI: response.data
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: UserProfileAction.getDocumentUserFailed,
        })
      }
    })
}

export const removeBlogUser: any = (id:number | string) => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'delete',
    url: `blog/delete/${id}`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: UserProfileAction.removeBlogUserSuccess,
          dataAPI: response.data,
          key_message: "ดำเนินการสำเร็จ"
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: UserProfileAction.removeBlogUserFailed,
        })
      }
    })
}

export const removeDocument: any = (id:number | string) => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'delete',
    url: `template/delete/${id}`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: UserProfileAction.removeDocumentSuccess,
          dataAPI: response.data,
          key_message: "ดำเนินการสำเร็จ"
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: UserProfileAction.removeDocumentFailed,
        })
      }
    })
}