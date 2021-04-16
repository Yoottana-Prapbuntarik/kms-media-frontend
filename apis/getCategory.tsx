import {service}  from './baseAPI'
import { Dispatch } from 'redux'

export enum BlogCategoryAPI {
  GetCategorySuccess = 'GetCategorySuccess',
  GetCategoryFailed = 'GetCategoryFailed'
}

export const getBlogCategory: any = () => async (dispatch: Dispatch) => {
    service({
    method: 'get',
    url: 'blog/category',
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: BlogCategoryAPI.GetCategorySuccess,
          dataAPI: response.data,
        })        
      }
    })
    .catch((error) => {      
      if (error) {
        dispatch({
            type: BlogCategoryAPI.GetCategoryFailed
        })
      }
    })
}

