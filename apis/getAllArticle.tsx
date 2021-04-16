import { service } from './baseAPI'
import { Dispatch } from 'redux'

export enum GetArticleAction {
  getArticleSuccess = 'getArticleSuccess',
  getArtcleFailed = 'getArtcleFailed',
  getArticleDetailSuccess = 'getArticleDetailSuccess',
  getArticleDetailFailed = 'getArticleDetailFailed'
}

export const getArticle: any = () => async (dispatch: Dispatch) => {
  service({
    method: 'get',
    url: 'blog/all',
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: GetArticleAction.getArticleSuccess,
          dataAPI: response.data.blog,
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: GetArticleAction.getArtcleFailed
        })
      }
    })
}

export const getArticleDetail: any = (id: number | string) => async (dispatch: Dispatch) => {
  service({
    method: 'get',
    url: `blog/${id}`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: GetArticleAction.getArticleDetailSuccess,
          dataAPI: response.data,
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: GetArticleAction.getArticleDetailFailed
        })
      }
    })
}

