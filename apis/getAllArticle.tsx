import { service } from './baseAPI'
import { Dispatch } from 'redux'
import { serviceToken  } from "./baseAPI";
export enum GetArticleAction {
  getArticleSuccess = 'getArticleSuccess',
  getArtcleFailed = 'getArtcleFailed',
  getArticleDetailSuccess = 'getArticleDetailSuccess',
  getArticleDetailFailed = 'getArticleDetailFailed',
  commentArticleDetailSuccess = 'commentArticleDetailSuccess',
  commentArticleDetailFailed = 'commentArticleDetailFailed',
  getCommentArticleDetailSuccess = 'getCommentArticleDetailSuccess',
  getCommentArticleDetailFailed = 'getCommentArticleDetailFailed'
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

export const getCommentAll: any = (id: number | string) => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'get',
    url: `blog/comment/all/${id}`,
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: GetArticleAction.getCommentArticleDetailSuccess,
          dataAPI: response.data,
        })
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: GetArticleAction.getCommentArticleDetailFailed
        })
      }
    })
}



export const commentArticle : any = (
  article: string,
  userComment: string,
  content: string,
  owner: string,
) => async (dispatch: Dispatch) => {
  serviceToken({
    method: 'post',
    url: 'blog/comment',
    data: params(
      article,
      userComment,
      content,
      owner
    )
  })
    .then((response) => {
      if (response) {
        dispatch({
          type: GetArticleAction.commentArticleDetailSuccess,
          dataAPI: response.data,
          keyMessage: "Comment Successfully"
        }),
        dispatch(getCommentAll(article))
      }
    })
    .catch((error) => {
      if (error) {
        dispatch({
          type: GetArticleAction.commentArticleDetailFailed,
          keyMessage: "Comment failed !"
        })
      }
    })
}

const params = (
  article: string,
  userComment: string,
  content: string,
  owner: string,

) => {

  return {

    article: article,
    user_comment: userComment,
    content: content,
    owner: owner,
  }
}

